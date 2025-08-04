import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { UserContext } from "../context/UserContext";
import { guides } from "../config/guides";
import { games } from "../config/games"; // Add this file like we discussed
import tw from "twrnc";

const HomeScreen = ({ navigation }) => {
  const { userData } = useContext(UserContext);
  const name = userData?.name || "User";
  const streak = userData?.streak ?? 0;

  return (
    <ScrollView contentContainerStyle={tw`px-6 py-8 bg-gray-50`}>
      {/* Welcome + Streak Card */}
      <View style={tw`bg-white rounded-2xl shadow-lg p-6 mb-8 flex-row justify-between items-center`}>
        <Text style={tw`text-2xl font-bold text-gray-800`}>Welcome, {name}!</Text>
        <View style={tw`flex-row items-center bg-orange-300 rounded-full px-3 py-3`}>
          <Text style={tw`text-medium font-semibold text-white mr-2`}>🔥</Text>
          <Text style={tw`text-medium font-semibold text-white`}>Streak: {streak}</Text>
        </View>
      </View>

      {/* Guides Section Card */}
      <View style={tw`bg-white rounded-2xl shadow-lg p-6 mb-8`}>
        <Text style={tw`text-xl font-bold mb-4 text-gray-900`}>📘 Disaster Guides</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={guides}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`bg-gray-100 rounded-xl overflow-hidden shadow-md mx-2 w-32`}
              onPress={() => navigation.navigate("GuideDetails", item)}
            >
              <Image
                source={item.image}
                style={tw`w-[95%] h-20 rounded-t-xl`}
                resizeMode="cover"
              />
              <View style={tw`p-2`}>
                <Text
                  numberOfLines={2}
                  style={tw`text-sm font-semibold text-gray-800`}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Games Section Card */}
      <View style={tw`bg-white rounded-2xl shadow-lg p-6`}>
        <Text style={tw`text-xl font-bold mb-4 text-gray-900`}>🎮 Games</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`bg-gray-100 rounded-xl overflow-hidden shadow-md mx-2 w-32`}
              onPress={() => navigation.navigate(item.screenName)}
            >
              <Image
                source={item.image}
                style={tw`w-[100%] h-20 rounded-t-xl px-2`}
                resizeMode="cover"
              />
              <View style={tw`p-2`}>
                <Text
                  numberOfLines={2}
                  style={tw`text-sm font-semibold text-gray-800`}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
