// -----------------MAIN STACK-------------------------
import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from '../navigation/AuthStack'; // Stack for unauthenticated users
import Tabs from '../navigation/tabs'; // Bottom tab navigation
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { UserContext } from '../context/UserContext'; // ✅ Import UserContext

export default function MainStack() {
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const { setUserData } = useContext(UserContext); // ✅ Access context setter

  useEffect(() => {
    console.log('Setting up onAuthStateChanged listener');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user ? { uid: user.uid, email: user.email } : 'No user');

      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const name = userData.username || 'User';
            const lastLogin = userData.lastLoginDate || null;
            const streak = userData.streak || 0;

            const todayStr = format(new Date(), 'yyyy-MM-dd');
            let newStreak = 1;

            if (lastLogin) {
              const last = new Date(lastLogin);
              const diffDays = Math.floor(
                (new Date().setHours(0, 0, 0, 0) - last.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
              );

              if (diffDays === 1) newStreak = streak + 1;
              else if (diffDays === 0) newStreak = streak;
            }

            // Save updated streak and login date
            await updateDoc(userRef, {
              lastLoginDate: todayStr,
              streak: newStreak
            });

            // ✅ Set context data for global use
            setUserData({ name, streak: newStreak });

            if (userData.isNewUser) {
              console.log('New user detected, updating isNewUser and staying in AuthStack');
              await updateDoc(userRef, { isNewUser: false });
              setIsNewUser(true);
              setUser(null);
            } else {
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
          setIsNewUser(false);
          setUser(user);
        }
      } else {
        console.log('No authenticated user, rendering AuthStack');
        setIsNewUser(false);
        setUser(null);
      }

      setLoading(false);
    });

    return () => {
      console.log('Cleaning up onAuthStateChanged listener');
      unsubscribe();
    };
  }, [setUserData]);

  if (loading) {
    console.log('Showing loading state');
    return null; // Replace with splash screen if needed
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
