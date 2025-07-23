import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import tw from 'twrnc';

import {useRoute} from "@react-navigation/native"

const Score = ({navigation}) => {

  const route = useRoute()
  const {score} = route.params;

  return (
    <View style={tw`flex-1 items-center`}>
        <Image
        source={require("../assets/icon.png")}
        style={tw.style(tw`h-3/6`, {aspectRatio:1})} />

        <Text>Congratulations!! You scored {score} points</Text>

        <Pressable style={tw`bg-blue-400 p-2 rounded-md mt-3`} onPress={()=> navigation.navigate('Splash')}>
          <Text style={tw`text-white font-medium`}>Play Again</Text>
        </Pressable>

    </View>
  )
}

export default Score

const styles = StyleSheet.create({})