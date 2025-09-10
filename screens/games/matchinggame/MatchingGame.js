//  --------------------- MATCHING GAME -----------------------

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Image } from 'react-native';
import tw from 'twrnc';
import { getFirestore, doc, updateDoc, increment, setDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const shuffleArray = (array) => {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function MatchingGame({ route, navigation }) {

  const { items , categoryKey} = route.params;
  const [blocks, setBlocks] = useState([]);
  const [firstSelected, setFirstSelected] = useState(null);
  const [secondSelected, setSecondSelected] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [tries, setTries] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const timerRef = useRef(null);

  // Firebase
  const db = getFirestore();
  const auth = getAuth();

const awardBadgeIfNeeded = async (score) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const userRef = doc(db, 'users', userId);

  const updates = {
    points: increment(score), // increment points by the score earned
  };

  // Add badge on full score (customize badge name to categoryKey)
  if (score === 100) {
    updates.badges = arrayUnion(`${categoryKey}`);
  }

   try {
    // Update the user points and badges first
    await updateDoc(userRef, updates);

    // Fetch updated user document
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const username = userData.username || 'Unknown';
      const updatedPoints = (userData.points || 0); // already incremented in Firestore

      // Update leaderboard
      await updateLeaderboard(username, updatedPoints);
      }
    } catch (err) {
    console.error("Error updating user points and badges:", err);
  }
};

const updateLeaderboard = async (username, earnedPoints) => {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return;

  try {
    await setDoc(
      doc(db, "leaderboard", user.uid),
      {
        name: username,
        points: increment(earnedPoints) // Increment instead of replace
      },
      { merge: true } // Keep existing fields
    );
  } catch (err) {
    console.error("Failed to update leaderboard", err);
  }
};
 const calculateScore = (tries) => {
    if (tries < 10) return 100;
    if (tries <= 12) return 90;
    if (tries <= 15) return 80;
    if (tries <= 20) return 70;
    if (tries <= 25) return 60;
    return 50;
  };

  const resetGame = () => {
    const doubled = [...items, ...items];
    const shuffled = shuffleArray(doubled).map((item, index) => ({
      id: index,
      item,
      revealed: false,
    }));
    setBlocks(shuffled);
    setMatchedIds([]);
    setFirstSelected(null);
    setSecondSelected(null);
    setTries(0);
    setTimeLeft(60);
    startTimer();
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timerRef.current);
          Alert.alert(
            'Time up!',
            'You ran out of time! Try again?',
            [
              { text: 'Retry', onPress: () => resetGame() },
              { text: 'Cancel', style: 'cancel' }
            ]
          );
          return 0;
        }
        return time - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (!items) return;
    resetGame();
    return () => clearInterval(timerRef.current);
  }, [items]);

  useEffect(() => {
    if (firstSelected !== null && secondSelected !== null) {
      const firstItem = blocks[firstSelected];
      const secondItem = blocks[secondSelected];
      if (firstItem.item === secondItem.item) {
        setMatchedIds((prev) => [...prev, firstItem.id, secondItem.id]);
        resetSelection();
      } else {
        setTimeout(() => resetSelection(), 1000);
      }
      setTries((prev) => prev + 1);
    }
  }, [secondSelected]);

  useEffect(() => {
    if (matchedIds.length === blocks.length && blocks.length > 0) {
      clearInterval(timerRef.current);
      const score = calculateScore(tries);
      awardBadgeIfNeeded(score);
      navigation.replace('Memory Game Score', {
        tries,
        score,
        timeLeft,
        categoryKey
      });
    }
  }, [matchedIds]);

  const resetSelection = () => {
    setFirstSelected(null);
    setSecondSelected(null);
  };

  const onPressBlock = (index) => {
    if (
      (firstSelected !== null && secondSelected !== null) ||
      matchedIds.includes(blocks[index].id) ||
      index === firstSelected
    ) return;

    if (firstSelected === null) {
      setFirstSelected(index);
    } else if (secondSelected === null) {
      setSecondSelected(index);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
      <Text style={styles.tries}>Tries: {tries}</Text>
      <View style={styles.grid}>
        {blocks.map((block, index) => {
          const isRevealed =
            matchedIds.includes(block.id) ||
            index === firstSelected ||
            index === secondSelected;
          return (
            // inside render method for each block:
<TouchableOpacity
  key={block.id}
  style={[styles.block, isRevealed && styles.revealedBlock]}
  onPress={() => onPressBlock(index)}
>
  {isRevealed ? (
    <Image source={block.item} style={styles.blockImage} resizeMode="contain" />
  ) : (
    <Text style={styles.blockText}>?</Text>
  )}
</TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  timer: {
    fontSize: 20,
    marginBottom: 10,
  },
  tries: {
    fontSize: 18,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    justifyContent: 'center',
  },
  block: {
    width: 70,
    height: 70,
    margin: 5,
    backgroundColor: '#4e73df',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  revealedBlock: {
    backgroundColor: '#f7b731',
  },
  blockText: {
    fontSize: 30,
    color: 'white',
  },
  blockImage: {
  width: 50,
  height: 50,
},

});
