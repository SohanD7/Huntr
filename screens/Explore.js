import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Platform, StatusBar } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import db from '../config';  // Ensure this points to your Firestore config

export default class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            swipedAllCards: false,
            swipeDirection: '',
            cardIndex: 0,
        };
    }

  componentDidMount() {
  console.log("Props received in Explore:", this.props);
  //if (this.props.route && this.props.route.params) {
    //const { userEmail } = this.props.route.params;
    //this.getUserIdByEmail(userEmail);
  //} else {
    //console.error("Navigation parameters are undefined.");
  //}
  const userEmail = "travis@cactus.com";
  console.log(userEmail)
  this.getUserIdByEmail(userEmail);
}

    getUserIdByEmail = async (email) => {
    console.log("Fetching user ID for email:", email); // Confirm email is passed correctly
    try {
        const userQuerySnapshot = await db.collection('users')
            .where('email', '==', email)
            .limit(1)
            .get();

        if (userQuerySnapshot.empty) {
            console.log('No user found with this email:', email);
        } else {
            const userDoc = userQuerySnapshot.docs[0];
            const userId = userDoc.id;
            console.log('User ID found:', userId);
            this.fetchJobRecommendations(userId);
        }
    } catch (error) {
        console.error('Error retrieving user ID:', error);
    }
};

    fetchJobRecommendations = (userId) => {
        db.collection('users').doc(userId).collection('recommended_jobs')
            .onSnapshot(snapshot => {
                const fetchedJobs = snapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title,
                    company: doc.data().company,
                    location: doc.data().location,
                    minSalary: doc.data().min_salary,
                    maxSalary: doc.data().max_salary
                }));
                this.setState({ cards: fetchedJobs });
                console.log("Fetched jobs:", fetchedJobs);
            }, error => {
                console.error("Error fetching job recommendations:", error);
            });
    };



    onSwiped = (type) => {
        console.log(`Swiped ${type}`);
    }

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true
        });
    };

    renderCard = (card, index) => {
    if (!card) { // Checks if the card object is undefined
        return <View style={styles.card}><Text>Loading...</Text></View>;
    }
    return (
        <View style={styles.card} key={index}>
            <Text style={styles.cardTitle}>{card.title || 'No Title'}</Text>
            <Text style={styles.cardText}>{card.company || 'No Company'}</Text>
            <Text style={styles.cardText}>{card.location || 'No Location'}</Text>
            <Text style={styles.cardText}>Salary: {card.minSalary || 'No Min Salary'} to {card.maxSalary || 'No Max Salary'}</Text>
        </View>
    );
};

onSwipedRight = (cardIndex) => {
      console.log("onswiped right");// This needs to be dynamically fetched based on your app's auth system
    const card = this.state.cards[cardIndex];
    if (!card) {
        console.log("No card data available");
        return;
    }

    const userId = userID;
    console.log("userID created:", userId);// This needs to be dynamically fetched based on your app's auth system

    // Reference to the user's liked_jobs collection in Firestore
    const likedJobsRef = db.collection('users').doc(userId).collection('liked_jobs');

    // Add the job to the liked_jobs collection
    likedJobsRef.add({
        title: card.title,
        company: card.company,
        location: card.location,
        minSalary: card.minSalary,
        maxSalary: card.maxSalary,
        jobPostingUrl: card.jobPostingUrl // Make sure your card data structure includes this or adjust accordingly
    })
    .then(() => {
        console.log("Job saved to liked jobs successfully!");
    })
    .catch(error => {
        console.error("Failed to save job to liked jobs:", error);
    });
};


    render() {
        return (
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.container}
            >
                <SafeAreaView style={styles.androidSafeArea} />
                <Text style={styles.headerText}>Explore Recommended Jobs</Text>
                <Swiper
                    cards={this.state.cards}
                    renderCard={this.renderCard}
                    onSwiped={(cardIndex) => console.log(cardIndex)}
                    onSwipedLeft={() => this.onSwiped('left')}
                    onSwipedRight={() => this.onSwiped('right')}
                    onSwipedAll={this.onSwipedAllCards}
                    cardIndex={this.state.cardIndex}
                    backgroundColor={'transparent'}
                    stackSize={3}
                    stackSeparation={15}
                    overlayLabels={{
                        left: {
                            title: 'REJECT?',
                            style: {
                                label: {
                                    backgroundColor: 'red',
                                    borderColor: 'red',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: -30
                                }
                            }
                        },
                        right: {
                            title: 'SAVE?',
                            style: {
                                label: {
                                    backgroundColor: '#50C878',
                                    borderColor: '#50C878',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: 30
                                }
                            }
                        },
                    }}
                />
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: RFValue(5)
    },
    androidSafeArea: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    card: {
      opacity: 1.0,
        flex: 1,
        borderRadius: RFValue(20),
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
        height: '55%',
        width: '90%',
        alignSelf: 'center'
    },
    cardTitle: {
        fontSize: RFValue(25),
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    cardText: {
        fontSize: RFValue(20),
        textAlign: 'center'
    },
    headerText: {
        fontSize: RFValue(20),
        color: 'white',
        padding: 70,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: RFValue(100),
    }
});
