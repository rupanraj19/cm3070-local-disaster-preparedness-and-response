import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import tw from 'twrnc';

const badgeImages ={
  floodsafety: require('../assets/images/floodpro.png'),
  floodawareness: require('../assets/images/high-score.png')

}

const Score = ({ navigation }) => {
  const route = useRoute();
  const { score, quizType: rawQuizType } = route.params;
  const quizType = rawQuizType?.toLowerCase().replace(/\s+/g, '');



  const [filledStars, setFilledStars] = useState(0);
  const [showBadge, setShowBadge] = useState(false);

  // Decide number of stars
  const calculateStars = () => {
    if (score === 50) return 3;
    else if (score >= 30) return 2;
    else if (score >= 10) return 1;
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
    if (score === 50) {
      timeoutIds.push(setTimeout(() => setShowBadge(true), 1800));
    }

    return () => timeoutIds.forEach(clearTimeout);
  }, []);
  // console.log("QUIZ TYPE:", quizType);
  // console.log("BADGE IMAGE EXISTS:", !!badgeImages[quizType]);


  return (
    <View style={tw`flex-1 items-center bg-white`}>
      <Animatable.Image
        animation="fadeIn"
        duration={800}
        delay={100}
        source={require('../assets/images/completed.png')}
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
                  ? require('../assets/images/star-filled.png')
                  : require('../assets/images/star-empty.png')
              }
              style={tw`w-12 h-12 mx-1`}
              resizeMode="contain"
            />
          );
        })}
      </View>

       {/* Badge Animation */}
     {showBadge && badgeImages[quizType] && (
  <Animatable.View animation="bounceIn" delay={200} style={tw`items-center mt-6`}>
    <Image
      source={badgeImages[quizType]}
      style={tw`w-24 h-24 mb-2`}
      resizeMode="contain"
    />
    <Text style={tw`text-base font-semibold text-blue-500`}>
      {rawQuizType} Quiz Master Badge Unlocked!
    </Text>
  </Animatable.View>
)}


      <Pressable
        style={tw`bg-blue-500 mt-20 px-5 py-2 rounded-md`}
        onPress={() => navigation.navigate('Splash')}
      >
        <Text style={tw`text-white text-base text-xl`}>Play Again</Text>
      </Pressable>
    </View>
  );
};

export default Score;
