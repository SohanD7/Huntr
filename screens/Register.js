import React, {Component} from 'react';
import { View, StyleSheet,Text, SafeAreaView, Platform, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from "firebase";
import db from "../config"
import { color } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      confirmPassword: ""
    }
  }

  registerUser = (email, password, confirmPassword, first_name, last_name) => {
  if (password === confirmPassword) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("User Registered!");
        this.props.navigation.replace("Login");
        
        // Now use Firestore instead of Firebase Realtime Database
        db.collection("users").doc(userCredential.user.uid).set({
          email: userCredential.user.email,
          first_name: first_name,
          last_name: last_name,
          uid: userCredential.user.uid
        })
        .then(() => {
          console.log("User added to Firestore successfully!");
        })
        .catch((error) => {
          console.error("Error adding user to Firestore: ", error);
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    alert("Passwords do not match!");
  }
}

  render() {
    const { email, password, confirmPassword, first_name, last_name } = this.state;
    return (
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']} // Similar to ClientLoginScreen
        style={styles.container}
      >
        <SafeAreaView style={styles.android} />
        <Text style={styles.appTitleText}>Register User</Text>
        {['first_name', 'last_name', 'email', 'password', 'confirmPassword'].map((key, index) => (
          <TextInput
            key={key}
            style={[styles.textInput, { marginTop: index > 0 ? RFValue(20) : 0 }]}
            onChangeText={(text) => this.setState({ [key]: text })}
            placeholder={`Enter ${key.replace('_', ' ').replace('P', ' P')}`}
            placeholderTextColor={'white'}
            secureTextEntry={key === 'password' || key === 'confirmPassword'}
            autoFocus={index === 0}
          />
        ))}
        <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.button}>
          <TouchableOpacity onPress={() => this.registerUser(email, password, confirmPassword, first_name, last_name)}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
          <Text style={styles.newUserText}>Login?</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  android: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  textInput: {
    width: RFValue(275),
    height: RFValue(50),
    borderColor: "white",
    borderWidth: RFValue(2),
    borderRadius: RFValue(20),
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    fontSize: RFValue(20),
    color: "white"
  },
  button: {
    alignSelf: "center",
    width: RFValue(150),
    borderRadius: RFValue(25),
    padding: RFValue(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFValue(30)
  },
  buttonText: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: "white"
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),
    fontWeight: "bold",
    marginBottom: RFValue(20)
  },
  newUserText: {
    fontSize: RFValue(15),
    color: "white",
    marginTop: 20,
    textDecorationLine: "underline"
  }
});