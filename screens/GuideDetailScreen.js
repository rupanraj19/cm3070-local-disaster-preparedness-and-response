// -------------- GUIDE DETAIL SCREEN ----------------------------------
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { UserContext } from "../context/UserContext";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const guideBadgeData = {
  guide1: {
    name: "DisasterAware",
    image: require("../assets/images/aware.png"),
  },
  guide2: {
    name: "FloodResponder",
    image: require("../assets/images/ready.png"),
  },
  guide3: {
    name: "KitMaster",
    image: require("../assets/images/packbag.png"),
  },
};

const GuideDetailsScreen = ({ route }) => {
  const { bgColor, textColor, borderColor } = useTheme();
  const {
    id,
    title_en,
    title_ta,
    title_zh,
    title_ms,
    content_en,
    content_ta,
    content_zh,
    content_ms,
    image,
    language,
  } = route.params;

  const { userData } = useContext(UserContext);

  // language
  const [currentLang, setCurrentLang] = useState(language || "en");
  const title =
    currentLang === "ta"
      ? title_ta
      : currentLang === "zh"
      ? title_zh
      : currentLang === "ms"
      ? title_ms
      : title_en;

  const content =
    currentLang === "ta"
      ? content_ta
      : currentLang === "zh"
      ? content_zh
      : currentLang === "ms"
      ? content_ms
      : content_en;

  const [completed, setCompleted] = useState(false);
  const db = getFirestore();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    checkIfCompleted();
  }, []);

  const checkIfCompleted = async () => {
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      const completedGuides = data.completedGuides || [];
      if (completedGuides.includes(id)) {
        setCompleted(true);
      }
    }
  };

  const markAsCompleted = async () => {
    if (!userId) {
      Alert.alert("Error", "User not logged in.");
      return;
    }
    const userRef = doc(db, "users", userId);

    try {
      await updateDoc(userRef, {
        completedGuides: arrayUnion(id),
        badges: arrayUnion(guideBadgeData[`guide${id}`]?.name || `Guide ${id}`),
      });
      setCompleted(true);
      setShowBadge(id);
    } catch (err) {
      console.error("Error updating Firestore:", err);
      Alert.alert("Error", "Could not update progress.");
    }
  };

  const [showBadge, setShowBadge] = useState(null);
  useEffect(() => {
    if (showBadge) {
      const timer = setTimeout(() => setShowBadge(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [showBadge]);

  // menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16); // default font size

  return (
    <View style={tw`flex-1 relative ${bgColor}`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        <Text style={tw`text-xl font-bold mb-3 ${textColor}`}>{title}</Text>
        <View style={tw`items-center`}>
          <Image
          source={image}
          style={tw`w-[60%] h-48 rounded-lg mb-4`}
          resizeMode="cover"
        />
        </View>
        <Text style={[tw`leading-relaxed ${textColor}`, { fontSize }]}>
          {content}
        </Text>

        <View style={tw`mt-6 mb-20`}>
          {completed ? (
            <Text style={tw`text-green-600 text-base font-semibold`}>
              ✅ Completed
            </Text>
          ) : (
            <Button title="Mark as Completed" onPress={markAsCompleted} />
          )}
        </View>
        {/* badge animation */}
        {showBadge === id && guideBadgeData[`guide${id}`] && (
          <Animatable.View
            animation="bounceInDown"
            delay={200}
            style={tw`items-center mb-40`}
          >
            <Image
              source={guideBadgeData[`guide${id}`].image}
              style={tw`w-24 h-24 mb-2`}
              resizeMode="contain"
            />
            <Text style={tw`text-base font-semibold text-blue-500`}>
              {guideBadgeData[`guide${id}`].name} Unlocked!
            </Text>
          </Animatable.View>
        )}
      </ScrollView>

      {/* -------- Floating Language Button -------- */}
      <View style={tw`absolute top-5 right-2 z-50 flex-col items-end`}>
        {/* Floating Circle Button */}
        <TouchableOpacity
          onPress={() => setMenuOpen(!menuOpen)}
          style={tw`bg-gray-400 w-12 h-12 rounded-full justify-center items-center shadow-lg`}
        >
          <Ionicons name="accessibility-outline" size={28} color="#000" />
        </TouchableOpacity>
        {/* Language Options (expand when menuOpen is true) */}
        {menuOpen && (
          <View style={tw`bg-white rounded-xl py-3 px-4 mt-2 shadow-lg`}>
            {/* Text Size Section */}
            <View style={tw`mb-3`}>
              <Text style={tw`text-sm font-semibold mb-1`}>Text Size</Text>
              <View style={tw`flex-row items-center justify-between`}>
                <TouchableOpacity
                  onPress={() => setFontSize((prev) => Math.max(12, prev - 2))}
                  style={tw`bg-gray-300 rounded-full px-3 py-1 mr-2`}
                >
                  <Text style={tw`text-lg`}>−</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setFontSize((prev) => Math.min(30, prev + 2))}
                  style={tw`bg-gray-300 rounded-full px-3 py-1`}
                >
                  <Text style={tw`text-lg`}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Language Selection */}
            {["en", "ta", "zh", "ms"].map((langCode) => (
              <TouchableOpacity
                key={langCode}
                onPress={() => {
                  setCurrentLang(langCode);
                  setMenuOpen(false);
                }}
                style={tw.style(
                  `py-1.5 px-3 rounded-md`,
                  currentLang === langCode ? "bg-blue-500" : ""
                )}
              >
                <Text
                  style={tw.style(
                    currentLang === langCode
                      ? "text-white font-bold"
                      : "text-black"
                  )}
                >
                  {langCode === "en"
                    ? "English"
                    : langCode === "ta"
                    ? "தமிழ்"
                    : langCode === "zh"
                    ? "中文"
                    : "Malay"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default GuideDetailsScreen;
