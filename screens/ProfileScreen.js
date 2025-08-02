// ---------------------PROFILE SCREEN------------------------
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import tw from 'twrnc';

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  const db = getFirestore();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
  fetchUserInfo(); // fetch once on mount

  if (!db) return;
  const leaderboardRef = collection(db, 'leaderboard');

  // Real-time listener for leaderboard updates
  const unsubscribe = onSnapshot(leaderboardRef, (querySnapshot) => {
    const leaderboardData = [];
    querySnapshot.forEach(docSnap => {
      const data = docSnap.data();
      leaderboardData.push({
        id: docSnap.id,
        username: data.name || 'Anonymous', // check your firestore field name here
        points: data.points || 0,
      });
    });

    const sorted = leaderboardData.sort((a, b) => b.points - a.points);
    setLeaderboard(sorted);
  });

  return () => unsubscribe();
}, []);


  const fetchUserInfo = async () => {
    if (!userId) return;
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      setUsername(data.username || 'Unknown');
      setPoints(data.points || 0);
      setStreak(data.streak || 0);
    }
  };



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={tw`text-2xl font-bold mb-4`}>Profile</Text>
      <Text style={tw`text-lg`}>Username: {username}</Text>
      <Text style={tw`text-lg`}>Streak: 🔥 {streak}</Text>
      <Text style={tw`text-lg`}>Points: ⭐ {points}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={tw`mt-4`}>
        <Text style={tw`text-blue-500 text-base underline`}>Go to Settings</Text>
      </TouchableOpacity>

      <Text style={tw`text-xl font-bold mt-6 mb-2`}>Leaderboard</Text>
      {leaderboard.map((user, index) => (
        <Text key={user.id} style={tw`text-base`}>
          {index + 1}. {user.username} – {user.points} pts
        </Text>
      ))}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  }
});
