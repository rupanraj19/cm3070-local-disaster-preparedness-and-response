import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { getFirestore, doc, collection, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useTheme } from '../context/ThemeContext';


const badgeImages = {
  PackBagMaster: require('../assets/images/bagbadge.png'),
  floodSafetyQuizMaster: require('../assets/images/high-score.png'),
  floodAwarenessQuizMaster: require('../assets/images/high-score.png'),
  DisasterAware: require('../assets/images/aware.png'),
  FloodResponder: require('../assets/images/ready.png'),
  KitMaster: require('../assets/images/packbag.png'),
  EmergencySupplies: require('../assets/images/badges/bagbadge2.png'),
  DisasterType: require('../assets/images/badges/generalbadge.png'),
  SafetyConcepts: require('../assets/images/badges/safetybadge.png'),
};

const ProfileScreen = ({ navigation }) => {
  const { bgColor, textColor, borderColor} = useTheme();
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(1);
  const [badges, setBadges] = useState([]);
  const [showAllBadges, setShowAllBadges] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);


  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);

    // 🔄 Realtime listener for user data
    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setUsername(data.username || 'User');
        setPoints(data.points || 0);
        setStreak(data.streak || 0);
        setHighestStreak(data.highestStreak || 0);
        setBadges(Array.isArray(data.badges) ? data.badges : []);
        if (data.createdAt?.toDate) {
          const date = data.createdAt.toDate();
          setCreatedAt(date.toDateString());
        }
      }
    });

    return () => unsubscribe();
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
    <SafeAreaView style={tw`${bgColor}`}>
      <Text style={tw`text-2xl font-bold text-center border-b p-5 border-gray-300 ${bgColor} ${textColor}`}>Profile</Text>
      <ScrollView contentContainerStyle={tw`px-6 py-8 ${bgColor}`}>
      {/* Settings Button */}
      <TouchableOpacity
        style={tw`absolute top-10 right-6 z-10`}
        onPress={() => navigation.navigate('Settings')}
      >
        <Ionicons name="settings-outline" size={28} color="#555" />
      </TouchableOpacity>

      {/* Profile Header */}
      <View style={tw`items-center mb-8 shadow-lg`}>
        <Image
          source={require('../assets/images/user.png')}
          style={tw`w-24 h-24 rounded-full mb-3`}
        />
        <Text style={tw`text-xl font-semibold ${textColor}`}>{username}</Text>
        <Text style={tw`text-sm text-gray-500`}>Joined: {createdAt}</Text>
      </View>

      {/* Overview Section */}
      <View style={tw`${bgColor} rounded-2xl shadow-lg p-5 mb-4 ${borderColor}`}>
        <Text style={tw`text-lg font-semibold mb-4 ${textColor}`}>Overview</Text>
        <View style={tw`flex-row justify-between`}>
          <View style={tw`items-center`}>
            <Text style={tw`text-2xl font-bold text-blue-600`}>{streak}</Text>
            <Text style={tw`text-sm text-gray-500`}>Streak</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`text-2xl font-bold text-red-600`}>{highestStreak}</Text>
            <Text style={tw`text-sm text-gray-500 `}>Highest Streak</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`text-2xl font-bold text-green-600`}>{points}</Text>
            <Text style={tw`text-sm text-gray-500`}>Points</Text>
          </View>
        </View>
      </View>

      {/* Badges Section */}
      <View style={tw`${bgColor} rounded-2xl shadow-lg p-5 mb-4 ${borderColor}`}>
  <View style={tw`flex-row justify-between items-center mb-4`}>
    <Text style={tw`text-lg font-semibold ${textColor}`}>Badges</Text>
    {badges.length > 2 && (
      <TouchableOpacity onPress={() => setShowAllBadges(!showAllBadges)}>
        <Text style={tw`text-blue-500 font-medium`}>
          {showAllBadges ? 'See Less' : 'See All'}
        </Text>
      </TouchableOpacity>
    )}
  </View>
        <View style={[
      tw`flex-row flex-wrap justify-around items-center overflow-hidden`,
      !showAllBadges && { height: 100 }
    ]}
>
      {badges.length > 0 ? (
      badges.map((badge) => (
        <View key={badge} style={tw`items-center mr-4 mb-4`}>
          <Image
            source={badgeImages[badge]}
            style={{ width: 60, height: 60, borderRadius: 10 }}
          />
          <Text style={tw`text-xs mt-1 text-gray-500`}>{badge}</Text>
        </View>
      ))
    ) : (
      <Text style={tw`text-base text-gray-400`}>No badges earned yet.</Text>
    )}
  </View>
</View>

      {/* Leaderboard */}
      <View style={tw`${bgColor} rounded-2xl shadow-lg p-6 mb-40 ${borderColor}`}>
        <Text style={tw`text-xl font-semibold ${textColor} mb-4`}>🏆 Leaderboard</Text>
        {leaderboard.map((user, index) => (
          <View key={user.id} style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-base text-gray-500`}>
              {index + 1}. {user.username}
            </Text>
            <Text style={tw`text-base text-gray-500`}>{user.points} pts</Text>
          </View>
        ))}
        <Text style={tw`text-center text-gray-500 mt-4`}>This leaderboard will reset every week :)</Text>
      </View>
    </ScrollView>
    </SafeAreaView>


  );
};

export default ProfileScreen;
