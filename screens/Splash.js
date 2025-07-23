import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from "twrnc";


const Splash = ({ navigation }) => {
  return (
    <View style={tw`flex-1 items-center`}>
        <Image
        source={require("../assets/icon.png")}
        style={tw.style(tw`h-3/6`, {aspectRatio:1})} />

        <Text style={tw`text-2xl text-center mb-10`}>Instructions</Text>

        <View style={tw`bg-purple-500 p-2 rounded h-30 w-80 items-center justify-center`}>
            <Text style={tw`text-white text-lg`}>Each quiz has four options quiz</Text>
            <Text style={tw`text-white text-lg`}>Progress will be shown at the top</Text>
            <Text style={tw`text-white text-lg`}>Score would be shown at the end</Text>
        </View>

        <Pressable onPress={()=> navigation.navigate('Question')} style={tw`bg-purple-500 mt-10 px-6 py-1 rounded`}>
            <Text style={tw`text-white text-lg`}>Start</Text>
        </Pressable>
    </View>

  )
}

export default Splash

const styles = StyleSheet.create({})