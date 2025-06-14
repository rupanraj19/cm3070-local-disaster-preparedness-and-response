// --------------PROFILE STACK----------------
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/ProfileScreen';
import UpdatePasswordScreen from '../screens/UpdatePasswordScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} />
    </Stack.Navigator>
  );
}
