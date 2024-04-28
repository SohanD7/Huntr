import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyDosRieX99RWrp-K8WCKF4FhlodOWVz7Zg",
  authDomain: "acm-24.firebaseapp.com",
  databaseURL: "https://acm-24-default-rtdb.firebaseio.com",
  projectId: "acm-24",
  storageBucket: "acm-24.appspot.com",
  messagingSenderId: "302403145521",
  appId: "1:302403145521:web:93eb80b2b49b4662f92a10"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig) //initializes firebase
} else {
  firebase.app()
}

export default firebase.firestore();