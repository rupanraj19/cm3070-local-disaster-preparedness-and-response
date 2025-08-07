//  -------------TABS-----------------------
import { View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tw from "twrnc";
import { useTheme } from '../context/ThemeContext';

// Import screen stacks
import SosScreen from '../screens/SosScreen';
import ProfileStack from './ProfileStack';
import ContactStack from './ContactStack';
import AlertStack from './AlertStack';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={tw`-top-4 justify-center items-center shadow-lg`}
    onPress={onPress}
  >
    <View style={tw`w-18 h-18 rounded-full bg-red-600 justify-center items-center`}>
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#e32f45',
        tabBarInactiveTintColor: '#748c94',
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: isDark?  '#000': '#ffffff',
          borderRadius: 10,
          height: 90,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: isDark?  '#000': '#ffffff',
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/home.png')}
              resizeMode="contain"
              style={[tw`mt-5 w-8 h-8`, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AlertStack"
        component={AlertStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/alert.png')}
              resizeMode="contain"
              style={[tw`mt-5 w-8 h-8`, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SOS"
        component={SosScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/sos.png')}
              resizeMode="contain"
              style={[
                tw`w-10 h-10`,
                { tintColor: focused ? '#fff' : '#000' },
              ]}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={tw`items-center justify-center`}>
              <Image
                source={require('../assets/icons/profile.png')}
                resizeMode="contain"
                style={[tw`mt-5 w-8 h-8`, { tintColor: color }]}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ContactStack"
        component={ContactStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={tw`items-center justify-center`}>
              <Image
                source={require('../assets/icons/contact.png')}
                resizeMode="contain"
                style={[tw`mt-5 w-8 h-8`, { tintColor: color }]}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
