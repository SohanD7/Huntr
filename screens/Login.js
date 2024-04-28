import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';  // Ensure firebase is properly configured

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  signIn = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("Login Successful");
        // Navigate to the Explore screen with the user's email as a parameter
        console.log("Email to pass:", email);  // This should log the actual email
        this.props.navigation.navigate('Explore', { userEmail: email });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.container}
      >
        <SafeAreaView style={styles.android} />
        <Text style={styles.huntrTitle}>Huntr</Text>
        <Text style={styles.appTitleText}>Login</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ email: text })}
          placeholder={'Enter Email'}
          placeholderTextColor={'white'}
          autoFocus
        />
        <TextInput
          style={[styles.textInput, { marginTop: RFValue(20) }]}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder={'Enter Password'}
          placeholderTextColor={'white'}
          secureTextEntry
        />
        <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.button}>
          <TouchableOpacity onPress={() => this.signIn(email, password)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
          <Text style={styles.newUserText}>New User?</Text>
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
    fontSize: RFValue(25),
    color: "white",
  },
  huntrTitle: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(65),
    fontWeight: "900",
    marginBottom: RFValue(20),
    marginTop: 10
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(30),
    fontWeight: "bold",
    marginBottom: RFValue(15),
    marginTop: 70
  },
  button: {
    alignSelf: "center",
    width: RFValue(150),
    borderRadius: RFValue(25),
    padding: RFValue(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  buttonText: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: "white"
  },
  newUserText: {
    fontSize: RFValue(15),
    color: "white",
    marginTop: 20,
    textDecorationLine: "underline"
  }
});