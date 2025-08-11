import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import tw from 'twrnc';

const FeedbackScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { bgColor, textColor, borderColor} = useTheme();

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mblyevqp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Success', 'Thanks for your feedback!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        Alert.alert('Error', result?.message || 'Failed to send message.');
      }

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
<ScrollView contentContainerStyle={tw`flex-1 p-4 ${bgColor}`}>
      <Text style={tw`text-2xl font-bold mt-15 mb-4 self-center ${textColor}`}>Send us a message</Text>

      <Text style={tw`mt-3 mb-1 text-base font-semibold ${textColor}`}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={tw`bg-white border border-gray-300 px-4 py-2 rounded-md`}
        placeholder="Your name"
      />

      <Text style={tw`mt-3 mb-1 text-base font-semibold ${textColor}`}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={tw`bg-white border border-gray-300 px-4 py-2 rounded-md`}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={tw`mt-3 mb-1 text-base font-semibold ${textColor}`}>Message</Text>
      <TextInput
        value={message}
        onChangeText={setMessage}
        style={tw`bg-white border border-gray-300 px-4 py-2 rounded-md h-24 text-top`}
        placeholder="Type your message here"
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        style={tw`bg-blue-500 py-3 mt-6 rounded-lg items-center`}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={tw`text-white text-base font-bold`}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FeedbackScreen;
