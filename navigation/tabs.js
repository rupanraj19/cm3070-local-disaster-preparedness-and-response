//  -------------TABS-----------------------
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import screen
import HomeScreen from '../screens/HomeScreen'
import AlertScreen from '../screens/AlertScreen';
import SosScreen from '../screens/SosScreen';
import ProfileStack from '../navigation/ProfileStack';
import ContactStack from '../navigation/ContactStack';


const Tab = createBottomTabNavigator();
const CustomTabBarButton =({children, onPress}) => (
    <TouchableOpacity
    style={{
        top: -15,
        justifyContent: 'center',
        alignItems: 'center',
         ...styles.shadow
    }}
    onPress={onPress}>
        <View style={{
            width:70,
            height:70,
            borderRadius: 35,
            backgroundColor: '#e32f45',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {children}
        </View>
    </TouchableOpacity>
)

const Tabs =()=>{
    return(
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
            backgroundColor: '#ffffff',
            borderRadius: 15,
            height: 90,
            },
            tabBarLabelStyle: {
            fontSize: 12,
            },
        }}
        >
            <Tab.Screen name="Home" component={HomeScreen}   options={{
                    tabBarIcon: ({ color }) => (
                    <Image
                        source={require('../assets/icons/home.png')}
                        resizeMode="contain"
                        style={{
                        width: 30,
                        height: 30,
                        marginTop: 20,
                        tintColor: color,
                        }}
                    />
                    ),
                }}
            />
            <Tab.Screen name="Alert" component={AlertScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                    <Image
                        source={require('../assets/icons/alert.png')}
                        resizeMode="contain"
                        style={{
                        width: 30,
                        height: 30,
                        marginTop: 20,
                        tintColor: color,
                        }}
                    />
                    ),
                }}
            />
            <Tab.Screen name="SOS" component={SosScreen}
                options={{
                    tabBarIcon: ({focused})=>(
                        <Image
                        source={require('../assets/icons/sos.png')}
                        resizeMode="contain"
                        style={{
                            width: 40,
                            height: 40,
                            tintColor: focused ? "#fff" : '#000'
                        }}
                        />
                    ),
                    tabBarButton: (props)=>(
                        <CustomTabBarButton {...props}/>
                    )

                }}
            />
            <Tab.Screen name="ProfileStack" component={ProfileStack} options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <View style={{alignItems: 'center', justifyContent:'center'}}>
                            <Image
                                source={require('../assets/icons/profile.png')}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    marginTop: 20,
                                    tintColor: color
                                }}
                            />
                            {/* <Text style={{color: focused ? "#e32f45" : "#748c94", fontSize: 12}}>PROFILE</Text> */}
                        </View>
                    ),
                }}
            />
            <Tab.Screen name="ContactStack" component={ContactStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <View style={{alignItems: 'center', justifyContent:'center'}}>
                            <Image
                                source={require('../assets/icons/contact.png')}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    marginTop: 20,
                                    tintColor: color
                                }}
                            />
                            {/* <Text style={{color: focused ? "#e32f45" : "#748c94", fontSize: 12}}>CONTACT</Text> */}
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow:{
        shadowColor: "#7f5df0",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default Tabs;