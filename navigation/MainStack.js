// -----------------MAIN STACK-------------------------
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from '../navigation/AuthStack'; // Stack for unauthenticated users (login, register, etc.)
import Tabs from '../navigation/tabs'; // Bottom tab navigation for authenticated users
import { onAuthStateChanged } from 'firebase/auth'; // Listener for auth state changes
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function MainStack() {
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true); // Control render while checking auth state

  // Listen for auth state changes (login/logout)
  useEffect(() => {
    console.log('Setting up onAuthStateChanged listener');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user ? { uid: user.uid, email: user.email } : 'No user');
      if (user) {
        try {
          // Fetch user document from Firestore
          console.log('Fetching user document for UID:', user.uid);
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('User document data:', userData);
            if (userData.isNewUser) {
              console.log('New user detected, updating isNewUser and staying in AuthStack');
              await updateDoc(doc(db, 'users', user.uid), { isNewUser: false });
              setIsNewUser(true); // Still considered new in local state, stay in AuthStack
              setUser(null);
            } else {
              console.log('Existing user, setting user state for Tabs');
              setIsNewUser(false);
              setUser(user);
            }
          } else {
            console.log('No user document found, defaulting to Tabs');
            setIsNewUser(false);
            setUser(user);
          }
        } catch (error) {
          console.error('Firestore error:', error.code, error.message);
          // Fallback to Tabs to avoid getting stuck
          setIsNewUser(false);
          setUser(user);
        }
      } else {
        console.log('No authenticated user, rendering AuthStack');
        setIsNewUser(false);
        setUser(null);
      }
      console.log('Setting loading to false');
      setLoading(false);
    });
    return () => {
      console.log('Cleaning up onAuthStateChanged listener');
      unsubscribe();
    };
  }, []);

  console.log('Rendering MainStack, loading:', loading, 'user:', user ? user.uid : null, 'isNewUser:', isNewUser);

  if (loading) {
    console.log('Showing loading state');
    return null; // Or a splash screen
  }

  return (
    <NavigationContainer>
      {user && !isNewUser ? (
        <>
          <Tabs />
          {console.log('Rendering Tabs')}
        </>
      ) : (
        <>
          <AuthStack />
          {console.log('Rendering AuthStack')}
        </>
      )}
    </NavigationContainer>
  );
}