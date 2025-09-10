// ----------------FORGOT PASSWORD--------------------
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import tw from 'twrnc';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    if (!email) {
      Alert.alert('Please enter your email.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Password reset email sent!', 'Please check your inbox.');
        navigation.goBack(); // or navigate to login screen
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Error', 'No account found with that email.');
        } else {
          Alert.alert('Error', error.message);
        }
      });
  };

  return (
    <View style={tw`flex-1 justify-center items-center p-6 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-6`}>Reset Your Password</Text>

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={tw`w-full bg-gray-200 p-3 rounded-lg mb-4`}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={handlePasswordReset}
        style={tw`bg-blue-500 py-4 rounded-lg w-full items-center mb-2`}
      >
        <Text style={tw`text-white font-bold text-base`}>Send Reset Email</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mt-3`}>
        <Text style={tw`text-blue-500 text-sm`}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
