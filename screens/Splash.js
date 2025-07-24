import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from "twrnc";


const Splash = ({ navigation }) => {
  const startQuiz = (type) => {
    navigation.navigate('Question', { quizType: type });
  };
  return (
    <View style={tw`flex-1 items-center`}>
        <Image
        source={require("../assets/images/quiz.png")}
        style={tw.style(tw`h-50 m-6`, {aspectRatio:1})} />

         <Text style={tw`text-2xl text-center mb-6`}>Choose a Quiz</Text>

        <Pressable
          onPress={() => startQuiz("floodSafety")}
          style={tw`bg-blue-500 px-10 py-2 rounded mb-4`}
        >
          <Text style={tw`text-white text-lg`}>Flood Safety</Text>
        </Pressable>

        <Pressable
          onPress={() => startQuiz("floodAwareness")}
          style={tw`bg-blue-500 px-6 py-2 rounded`}
        >
          <Text style={tw`text-white text-lg`}>Flood Awareness</Text>
        </Pressable>

        <Text style={tw`text-2xl text-center m-4`}>Instructions</Text>

        <View style={tw`bg-green-400 p-2 rounded h-30 w-80 items-center justify-center`}>
            <Text style={tw`text-white text-lg`}>Each quiz has 4 options quiz</Text>
            <Text style={tw`text-white text-lg`}>Progress will be shown at the top</Text>
            <Text style={tw`text-white text-lg`}>Score would be shown at the end</Text>
        </View>

        {/* <Pressable onPress={()=> navigation.navigate('Question')} style={tw`bg-purple-500 mt-10 px-6 py-1 rounded`}>
            <Text style={tw`text-white text-lg`}>Start</Text>
        </Pressable> */}
    </View>

  )
}

export default Splash

const styles = StyleSheet.create({})