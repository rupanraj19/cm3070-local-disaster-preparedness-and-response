import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { getFirestore, doc, updateDoc, increment, setDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as Animatable from 'react-native-animatable';



const emergencyItems = [
  { name: 'Water', image: require('../../../assets/images/games/water.png'), isCorrect: true },
  { name: 'Flashlight', image: require('../../../assets/images/games/flashlight.png'), isCorrect: true },
  { name: 'FirstAid', image: require('../../../assets/images/first-aid-kit.png'), isCorrect: true },
  { name: 'Chips', image: require('../../../assets/images/games/chips.png'), isCorrect: false },
  { name: 'Medicine', image: require('../../../assets/images/games/medicine.png'), isCorrect: true },
  { name: 'Umbrella', image: require('../../../assets/images/games/umbrella.png'), isCorrect: true },
  { name: 'Whistle', image: require('../../../assets/images/games/whistle.png'), isCorrect: true },
  { name: 'Toys', image: require('../../../assets/images/games/toys.png'), isCorrect: false },
  { name: 'Guitar', image: require('../../../assets/images/games/guitar.png'), isCorrect: false },
  { name: 'Football', image: require('../../../assets/images/games/football.png'), isCorrect: false },
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
    });
    console.log("Leaderboard updated");
  } catch (err) {
    console.error("Failed to update leaderboard", err);
  }
};

const handleSubmit = async () => {
  // Start at 0
  let totalScore = 0;

  // Loop over all selected items
  selectedItems.forEach((name) => {
    const item = emergencyItems.find((i) => i.name === name);
    if (item) {
      if (item.isCorrect) {
        totalScore += 10; // correct item
      } else {
        totalScore -= 10; // incorrect item
      }
    }
  });

  setScore(totalScore);

  // Check for perfect game: all correct items chosen, and no wrong items
  const correctItems = emergencyItems.filter((item) => item.isCorrect).map(i => i.name);
  const earnedBadge =
    correctItems.every((name) => selectedItems.includes(name)) &&
    selectedItems.every((name) => correctItems.includes(name));

  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;

  if (userId) {
    const userRef = doc(db, 'users', userId);

    try {
      const updates = { points: increment(totalScore) };
      if (earnedBadge) {
        updates.badges = arrayUnion("PackBagMaster");
      }

      // Update user
      await updateDoc(userRef, updates);
      console.log(`${totalScore} points added`);

      // Get username + updated total points
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      const username = userData.username || 'Unknown';
      const updatedPoints = (userData.points || 0);

      // Update leaderboard
      await updateLeaderboard(username, updatedPoints);

    } catch (err) {
      console.error('Error updating Firestore:', err);
    }
  }

  // Navigate to result screen
  if (earnedBadge) {
    setTimeout(() => {
      navigation.navigate('PbgResult', {
        score: totalScore,
        badge: "PackBagMaster"
      });
    }, 1500);
  } else {
    navigation.navigate('PbgResult', { score: totalScore });
  }
};


  return (
    <ScrollView>


    <View style={tw`p-4 mt-2 mb-40`}>

      <Text style={tw`text-lg text-center mb-2`}>Select the 6 Correct Items:</Text>
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
          style={tw`w-16 h-16 mb-1`}
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
                bottom: 180, // near the bag image
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
        source={require('../../../assets/images/games/duffle-bag.png')}
         style={tw`w-60 h-60 mx-10`}
      />

      {/* Selected items list */}
      <Text style={tw`text-center`}>Items in bag: {selectedItems.join(', ')}</Text>

      {/* Submit Button */}
      <TouchableOpacity
        style={tw`bg-blue-500 p-3 rounded-md mt-6 w-30 self-center`}
        onPress={handleSubmit}
      >
        <Text style={tw`text-white text-lg text-center`}>Submit</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
  );
};

export default PackBagGame;

const styles = StyleSheet.create({});
