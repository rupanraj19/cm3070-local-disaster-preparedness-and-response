import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, ScrollView, Button, Alert } from 'react-native';
import tw from 'twrnc';
import { getFirestore, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { UserContext } from "../context/UserContext";// make sure this gives current user info

const GuideDetailsScreen = ({ route }) => {
  const { id, title, image, content } = route.params;
  const { userData } = useContext(UserContext);

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
    if (!userId) return;

    const userRef = doc(db, 'users', userId);

    try {
      await updateDoc(userRef, {
        completedGuides: arrayUnion(id)
      });

      setCompleted(true);
      Alert.alert('🎉 Completed!', 'You have earned a badge.');
    } catch (err) {
      console.error('Error updating Firestore:', err);
      Alert.alert('Error', 'Could not update progress.');
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`p-4`}>
      <Text style={tw`text-xl font-bold mb-3`}>{title}</Text>
      <Image source={image} style={tw`w-full h-48 rounded-lg mb-4`} resizeMode="cover" />
      <Text style={tw`text-base leading-relaxed`}>{content}</Text>

      <View style={tw`mt-6`}>
        {completed ? (
          <Text style={tw`text-green-600 text-base font-semibold`}>✅ Completed</Text>
        ) : (
          <Button title="Mark as Completed" onPress={markAsCompleted} />
        )}
      </View>
    </ScrollView>
  );
};

export default GuideDetailsScreen;
