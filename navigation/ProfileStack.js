// --------------PROFILE STACK----------------
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/ProfileScreen';
import UpdatePasswordScreen from '../screens/UpdatePasswordScreen';
import SettingsScreen from '../screens/SettingsScreen'
import TermsScreen from '../screens/TermsScreen';
import PolicyScreen from '../screens/PolicyScreen';
import AcknowledgementScreen from '../screens/AcknowledgementScreen'
import NotificationScreen from '../screens/NotificationsScreen';
const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Policy" component={PolicyScreen} />
      <Stack.Screen name="Acknowledgement" component={AcknowledgementScreen} />
      <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} />
    </Stack.Navigator>
  );
}
