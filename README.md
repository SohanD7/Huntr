Project Overview: Huntr
Inspiration
As college students on the cusp of entering the workforce, we encountered firsthand the frustrations and inefficiencies of traditional job search methods. The process was impersonal and often failed to match us with job opportunities that truly fit our skills and aspirations. Motivated by these challenges, we set out to create Huntr, a platform that harnesses the power of algorithms to deliver a personalized, efficient job search experience.

What We Learned
Throughout the development of Huntr, we gained invaluable insights into the integration of various technologies, including Firebase for real-time database management, Python for backend processing, and React for frontend development. We also learned about the importance of user-centered design and data-driven decision-making in creating a product that genuinely meets user needs.

How We Built Our Project
Huntr is built on a robust framework that combines modern web and data technologies:

User Registration and Management: Utilizing Firebase Authentication, we ensure that each user’s data is securely managed and seamlessly integrated throughout their experience.
Data Processing: We employed Python for backend development, using libraries like Pandas and Scikit-learn to process job listings and compute recommendations.
Job listings are first processed to extract key attributes (job title, location, and company name).
These attributes are combined into a single text field and vectorized using TfidfVectorizer.
We calculate cosine similarity between the user’s liked jobs and all available job listings to identify the best matches.
Dynamic Job Recommendations: The algorithm updates recommended jobs based on user interactions, enhancing personalization over time.
Real-time Data Syncing and Display: Recommendations are pushed to Firebase and dynamically displayed to users via the React-based frontend.
Challenges Faced
One of our main challenges was deploying the Python script effectively and ensuring it worked seamlessly with Firebase. Integrating a Python backend with a React frontend presented various synchronization and deployment issues, which required us to delve deeper into both technologies. We also faced challenges in ensuring that the job recommendation process was both fast and accurate, balancing computational efficiency with user experience.

Conclusion
Building Huntr has not only enhanced our technical skills but also taught us the value of persistence and innovative thinking in solving real-world problems. We are excited about the potential of Huntr to transform the job search landscape and make job hunting as enjoyable and straightforward as swiping on a dating app.
