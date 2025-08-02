import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { getFirestore, doc, updateDoc, increment, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as Animatable from 'react-native-animatable';


const emergencyItems = [
  { name: 'Water Bottle', image: require('../assets/images/water.png'), isCorrect: true },
  { name: 'Flashlight', image: require('../assets/images/flashlight.png'), isCorrect: true },
  { name: 'FirstAidKit', image: require('../assets/images/first-aid-kit.png'), isCorrect: true },
  { name: 'Chips', image: require('../assets/images/chips.png'), isCorrect: false },
];

const PackBagGame = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [flyingItems, setFlyingItems] = useState([]);
  const [score, setScore] = useState(0);

 const handleItemPress = (item) => {
  const isAlreadySelected = selectedItems.includes(item.name);

  if (!isAlreadySelected) {
    const flyingItemId = Date.now();

    setSelectedItems((prev) => [...prev, item.name]);

    // Add to flying items with the generated id
    setFlyingItems((prev) => [...prev, { ...item, id: flyingItemId }]);

    // Remove the flying image after 1.5s
    setTimeout(() => {
      setFlyingItems((prev) => prev.filter((fItem) => fItem.id !== flyingItemId));
    }, 1500);
  } else {
    setSelectedItems((prev) => prev.filter((name) => name !== item.name));
  }
};

const updateLeaderboard = async (username, points) => {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return;

  try {
    await setDoc(doc(db, "leaderboard", user.uid), {
      name: username,
      points: points,
      // Optionally add streak here if you have it
    });
    console.log("Leaderboard updated");
  } catch (err) {
    console.error("Failed to update leaderboard", err);
  }
};

const handleSubmit = async () => {
  const correctCount = selectedItems.filter((name) =>
    emergencyItems.find((item) => item.name === name && item.isCorrect)
  );

  const totalScore = correctCount.length * 10;
  setScore(totalScore);

  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;

  if (userId) {
    const userRef = doc(db, 'users', userId);

    try {
      // First, increment points in user document
      await updateDoc(userRef, {
        points: increment(totalScore),
      });
      console.log(`${totalScore} points added`);

      // Now, get the latest user data (name + points)
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      const username = userData.username || 'Unknown';
      const updatedPoints = (userData.points || 0) + totalScore;

      // Update leaderboard with latest info
      await updateLeaderboard(username, updatedPoints);
    } catch (err) {
      console.error('Error updating Firestore:', err);
    }
  }

  navigation.navigate('PbgResult', { score: totalScore });
};


  return (
    <View style={tw`p-4 mt-2`}>

      <Text style={tw`text-lg text-center mb-2`}>Select the Correct Items:</Text>
      {/* Grid of items */}
<View style={tw`flex-row flex-wrap justify-between`}>
  {emergencyItems.map((item) => {
    const isSelected = selectedItems.includes(item.name);

    return (
      <TouchableOpacity
        key={item.name}
        style={tw.style(
          `w-4/18 m-1 p-2 rounded-md items-center border-2`,
          isSelected ? 'bg-green-200 border-green-500' : 'bg-white border-blue-500'
        )}
        onPress={() => handleItemPress(item)}
      >
        <Image
          source={item.image}
          style={tw`w-16 h-16 mb-2`}
          resizeMode="contain"
        />
        <Text style={tw`text-center text-sm`}>{item.name}</Text>
      </TouchableOpacity>
    );
  })}
</View>


        {flyingItems.map((item) => (
          <Animatable.Image
            key={item.id}
            source={item.image}
            animation="zoomInDown"
            duration={100}
            style={tw.style(
              `absolute w-16 h-16`,
              {
                bottom: 160, // near the bag image
                left: '50%', // tweak as needed
                zIndex: 50,
              }
            )}
            resizeMode="contain"
            useNativeDriver
          />
        ))}


      {/* Bag Image */}
      <Image
        source={require('../assets/images/duffle-bag.png')}
        style={tw.style(tw`h-1/2 mt-4 mx-8`, { aspectRatio: 1 })}
      />

      {/* Selected items list */}
      <Text style={tw`text-center mt-2`}>Items in bag: {selectedItems.join(', ')}</Text>

      {/* Submit Button */}
      <TouchableOpacity
        style={tw`bg-blue-500 p-3 rounded-md mt-6 w-30 self-center`}
        onPress={handleSubmit}
      >
        <Text style={tw`text-white text-lg text-center`}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PackBagGame;

const styles = StyleSheet.create({});
