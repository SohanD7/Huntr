import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import { firebaseConfig } from './config';
import Login from "./screens/Login"
import Register from "./screens/Register"
import Explore from './screens/Explore';
import Saved from './screens/Saved';
import DrawerNavigator from './navigator/DrawerNavigator';

global.__reanimatedWorkletInit = () => {};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); //initializes firebase
} else {
  firebase.app();
}

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        //sets the login screen to the deafault
        headerShown: false,
        gestureEnabled: false,
      }}>
    <Stack.Screen name="Login" component={Login} /> 
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Explore" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}