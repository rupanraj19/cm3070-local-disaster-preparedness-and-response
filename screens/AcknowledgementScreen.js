import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import tw from 'twrnc';

const AcknowledgementScreen = () => {
  return (
    <ScrollView style={tw`px-4 py-6`}>
      <Text style={tw`text-2xl font-bold text-center mb-4`}>Acknowledgements</Text>

      <Text style={tw`mb-4`}>
        We would like to thank the following individuals and organizations for their contributions to the FloodSafe SG project:
      </Text>

      <Text style={tw`font-bold mb-2`}>Academic Support</Text>
      <Text style={tw`mb-4`}>
        - University of London and Singapore Institute of Management {'\n'}
        - Project Supervisor: MR.CHEW JEE LOONG {'\n'}
        - Module: CM3070 Final Year Project
      </Text>

      <Text style={tw`font-bold mb-2`}>Technical Support</Text>
      <Text style={tw`mb-4`}>
        - Firebase (Authentication & Firestore){'\n'}
        - Expo & React Native Community{'\n'}
        - OpenStreetMap
      </Text>

      <Text style={tw`font-bold mb-2`}>Data & References</Text>
      <Text style={tw`mb-4`}>
        - National Environment Agency (NEA) Singapore{'\n'}
        - OpenWeather (https://openweathermap.org/){'\n'}
        - Public Utilities Board (PUB) Singapore{'\n'}
        - Singapore Civil Defence Force (SCDF){'\n'}
        - Data.gov.sg
      </Text>

      <Text style={tw`font-bold mb-2`}>Special Thanks</Text>
      <Text style={tw`mb-4`}>
        - Our beta testers and survey participants for their valuable feedback.{'\n'}
        - Teachers, friends and family who supported me during development.
      </Text>

      <Text style={tw`text-center mt-6 text-sm text-gray-500`}>
        FloodSafe SG – Empowering communities for flood preparedness.
      </Text>
    </ScrollView>
  );
};

export default AcknowledgementScreen;

const styles = StyleSheet.create({});
