import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ContactScreen from '../screens/ContactScreen';
import FeedbackScreen from '../screens/FeedbackScreen';

const Stack = createNativeStackNavigator();

const ContactStack = () => {
  return (
     <Stack.Navigator>
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
    </Stack.Navigator>
  )
}

export default ContactStack

