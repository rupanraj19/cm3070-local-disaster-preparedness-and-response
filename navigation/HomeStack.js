import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import Splash from '../screens/Splash';
import Questions from "../screens/Questions"
import Score from '../screens/Score';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (

      <Stack.Navigator screenOptions={{headerShown: true, contentStyle:{backgroundColor:"white"}}}>
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Question" component={Questions} />
        <Stack.Screen name="Score" component={Score} />
      </Stack.Navigator>

  )
}

export default HomeStack

const styles = StyleSheet.create({})