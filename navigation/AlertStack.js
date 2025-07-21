// AlertStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlertScreen from '../screens/AlertScreen';
import FlashFloodsScreen from '../screens/FlashFloodsScreen';

const Stack = createNativeStackNavigator();

const AlertStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Alert" component={AlertScreen} />
      <Stack.Screen name="FlashFloods" component={FlashFloodsScreen} />
    </Stack.Navigator>
  );
};

export default AlertStack;