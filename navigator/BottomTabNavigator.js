import React, {Component} from 'react';
import { View, StyleSheet,Text } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"; 
import Ionicons from "react-native-vector-icons/Ionicons";
import {RFValue} from "react-native-responsive-fontsize";
import Explore from "../screens/Explore";
import Saved from "../screens/Saved"

const Tab = createBottomTabNavigator(); 
const BottomTabNavigator=()=>
{
    return(
      <Tab.Navigator
        screenOptions={({route})=>({
          tabBarIcon: ({focused,color,size})=>{ //displays the tab icon
              let iconName
              if(route.name == "Explore")
              {
                iconName = focused ? "home": "home-outline";
              }
              else if(route.name == "Saved")
              {
                iconName = focused ? "add-circle": "add-circle-outline";
              }
              return(
                <Ionicons 
                  name={iconName}
                  size = {RFValue(33)} //RFValue makes sure the ratio of the disply is accomodated to the device
                  color= {color}
                />
              )
          }
        })} //styling for the tab bar
        tabBarOptions = {{ 
          activeTintColor:"purple",
          inactiveTintColor: "white",
          style: {
            height: 150,
            backgroundColor: "#5653D4",
            paddingBottom: 20
          },
          labelStyle: {fontSize: 15, fontWeight: "bold"}, 
          tabStyle: {
            backgroundColor: "plum",
            alignItems: "center",
            justifyContents: "center",
            height: RFValue(60),
            paddingBottom: 2
          }
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: true}}/> 
        <Tab.Screen name="Test" component={Test} options={{headerShown: true}}/>
      </Tab.Navigator>
    );
}

export default BottomTabNavigator