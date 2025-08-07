//--------------CONTACT STACK-------------------------
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ContactScreen from '../screens/ContactScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import { useTheme } from '../context/ThemeContext';
const Stack = createNativeStackNavigator();

export default function ContactStack() {
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
      <Stack.Screen name="Contact" component={ContactScreen} options={{headerShown:false}}  />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
    </Stack.Navigator>
  )
}



