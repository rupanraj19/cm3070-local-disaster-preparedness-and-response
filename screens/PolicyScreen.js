// ------------------------- POLICY SCREEN -----------------------
import { Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../context/ThemeContext';

const PolicyScreen = () => {

 const { bgColor, textColor} = useTheme();
  return (
    <ScrollView style={tw`px-4 py-6 ${bgColor}`}>
      <Text style={tw`mb-4 text-base ${textColor}`}>
        FloodSafe SG respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and store your information.
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>1. Information We Collect</Text>
      <Text style={tw`mb-4 ${textColor}`}>
        - Location data (to provide flood alerts and nearby safety zones){'\n'}
        - Account information (email, name if provided){'\n'}
        - Feedback and app usage statistics (for improvement)
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>2. How We Use Your Data</Text>
      <Text style={tw`mb-4 ${textColor}`}>
        Your data is used to deliver core features such as location-based flood warnings, emergency contact messaging, and user personalization.
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>3. Data Storage</Text>
      <Text style={tw`mb-4 ${textColor}`}>
        All data is stored securely using Firebase services. We do not share or sell your data to third parties.
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>4. Your Consent</Text>
      <Text style={tw`mb-4 ${textColor}`}>
        By using FloodSafe SG, you agree to the collection and use of information in accordance with this policy.
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>5. Contact</Text>
      <Text style={tw`mb-30 ${textColor}`}>
        For any questions or concerns, please contact us using feedback.
      </Text>
    </ScrollView>
  );
};

export default PolicyScreen;

