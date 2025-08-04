import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import tw from 'twrnc';


const PbgResult = () => {
      const route = useRoute()
      const {score, badge} = route.params;

      const [filledStars, setFilledStars] = useState(0);
      const [showBadge, setShowBadge] = useState(false);

  // Decide number of stars
  const calculateStars = () => {
    if (score === 30) return 3;
    else if (score >= 20) return 2;
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

    // Show badge *after* stars animation is done
    if (badge) {
      const badgeTimeout = setTimeout(() => setShowBadge(true), earnedStars * 500 + 500);
      timeoutIds.push(badgeTimeout);
    }
    return () => timeoutIds.forEach(clearTimeout);
  }, []);
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
      {/* Badge animation comes AFTER stars finish popping in */}
      {showBadge && badge && (
        <View style={tw`items-center mt-8`}>
          <Animatable.Image
            animation="bounceInDown"
            duration={1000}
            source={require('../assets/images/bagbadge.png')}
            style={tw`w-28 h-28`}
            resizeMode="contain"
          />
          <Text style={tw`text-yellow-600 text-base font-bold mt-2`}>
            Badge Unlocked: {badge}
          </Text>
        </View>
      )}
    </View>
  )
}

export default PbgResult

