import React, { useContext, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from "react-native";
import { UserContext } from "../context/UserContext";
import { guides } from "../config/guides";
import { games } from "../config/games";
import tw from "twrnc";
import { generateFloodBotResponse } from "../config/botResponse";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';


const HomeScreen = ({ navigation }) => {
  const { bgColor, textColor, borderColor} = useTheme();
  const { userData } = useContext(UserContext);
  const name = userData?.name || "User";
  const streak = userData?.streak ?? 0;

  // chatbot states
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm your FloodSafe assistant. Ask me anything about flood preparedness.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef(null);

  // Scroll chat to bottom when messages update
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Handle sending user message and bot reply
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: generateFloodBotResponse(input) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <SafeAreaView style={tw`flex-1 ${bgColor}`}>
       <Text style={tw`text-2xl font-bold text-center border-b p-5 border-gray-300 ${bgColor} ${textColor}`}>Home</Text>
    <View style={tw`flex-1 ${bgColor}`}>
    <ScrollView contentContainerStyle={tw`px-6 py-8`}>
      {/* Welcome + Streak Card */}
      <View style={tw`${bgColor} rounded-2xl shadow-lg p-6 mb-8 flex-row justify-between items-center ${borderColor}`}>
        <Text style={tw`text-2xl font-bold ${textColor}`}>Welcome, {name}!</Text>
        <View style={tw`flex-row items-center bg-orange-300 rounded-full px-3 py-3`}>
          <Text style={tw`text-medium font-semibold text-white mr-2`}>🔥</Text>
          <Text style={tw`text-medium font-semibold text-white`}>Streak: {streak}</Text>
        </View>
      </View>

      {/* Guides Section Card */}
      <View style={tw`${bgColor} rounded-2xl shadow-lg p-4 mb-8 ${borderColor}`}>
        <Text style={tw`text-xl font-bold mb-4 ${textColor}`}>📘 Disaster Guides</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={guides}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`bg-gray-100 rounded-xl overflow-hidden shadow-lg mx-1 w-24`}
              onPress={() => navigation.navigate("GuideDetails", {...item})}
            >
              <Image
                source={item.image}
                style={tw`w-[95%] h-20 rounded-t-xl`}
                resizeMode="cover"
              />
              <View style={tw`p-1`}>
                <Text
                  numberOfLines={3}
                  style={tw`text-sm font-semibold text-gray-800`}
                >
                  {item.title_en}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Games Section Card */}
      <View style={tw`${bgColor} rounded-2xl shadow-lg p-4 mb-30 ${borderColor}`}>
        <Text style={tw`text-xl font-bold mb-4 ${textColor}`}>🎮 Games</Text>
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
    {/* Floating Chatbot Button */}
      <TouchableOpacity
        onPress={() => setChatVisible(true)}
        style={tw`absolute bottom-25 right-3 bg-blue-500 rounded-full w-16 h-16 justify-center items-center shadow-lg`}
      >
        <Text style={tw`text-white font-bold text-lg`}>
          ask
          <Ionicons name="chatbox-outline" size={25} color="white"/>
        </Text>
      </TouchableOpacity>

      {/* Chat Card Overlay */}
      {chatVisible && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw`absolute bottom-33 right-4 left-4 ${bgColor} rounded-xl shadow-lg border border-gray-300 flex flex-col`}
        >
          {/* Header */}
          <View
            style={tw`flex-row justify-between items-center p-3 border-b border-gray-300`}
          >
            <Text style={tw`font-bold text-lg ${textColor}`}>
              FloodSafe Chatbot
            </Text>
            <TouchableOpacity onPress={() => setChatVisible(false)}>
              <Text style={tw`text-red-500 font-bold text-lg`}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView
            style={tw`h-64 px-3 py-2`}
            contentContainerStyle={tw`pb-2`}
            ref={scrollViewRef}
          >
            {messages.map((msg, index) => (
              <View
                key={index}
                style={tw`mb-2 p-3 rounded-lg max-w-[80%] ${
                  msg.from === "user"
                    ? "bg-blue-100 self-end"
                    : "bg-gray-200 self-start"
                }`}
              >
                <Text>{msg.text}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Input box */}
          <View style={tw`flex-row items-center border-t border-gray-300 p-2`}>
            <TextInput
              style={tw`flex-1 border border-gray-400 rounded-lg px-3 py-2 mr-2`}
              placeholder="Ask me anything..."
              value={input}
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={tw`bg-blue-600 px-4 py-2 rounded-lg`}
            >
              <Text style={tw`text-white font-bold`}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
    </SafeAreaView>

  );
};

export default HomeScreen;
