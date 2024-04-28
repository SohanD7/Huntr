import React, {Component} from 'react';
import { View, StyleSheet,Text } from 'react-native';
import {createDrawerNavigator} from "@react-navigation/drawer"
import Explore from "../screens/Explore";
import StackNavigator from "./StackNavigator";
import Saved from "../screens/Saved"

const Drawer = createDrawerNavigator();

const DrawerNavigator=()=>
{
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="Explore" component={Explore}/>
      <Drawer.Screen name="Saved" component={Saved}/>
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;