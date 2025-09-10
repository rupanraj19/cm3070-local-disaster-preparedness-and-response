// ------------- TERMS SCREEN -------------------
import { Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../context/ThemeContext';

const TermsScreen = () => {
  const { bgColor, textColor} = useTheme();

  return (
    <ScrollView style={tw`px-4 py-6 ${bgColor}`}>
      <Text style={tw`mb-4 text-base ${textColor}`}>
        Please read these terms and conditions carefully before using the FloodSafe SG mobile application.
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>1. Acceptance of Terms</Text>
      <Text style={tw`mb-4 ${textColor}`}>
        By using the App, you agree to be bound by these Terms. If you disagree with any part, you may not use the App.
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>2. Use of the App</Text>
      <Text style={tw`mb-4 ${textColor}`}>
        The App is intended for personal, non-commercial use to improve flood preparedness and response. Misuse or tampering with app features is prohibited.
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>3. Accuracy of Information</Text>
      <Text style={tw`mb-4 ${textColor}`}>
        While we strive for accuracy, flood alerts and data may not always be up-to-date or error-free. Please use official government sources during emergencies.
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>4. User Responsibility</Text>
      <Text style={tw`mb-4 ${textColor}`}>
        You are responsible for maintaining the confidentiality of your login information and using the app in a lawful and respectful manner.
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>5. Changes to Terms</Text>
      <Text style={tw`mb-4 ${textColor}`}>
        We may update these Terms from time to time. Continued use of the App means you accept any changes.
      </Text>

      <Text style={tw`font-bold mb-2 ${textColor}`}>6. Contact</Text>
      <Text style={tw`mb-30 ${textColor}`}>
        If you have any questions about these Terms, please email us using feedback.
      </Text>
    </ScrollView>
  );
};

export default TermsScreen;

