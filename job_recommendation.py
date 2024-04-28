import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

if not firebase_admin._apps:
    cred = credentials.Certificate('/Users/sohan/Downloads/acm-24-firebase-adminsdk-iwxt4-146368c715 (1).json')
    firebase_admin.initialize_app(cred)
db = firestore.client()

job_data = pd.read_csv('/Users/sohan/Library/Mobile Documents/com~apple~Numbers/Documents/updated_yearly_salaries_job_postings_with_companies.numbers')
job_columns = ['title', 'location', 'min_salary', 'max_salary', 'job_posting_url', 'company']
job_data = job_data[job_columns]

# Handle missing data
job_data.fillna('', inplace=True)
job_data['combined_info'] = job_data['title'] + ' ' + job_data['location'] + ' ' + job_data['company']

# Vectorize the combined information for similarity computation
vectorizer = TfidfVectorizer(stop_words='english')
job_vectors = vectorizer.fit_transform(job_data['combined_info'])

def get_user_liked_jobs(user_id):
    liked_indices = []
    # Reference to the user's liked_jobs subcollection
    jobs_ref = db.collection(u'users').document(user_id).collection(u'liked_jobs')
    jobs = jobs_ref.stream()  # Fetch all job documents in the subcollection

    for job_doc in jobs:
        job_dict = job_doc.to_dict()  # Convert DocumentSnapshot to dictionary
        job_title = job_dict['title']  # Assuming 'title' is the key for job title in Firestore

        # Find indices in the job DataFrame that match the job title from Firestore
        matching_indices = job_data[job_data['title'] == job_title].index.tolist()
        if matching_indices:
            liked_indices.extend(matching_indices)  # Append all matching indices

    if liked_indices:
        return liked_indices
    else:
        print(f"No liked jobs found or user ID {user_id} does not exist.")
        return []
    
def recommend_jobs(user_id):
    liked_indices = get_user_liked_jobs(user_id)
    if not liked_indices:
        return pd.DataFrame()  # Return an empty DataFrame if no liked jobs found

    # Calculate similarities and generate recommendations:
    similarities = cosine_similarity(job_vectors[liked_indices], job_vectors)
    recommended_indices = np.argsort(similarities.mean(axis=0))[-10:]  # Top 10 recommendations

    # Create a DataFrame of recommended jobs
    recommended_jobs = job_data.iloc[recommended_indices]
    return recommended_jobs
    
def store_recommendations(user_id, recommendations):
    # Ensure the Firestore client is initialized
    if not firebase_admin._apps:
        cred = credentials.Certificate('/Users/sohan/Downloads/acm-24-firebase-adminsdk-iwxt4-ea6c1633e8.json')
        firebase_admin.initialize_app(cred)

    db = firestore.client()

    # Reference to the recommended_jobs subcollection under the user document
    rec_ref = db.collection('users').document(user_id).collection('recommended_jobs')

    # Clear previous recommendations before storing new ones
    old_jobs = rec_ref.stream()
    for job in old_jobs:
        rec_ref.document(job.id).delete()

    # Add new recommendations
    for job in recommendations.itertuples():
        job_dict = {
            'title': job.title,
            'location': job.location,
            'min_salary': job.min_salary,
            'max_salary': job.max_salary,
            'job_posting_url': job.job_posting_url,
            'company': job.company
        }
        rec_ref.add(job_dict)

    
