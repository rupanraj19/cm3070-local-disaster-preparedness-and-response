// --------------------REGISTER SCREEN---------------------------
import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import Checkbox from 'expo-checkbox';
import tw from 'twrnc';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    if (!agree) {
      alert('You must agree to the Terms & Conditions and Privacy Policy before registering.');
      return;
    }

    try {
      const usernameDoc = await getDoc(doc(db, 'usernames', username.toLowerCase()));
      if (usernameDoc.exists()) {
        alert('Username already taken');
        return;
      }

      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: user.email,
        createdAt: serverTimestamp(),
        isNewUser: true,
        agreedToTerms: true, // store consent
      });

      await setDoc(doc(db, 'usernames', username.toLowerCase()), {
        uid: user.uid,
        email: user.email,
      });

      alert('Registered successfully!');
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration error:', error.code, error.message);
      alert(`Error: ${error.code} - ${error.message}`);
    }
  };

  return (
    <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={tw`flex-1 w-full h-full justify-center`}>
      <KeyboardAvoidingView style={tw`flex-1 items-center justify-center mb-20`} behavior="padding">

        <Text style={tw`text-3xl font-bold mb-3`}>REGISTER</Text>

        <View style={tw`w-4/5`}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={tw`bg-white px-4 py-3 rounded-lg border mt-2`}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={tw`bg-white px-4 py-3 rounded-lg border mt-2`}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={tw`bg-white px-4 py-3 rounded-lg border mt-2`}
          />
        </View>

        {/* --- Terms Checkbox --- */}
        <View style={tw`flex-row items-center mt-4 w-4/5 flex-wrap`}>
          <Checkbox
            value={agree}
            onValueChange={setAgree}
            color={agree ? '#0782f9' : undefined}
            style={tw`w-5 h-5`}
          />
          <Text style={tw`text-sm text-gray-700 ml-2 flex-1`}>
            I agree to the{' '}
            <Text style={tw`text-blue-500 underline font-bold`} onPress={() => navigation.navigate('Terms')}>
              Terms & Conditions
            </Text>{' '}
            and{' '}
            <Text style={tw`text-blue-500 underline font-bold`} onPress={() => navigation.navigate('Policy')}>
              Privacy Policy
            </Text>
          </Text>
        </View>

        <View style={tw`w-3/5 items-center mt-8`}>
          <TouchableOpacity
            onPress={handleSignUp}
            style={tw`${agree ? 'bg-blue-500' : 'bg-gray-400'} w-full py-4 rounded-lg items-center`}
            disabled={!agree}
          >
            <Text style={tw`text-white font-bold text-base`}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`mt-5`}>
          <Text style={tw`text-lg text-gray-800`}>
            Already have an account?{' '}
            <Text
              style={tw`text-blue-500 underline font-bold`}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterScreen;
