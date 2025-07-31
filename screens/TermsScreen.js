import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import tw from 'twrnc';

const TermsScreen = () => {
  return (
    <ScrollView style={tw`px-4 py-6 mb-30`}>
      <Text style={tw`text-2xl font-bold text-center mb-4`}>Terms & Conditions</Text>
      <Text style={tw`mb-4 text-base`}>
        Please read these terms and conditions ("Terms") carefully before using the FloodSafe SG mobile application ("App").
      </Text>

      <Text style={tw`font-bold mb-2`}>1. Acceptance of Terms</Text>
      <Text style={tw`mb-4`}>
        By using the App, you agree to be bound by these Terms. If you disagree with any part, you may not use the App.
      </Text>

      <Text style={tw`font-bold mb-2`}>2. Use of the App</Text>
      <Text style={tw`mb-4`}>
        The App is intended for personal, non-commercial use to improve flood preparedness and response. Misuse or tampering with app features is prohibited.
      </Text>

      <Text style={tw`font-bold mb-2`}>3. Accuracy of Information</Text>
      <Text style={tw`mb-4`}>
        While we strive for accuracy, flood alerts and data may not always be up-to-date or error-free. Please use official government sources during emergencies.
      </Text>

      <Text style={tw`font-bold mb-2`}>4. User Responsibility</Text>
      <Text style={tw`mb-4`}>
        You are responsible for maintaining the confidentiality of your login information and using the app in a lawful and respectful manner.
      </Text>

      <Text style={tw`font-bold mb-2`}>5. Changes to Terms</Text>
      <Text style={tw`mb-4`}>
        We may update these Terms from time to time. Continued use of the App means you accept any changes.
      </Text>

      <Text style={tw`font-bold mb-2`}>6. Contact</Text>
      <Text style={tw`mb-4`}>
        If you have any questions about these Terms, please email us using feedback.
      </Text>
    </ScrollView>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({});
