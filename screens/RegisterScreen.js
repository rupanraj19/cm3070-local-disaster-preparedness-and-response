// --------------------REGISTER SCREEN---------------------------
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { signOut } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


const handleSignUp = async () => {
  if (!username || !email || !password) {
    alert('Please fill all fields');
    return;
  }

  try {
    console.log('Checking username availability:', username);
    const usernameDoc = await getDoc(doc(db, 'usernames', username.toLowerCase()));
    if (usernameDoc.exists()) {
      alert('Username already taken');
      return;
    }

    console.log('Attempting to register user with email:', email);
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredentials.user;
    console.log('User registered:', user.uid);

    console.log('Attempting to save user data to Firestore...');
    await setDoc(doc(db, 'users', user.uid), {
      username: username,
      email: user.email,
      createdAt: serverTimestamp(),
      isNewUser: true,
    });
    await setDoc(doc(db, 'usernames', username.toLowerCase()), {
      uid: user.uid,
      email: user.email,
    });
    console.log('User data saved to Firestore');

    alert('Registered successfully!');
    await auth.signOut();
    navigation.navigate('Login');
  } catch (error) {
    console.error('Registration error:', error.code, error.message);
    alert(`Error: ${error.code} - ${error.message}`);
  }
};

  return (

    <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={styles.image} >
    <KeyboardAvoidingView style={styles.container} behavior="padding">

      <View>
          <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 10 }}>REGISTER</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.btn}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 20,}}>
         <Text style={styles.text}>
        Already have an account?{' '}
        <Text
          style={styles.linkText}
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

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 80
    },
    inputContainer:{
          width: '80%',
    },
    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius:10,
        marginTop: 5,
        borderWidth: 1,
        marginVertical: 4,
    },
    btnContainer:{
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    btn: {
        backgroundColor: '#0782f9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: "center",

    },
    btnOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782f9',
        borderWidth: 2,
    },
    btnText:{
        color: 'white',
        fontWeight: 700,
        fontSize: 16,

    },
    btnOutlineText: {
        color: '#0782f9',
        fontWeight: 700,
        fontSize: 16,
    },
    image: {
      flex: 1,
      justifyContent: "center",
      width: '100%',
      height: '100%',
    },
    text: {
    fontSize: 18,
    color: '#333',
    },
    linkText: {
      color: '#0782f9',
      textDecorationLine: 'underline',
      fontWeight: 'bold',
    },
  })