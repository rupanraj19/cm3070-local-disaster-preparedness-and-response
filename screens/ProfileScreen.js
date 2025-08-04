import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc,collection, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const badgeImages = {
  PackBagMaster: require('../assets/images/bagbadge.png'),
  floodSafetyQuizMaster: require('../assets/images/bagbadge.png'),
  // Add more badge images here...
};

const ProfileScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);
  const [createdAt, setCreatedAt] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();
        setUsername(data.username || 'User');
        setPoints(data.points || 0);
        setStreak(data.streak || 0);
        setBadges(Array.isArray(data.badges) ? data.badges : []);
        if (data.createdAt?.toDate) {
          const date = data.createdAt.toDate();
          setCreatedAt(date.toDateString());
        }
      }
    };

    fetchUserInfo();
  }, []);

   useEffect(() => {
    const db = getFirestore();
    const leaderboardRef = collection(db, 'leaderboard');

    const unsubscribe = onSnapshot(leaderboardRef, (querySnapshot) => {
      const leaderboardData = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        leaderboardData.push({
          id: docSnap.id,
          username: data.name || 'Anonymous',
          points: data.points || 0,
        });
      });

      const sorted = leaderboardData.sort((a, b) => b.points - a.points);
      setLeaderboard(sorted);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView contentContainerStyle={tw`px-6 py-8`}>
       {/* Settings Button */}
      <TouchableOpacity
        style={tw`absolute top-10 right-6 z-10`}
        onPress={() => navigation.navigate('Settings')}
      >
        <Ionicons name="settings-outline" size={28} color="#555" />
      </TouchableOpacity>

      {/* Profile Header */}
      <View style={tw`items-center mb-8`}>
        <Image
          source={require('../assets/images/user.png')}
          style={tw`w-24 h-24 rounded-full mb-3`}
        />
        <Text style={tw`text-xl font-semibold`}>{username}</Text>
        <Text style={tw`text-sm text-gray-500`}>Joined: {createdAt}</Text>
      </View>

      {/* Overview Section */}
      <View style={tw`bg-white rounded-2xl shadow p-5 mb-4`}>
        <Text style={tw`text-lg font-semibold mb-4`}>Overview</Text>
        <View style={tw`flex-row justify-between`}>
          <View style={tw`items-center`}>
            <Text style={tw`text-2xl font-bold text-blue-600`}>{streak}</Text>
            <Text style={tw`text-sm text-gray-500`}>Streak</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`text-2xl font-bold text-green-600`}>{points}</Text>
            <Text style={tw`text-sm text-gray-500`}>Points</Text>
          </View>
        </View>
      </View>

      {/* Badges Section */}
      <View style={tw`bg-white rounded-2xl shadow p-5 mb-4`}>
        <Text style={tw`text-lg font-semibold mb-4`}>Badges</Text>
        <View style={tw`flex-row flex-wrap`}>
          {badges.length > 0 ? (
            badges.map((badge) => (
              <View key={badge} style={tw`items-center mr-4 mb-4`}>
                <Image
                  source={badgeImages[badge]}
                  style={{ width: 60, height: 60, borderRadius: 10 }}
                />
                <Text style={tw`text-xs mt-1`}>{badge}</Text>
              </View>
            ))
          ) : (
            <Text style={tw`text-base text-gray-400`}>No badges earned yet.</Text>
          )}
        </View>
      </View>
            {/* Leaderboard Card */}
      <View style={tw`bg-white rounded-2xl shadow-lg p-6 mb-20`}>
        <Text style={tw`text-xl font-semibold text-gray-800 mb-4`}>🏆 Leaderboard</Text>
        {leaderboard.map((user, index) => (
          <View key={user.id} style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-base text-gray-700`}>
              {index + 1}. {user.username}
            </Text>
            <Text style={tw`text-base text-gray-500`}>{user.points} pts</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
