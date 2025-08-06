import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, ScrollView, Button, Alert } from 'react-native';
import tw from 'twrnc';
import { getFirestore, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { UserContext } from "../context/UserContext";// make sure this gives current user info
import * as Animatable from 'react-native-animatable';

const guideBadgeData = {
  guide1: {
    name: "DisasterAware",
    image: require('../assets/images/aware.png'),
  },
  guide2: {
    name: "FloodResponder",
    image: require('../assets/images/ready.png'),
  },
  guide3: {
    name: "KitMaster",
    image: require('../assets/images/packbag.png'),
  },
  // Add more badges here...
};

const GuideDetailsScreen = ({ route }) => {
  const {
    id,
    title_en,
    title_ta,
    title_zh,
    title_ms,
    content_en,
    content_ta,
    content_zh,
    content_ms,
    image,
    language
  } = route.params;


  const { userData } = useContext(UserContext);

  // language
  const [currentLang, setCurrentLang] = useState(language || 'en');
  const title =
  currentLang === 'ta' ? title_ta :
  currentLang === 'zh' ? title_zh :
  currentLang === 'ms' ? title_ms :
  title_en;

const content =
  currentLang === 'ta' ? content_ta :
  currentLang === 'zh' ? content_zh :
  currentLang === 'ms' ? content_ms :
  content_en;

  const [completed, setCompleted] = useState(false);
  const db = getFirestore();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    checkIfCompleted();
  }, []);

  const checkIfCompleted = async () => {
    if (!userId) return;
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      const completedGuides = data.completedGuides || [];
      if (completedGuides.includes(id)) {
        setCompleted(true);
      }
    }
  };

  const markAsCompleted = async () => {
    if (!userId) {
      Alert.alert('Error', 'User not logged in.');
      return;
    }
    const userRef = doc(db, 'users', userId);

    try {
      console.log(`Updating user ${userId} with completed guide ${id}`);
      await updateDoc(userRef, {
        completedGuides: arrayUnion(id),
        badges: arrayUnion(guideBadgeData[`guide${id}`]?.name || `Guide ${id}`)
      });
      setCompleted(true);
      setShowBadge(id);
    } catch (err) {
      console.error('Error updating Firestore:', err);
      Alert.alert('Error', 'Could not update progress.');
    }
  };

  const [showBadge, setShowBadge] = useState(null);
useEffect(() => {
  if (showBadge) {
    const timer = setTimeout(() => setShowBadge(null), 4000);
    return () => clearTimeout(timer);
  }
}, [showBadge]);



  return (
    <ScrollView contentContainerStyle={tw`p-4`}>
      <View style={tw`flex-row justify-around mb-4`}>
      <Button title="English" onPress={() => setCurrentLang('en')} />
      <Button title="தமிழ்" onPress={() => setCurrentLang('ta')} />
      <Button title="中文" onPress={() => setCurrentLang('zh')} />
      <Button title="Malay" onPress={() => setCurrentLang('ms')} />
    </View>

      <Text style={tw`text-xl font-bold mb-3`}>{title}</Text>
      <Image source={image} style={tw`w-full h-48 rounded-lg mb-4`} resizeMode="cover" />
      <Text style={tw`text-base leading-relaxed`}>{content}</Text>

      <View style={tw`mt-6 mb-20`}>
        {completed ? (
          <Text style={tw`text-green-600 text-base font-semibold`}>✅ Completed</Text>
        ) : (
          <Button title="Mark as Completed" onPress={markAsCompleted} />
        )}
      </View>
      {/* badge animation */}
{showBadge === id && guideBadgeData[`guide${id}`] && (
  <Animatable.View animation="bounceInDown" delay={200} style={tw`items-center mb-40`}>
    <Image
      source={guideBadgeData[`guide${id}`].image}
      style={tw`w-24 h-24 mb-2`}
      resizeMode='contain'
    />
    <Text style={tw`text-base font-semibold text-blue-500`}>
      {guideBadgeData[`guide${id}`].name} Unlocked!
    </Text>
  </Animatable.View>
)}


    </ScrollView>


  );
};

export default GuideDetailsScreen;
