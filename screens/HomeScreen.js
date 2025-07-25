import React, { useContext, useState } from "react";
import { View, Text, Pressable, FlatList, TouchableOpacity, Image, ScrollView } from "react-native";
import { UserContext } from "../context/UserContext";
import { guides } from "../config/guides";
import tw from "twrnc";

const HomeScreen = ({ navigation }) => {
  const { userData } = useContext(UserContext);
  const name = userData?.name || "User";
  const streak = userData?.streak ?? 0;

  const [completedGuideId, setCompletedGuideId] = useState([]);

  return (
    <ScrollView contentContainerStyle={tw`px-5 pt-10 bg-blue-200`}>
      {/*welcome + streak  */}
      <View style={tw`items-center`}>
        <Text style={tw`text-2xl font-bold`}>Welcome, {name}!</Text>
        <Text style={tw`text-lg text-orange-600 mt-2`}>🔥 Streak: {streak}</Text>
      </View>

    {/* guide section  */}
      <Text style={tw`text-xl font-bold mt-8 mb-3`}>📘 Disaster Guides</Text>
      <View style={tw`flex-row flex-wrap justify-center`}>
        <FlatList
        horizontal
        data={guides}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`bg-white rounded-xl mb-4 overflow-hidden w-25 mx-2`}
            onPress={() => navigation.navigate("GuideDetails", item)}
          >
            <Image source={item.image} style={tw`w-[90%] h-32`} resizeMode="cover" />
            <View style={tw`p-3`}>
              <Text style={tw`text-base font-semibold`}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      </View>


        {/* games section */}
         <Text style={tw`text-xl font-bold mt-8 mb-3`}>📘 Games</Text>
      <Pressable
        onPress={() => navigation.navigate("Splash")}
        style={tw`bg-blue-600 py-3 px-4 rounded-xl mt-6 items-center`}
      >
        <Text style={tw`text-white font-semibold`}>Take the Quiz</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("PackBagGame")}
        style={tw`bg-green-600 py-3 px-4 rounded-xl mt-4 mb-40 items-center`}
      >
        <Text style={tw`text-white font-semibold`}>Pack the Emergency Kit Bag</Text>
      </Pressable>
    </ScrollView>
  );
};

export default HomeScreen;
