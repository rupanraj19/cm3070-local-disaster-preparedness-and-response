import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useTheme } from '../context/ThemeContext';

const AcknowledgementScreen = () => {
 const { bgColor, textColor} = useTheme();

  return (
    <ScrollView style={tw`px-4 py-6 ${bgColor}`}>
      <Text style={tw`mb-4 ${textColor}`}>
       I would like to thank the following individuals and organizations for their contributions to the FloodSafe SG project:
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>Academic Support</Text>
      <Text style={tw`mb-4 ${textColor}`}>
        - University of London and Singapore Institute of Management {'\n'}
        - Project Supervisor: MR.CHEW JEE LOONG {'\n'}
        - Module: CM3070 Final Year Project
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>Technical Support</Text>
      <Text style={tw`mb-4 ${textColor}`}>
        - Firebase (Authentication & Firestore){'\n'}
        - Expo & React Native Community{'\n'}
        - Npm packages {'\n'}
        - OpenStreetMap
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>Data & References</Text>
      <Text style={tw`mb-4 ${textColor}`}>
        - National Environment Agency (NEA) Singapore{'\n'}
        - OpenWeather (https://openweathermap.org/){'\n'}
        - Public Utilities Board (PUB) Singapore{'\n'}
        {/* - Singapore Civil Defence Force (SCDF){'\n'}
        - Data.gov.sg */}
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>Special Thanks</Text>
      <Text style={tw`mb-4 ${textColor}`}>
        - Our beta testers and survey participants for their valuable feedback.{'\n'}
        - Teachers, friends and family who supported me during development.
      </Text>

      <Text style={tw`text-center mt-6 text-sm text-gray-300`}>
        FloodSafe SG – Empowering communities for flood preparedness.
      </Text>
    </ScrollView>
  );
};

export default AcknowledgementScreen;

const styles = StyleSheet.create({});
