import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { useTheme } from '../context/ThemeContext';

// Reusable Cell component
const SettingsCell = ({ title, detail, onPress, accessory = "DisclosureIndicator", textColor = "text-black", bgColor = "bg-white", }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-row justify-between items-center ${bgColor} px-4 py-4 border-b border-gray-200`}
    >
      <Text style={tw`text-base ${textColor}`}>{title}</Text>
      <View style={tw`flex-row items-center`}>
        {detail && <Text style={tw`text-sm text-gray-500 mr-2`}>{detail}</Text>}
        {accessory === "DisclosureIndicator" && (
          <Ionicons name="chevron-forward" size={18} color="gray" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const SettingsScreen = ({ navigation }) => {

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-black';

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      alert("Failed to sign out: " + error.message);
    });
  };

  return (
    <View style={tw`flex-1 ${bgColor} pt-12`}>
      {/* Header */}
      <View style={tw`flex-row justify-between
         items-center px-5 mb-2`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text style={tw`text-lg font-semibold ${textColor} `}>Settings</Text>
        <TouchableOpacity>
          {/* <Text style={tw`text-base text-blue-500`}>Done</Text> */}
        </TouchableOpacity>
      </View>

      <ScrollView style={tw`px-0`}>
        {/* Section Title */}
        <Text style={tw`text-sm text-gray-500 px-4 mt-2 mb-1`}>Account</Text>

        {/* Account Settings */}
        <View style={tw`bg-gray-100`}>
          <SettingsCell title="Preferences" onPress={() => {}} textColor={textColor} bgColor={bgColor}  />
          {/* <SettingsCell title="Profile" onPress={() => {}} /> */}
          <SettingsCell title="Theme" detail={isDark ? 'Dark' : 'Light'} onPress={toggleTheme} textColor={textColor} bgColor={bgColor}  />
          <SettingsCell title="Notifications" onPress={() => {}} textColor={textColor} bgColor={bgColor}  />
          <SettingsCell title="Privacy settings" onPress={() => {}} textColor={textColor} bgColor={bgColor}  />
        </View>

        {/* Divider */}
        <View style={tw`h-px bg-black my-4 mx-4`} />

        {/* Legal */}
        <Text style={tw`text-sm text-gray-500 px-4 mb-1`}>Legal</Text>
        <View style={tw`bg-gray-100`}>
          <SettingsCell title="Terms" onPress={() => {}} textColor={textColor} bgColor={bgColor}  />
          <SettingsCell title="Privacy Policy" onPress={() => {}} textColor={textColor} bgColor={bgColor}  />
          <SettingsCell title="Acknowledgements" onPress={() => {}} textColor={textColor} bgColor={bgColor}  />
        </View>

        {/* Divider */}
        <View style={tw`h-px bg-black my-4 mx-4`} />

        {/* Actions */}
        <View style={tw`px-4 pb-10`}>
          <TouchableOpacity
            onPress={handleSignOut}
            style={tw`bg-red-500 rounded px-4 py-3 mb-4`}
          >
            <Text style={tw`text-white text-center text-base font-medium`}>Sign Out</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("UpdatePassword")}
            style={tw`bg-blue-500 rounded px-4 py-3 mb-30`}>
            <Text style={tw`text-white text-center text-base font-medium`}>
              Update Password
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
