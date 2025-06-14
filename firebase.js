import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKdMXNf5SIpKY-JGZ7cAOipJ8SYq5MaVU",
  authDomain: "fir-auth-c133c.firebaseapp.com",
  projectId: "fir-auth-c133c",
  storageBucket: "fir-auth-c133c.firebasestorage.app",
  messagingSenderId: "892330515524",
  appId: "1:892330515524:web:97f739632b97ed72afb011"
};

// Ensure Firebase app is initialized only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize or get existing Auth instance
let auth;
try {
  auth = getAuth(app); // Try to get existing auth instance
} catch (error) {
  if (error.code === 'auth/no-auth-instance') {
    // If no auth instance exists, initialize one
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } else {
    throw error; // Rethrow other errors
  }
}

const db = getFirestore(app);

console.log('Firestore initialized:', db);

export { auth, db };