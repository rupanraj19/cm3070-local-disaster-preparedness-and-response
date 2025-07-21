//--------------CONTACT STACK-------------------------
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ContactScreen from '../screens/ContactScreen';
import FeedbackScreen from '../screens/FeedbackScreen';

const Stack = createNativeStackNavigator();

export default function ContactStack() {
  return (
     <Stack.Navigator>
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
    </Stack.Navigator>
  )
}



