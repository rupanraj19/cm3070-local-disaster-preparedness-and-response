//  --------------- MATCHING GAME SCORE --------------------------------
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import * as Animatable from 'react-native-animatable';


const badgeImages = {
  EmergencySupplies: require('../../../assets/images/badges/bagbadge2.png'),
  DisasterType: require('../../../assets/images/badges/generalbadge.png'),
  SafetyConcepts: require('../../../assets/images/badges/safetybadge.png'),
};
export default function MatchingGameScore({ route, navigation }) {
  const { tries, score, timeLeft, categoryKey } = route.params;

    const [filledStars, setFilledStars] = useState(0);
    const [showBadge, setShowBadge] = useState(false);

    // Decide number of stars
    const calculateStars = () => {
      if (score === 100) return 3;
      else if (score >= 80) return 2;
      else if (score >= 50) return 1;
      return 0;
    };

    const totalStars = 3;
    const earnedStars = calculateStars();

    const starsArray = [];
    for (let i = 0; i < totalStars; i++) {
    starsArray.push(i);
    }

    // Animate stars one by one
    useEffect(() => {
      let timeoutIds = [];
      for (let i = 1; i <= earnedStars; i++) {
        timeoutIds.push(
          setTimeout(() => setFilledStars(i), i * 500) // 500ms gap
        );
      }

      // Show badge after stars if full score
      if (score === 100) {
        timeoutIds.push(setTimeout(() => setShowBadge(true), 1800));
      }

      return () => timeoutIds.forEach(clearTimeout);
    }, []);

  return (
      <ScrollView>


      <View style={tw`flex-1 items-center bg-white`}>
      <Animatable.Image
        animation="fadeIn"
        duration={800}
        delay={100}
        source={require('../../../assets/images/completed.png')}
        style={tw.style(tw`h-2/5 m-4`, { aspectRatio: 1 })}
        resizeMode="contain"
      />

      <Text style={tw`text-xl font-bold mt-4`}>
        Congratulations!! You scored {score} points
      </Text>

      {/* Stars with pop-in animation */}
      <View style={tw`flex-row mt-6`}>
        {starsArray.map((index) => {
          const isFilled = index < filledStars;

          return (
            <Animatable.Image
              key={index}
              animation={isFilled ? 'bounceIn' : undefined}
              duration={600}
              source={
                isFilled
                  ? require('../../../assets/images/star-filled.png')
                  : require('../../../assets/images/star-empty.png')
              }
              style={tw`w-12 h-12 mx-1`}
              resizeMode="contain"
            />
          );
        })}
    </View>


   {/* Badge */}
        {showBadge && badgeImages[categoryKey] && (
          <Animatable.View animation="bounceIn" delay={200} style={tw`items-center mt-6`}>
            <Image
              source={badgeImages[categoryKey]}
              style={tw`w-24 h-24 mb-2`}
              resizeMode="contain"
            />
            <Text style={tw`text-base font-semibold text-blue-500`}>
              {categoryKey.replace(/([A-Z])/g, ' $1').trim()} Master Badge Unlocked!
            </Text>
          </Animatable.View>
        )}

        {/* Info */}
        <View style={styles.container}>
          <Text style={styles.result}>Tries: {tries}</Text>
          <Text style={styles.result}>Score: {score} points</Text>
          <Text style={styles.result}>Time Left: {timeLeft}s</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#28a745' }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  result: { fontSize: 20, marginBottom: 10 },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    width: 200,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
