import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { serverTimestamp, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { SocialIcon } from 'react-native-elements'


WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  // Google Sign-In configuration
  const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
  };

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true, // For Expo Go
    scheme: 'floodsafe_sg', // For standalone builds
  });

  console.log('Generated redirectUri:', redirectUri);
  console.log(AuthSession.makeRedirectUri({ useProxy: true }));

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      webClientId: '892330515524-iuaddi1ppekpla04qi6cilvrshp38oa0.apps.googleusercontent.com', // From Firebase Console
      redirectUri,
      scopes: ['profile', 'email'],
    },
    discovery
  );

  React.useEffect(() => {
    if (response) {
      console.log('AuthSession response:', response);
      if (response.type === 'success') {
        handleGoogleSignIn(response.params.id_token);
      } else if (response.type === 'error') {
        console.error('AuthSession error:', response.error);
        alert(`Google Sign-In failed: ${response.error?.description || 'Unknown error'}`);
      }
    }
  }, [response]);

  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      alert('Please fill all fields');
      return;
    }

    try {
      let email = emailOrUsername;
      if (!emailOrUsername.includes('@')) {
        console.log('Looking up username:', emailOrUsername);
        const usernameDoc = await getDoc(doc(db, 'usernames', emailOrUsername.toLowerCase()));
        if (!usernameDoc.exists()) {
          alert('Username not found');
          return;
        }
        email = usernameDoc.data().email;
        console.log('Found email for username:', email);
      }

      console.log('Attempting to log in with email:', email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
    } catch (error) {
      console.error('Login error:', error.code, error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async (idToken) => {
    try {
      console.log('Processing Google Sign-In with idToken');
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);
      const user = userCredential.user;
      console.log('Google Sign-In successful:', user.email);

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        // New user: Prompt for username
        Alert.prompt(
          'Enter Username',
          'Please choose a unique username',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: async () => {
                await auth.signOut();
              },
            },
            {
              text: 'OK',
              onPress: async (username) => {
                if (!username) {
                  alert('Username is required');
                  await auth.signOut();
                  return;
                }

                // Check if username is taken
                const usernameDoc = await getDoc(doc(db, 'usernames', username.toLowerCase()));
                if (usernameDoc.exists()) {
                  alert('Username already taken');
                  await auth.signOut();
                  return;
                }

                // Save user data
                await setDoc(doc(db, 'users', user.uid), {
                  username,
                  email: user.email,
                  createdAt: serverTimestamp(),
                  isNewUser: false,
                });
                await setDoc(doc(db, 'usernames', username.toLowerCase()), {
                  uid: user.uid,
                  email: user.email,
                });
                console.log('New user saved with username:', username);
              },
            },
          ]
        );
      } else {
        console.log('Existing user, navigating to Tabs');
      }
    } catch (error) {
      console.error('Google Sign-In error:', error.code, error.message);
      if (error.code === 'auth/account-exists-with-different-credential') {
        alert('This email is already registered with a different sign-in method.');
      } else {
        alert(`Google Sign-In failed: ${error.message}`);
      }
    }
  };

  return (
    <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={styles.image}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View>
          <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 10 }}>LOGIN</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username or Email"
            value={emailOrUsername}
            onChangeText={setEmailOrUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={{ textAlign: 'right', marginVertical: 10 }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.btn}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 20,}}>
              <Text style={styles.text}>
                Don't have an account?{' '}
                <Text
                  style={styles.linkText}
                  onPress={() => navigation.navigate('Register')}
                >
                  Register
                </Text>
              </Text>
        </View>

        <Text style={{fontSize: 16, fontWeight: 'bold', marginVertical: 20}}>-----------------OR----------------</Text>

        <View style={{width:'60%'}}>
          <TouchableOpacity

            disabled={!request}
            style={{width: '100%'}}
            onPress={()=>promptAsync()}
          >
            {/* <Text style={styles.btnText}>Sign in with Google</Text> */}
            <SocialIcon
            title="Sign In With Google"
            button
            type='google'
            />
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={[styles.btn, styles.btnOutline]}
          >
            <Text style={styles.btnOutlineText}>Go to Register</Text>
          </TouchableOpacity> */}
        </View>


      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
     marginBottom: 80
  },
  inputContainer: {
    width: '65%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 4,
  },
  btnContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  btn: {
    backgroundColor: '#0782f9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnOutline: {
    backgroundColor: 'white',
    marginTop: 10,
    borderColor: '#0782f9',
    borderWidth: 2,
  },
  btnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  btnOutlineText: {
    color: '#0782f9',
    fontWeight: '700',
    fontSize: 16,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
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
});