import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import Splash from '../screens/Splash';
import Questions from "../screens/Questions"
import Score from '../screens/Score';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PackBagGame from '../screens/packBagGame';
import PbgResult from '../screens/pbgResult'
import GuideDetailScreen from '../screens/GuideDetailScreen';
import { useTheme } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();
const HomeStack = () => {

  const { isDark } = useTheme();
  return (

          <Stack.Navigator
          screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? '#000' : '#fff',
          },
          headerTintColor: isDark ? '#fff' : '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
    >
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="GuideDetails" component={GuideDetailScreen} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Question" component={Questions} />
        <Stack.Screen name="Score" component={Score} />
        <Stack.Screen name="PackBagGame" component={PackBagGame} />
        <Stack.Screen name="PbgResult" component={PbgResult} />
      </Stack.Navigator>

  )
}

export default HomeStack

const styles = StyleSheet.create({})