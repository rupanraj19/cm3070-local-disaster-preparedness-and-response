// AlertStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlertScreen from '../screens/AlertScreen';
import FlashFloodsScreen from '../screens/FlashFloodsScreen';
import { useTheme } from '../context/ThemeContext';
const Stack = createNativeStackNavigator();

const AlertStack = () => {
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
      <Stack.Screen name="Alert" component={AlertScreen} options={{headerShown: false}} />
      <Stack.Screen name="FlashFloods" component={FlashFloodsScreen} />
    </Stack.Navigator>
  );
};

export default AlertStack;