// --------------- SOS SCREEN ----------------------------
import React, { useEffect, useState } from "react";
import { View, Text, TextInput,Platform, StatusBar, Alert, TouchableOpacity, Switch, SafeAreaView, ScrollView } from "react-native";
import * as Location from "expo-location";
import * as SMS from "expo-sms";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Audio } from 'expo-av';
import tw from 'twrnc'
import { useTheme } from '../context/ThemeContext';


const SosScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [sound, setSound] = useState();
  const [playSoundEnabled, setPlaySoundEnabled] = useState(true);
  const { bgColor, textColor,borderColor} = useTheme();

  // sound
  async function playSound(){
    if (!playSoundEnabled) return;

    const {sound} = await Audio.Sound.createAsync(
      require('../assets/sounds/game.mp3')
    );
    setSound(sound)
    await sound.playAsync();
  }

  useEffect(()=>{
    return sound ? ()=>{
      sound.unloadAsync(); //cleanup sound when component unmounts or sound changes
    } : undefined;
  }, [sound]);



  // Fetch contacts from Firestore
  const fetchContacts = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const snapshot = await getDocs(collection(db, "users", user.uid, "emergencyContacts"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Save contact to Firestore
  const saveContact = async () => {
    if (!name || !phone) {
      Alert.alert("Error", "Please enter both name and phone.");
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, "users", user.uid, "emergencyContacts"), {
        name,
        phone,
      });
      setName('');
      setPhone('');
      fetchContacts();
      Alert.alert("Saved", "Emergency contact saved.");
    } catch (err) {
      console.error("Error saving contact", err);
      Alert.alert("Error", "Could not save contact.");
    }
  };

  // Delete contact
  const deleteContact = async(contactId)=>{
    const user = auth.currentUser;
    if(!user) return;

    try {
        await deleteDoc(doc(db, "users", user.uid, "emergencyContacts", contactId));
        fetchContacts(); // refresh the contacts list after deletion
        Alert.alert("Deleted", "Contact has been removed");
    } catch(err) {
        console.error("Error deleting contact", err);
        Alert.alert("Error", "could not delete contact.");
    }
  }

  // Get user location
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location permission is required.');
      return null;
    }

    let location = await Location.getCurrentPositionAsync({});
    return location;
  };

  // Send SOS to all contacts
  const sendSOS = async () => {
    setSending(true);

    if (contacts.length === 0) {
      Alert.alert("No contacts", "Please add at least one emergency contact.");
      setSending(false);
      return;
    }

    const location = await getLocation();
    let message = "Emergency! I need help.";
    if (location) {
      const { latitude, longitude } = location.coords;
      message += ` My location: https://maps.google.com/?q=${latitude},${longitude}`;
    }

    const phoneNumbers = contacts.map(c => c.phone);
    const isAvailable = await SMS.isAvailableAsync();

    if (isAvailable) {
      await SMS.sendSMSAsync(phoneNumbers, message);
      await playSound();
      Alert.alert("SOS Sent", "Message sent to emergency contacts.");
    } else {
      Alert.alert("SMS Not Available", "This device does not support SMS.");
    }

    setSending(false);
  };

  return (
    <SafeAreaView   style={[
    tw`flex-1 ${bgColor}`,
    { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  ]}>
      <ScrollView>
      <Text style={tw`text-2xl font-bold text-center border-b p-5 border-gray-300 ${bgColor} ${textColor}`}>Emergency SOS</Text>

    <View style={tw`${bgColor} p-5 pb-60 `}>

        <View style={tw`${bgColor} rounded-2xl shadow-lg p-4 mb-8 ${borderColor}`}>
          {/* Add Contact Form */}
      <Text style={tw`text-lg mt-5 mb-2 ${textColor}`}>Add Emergency Contact</Text>
      <TextInput
        style={tw`border border-gray-400 rounded p-3 mb-2 ${textColor}`}
        placeholder="Name"
        placeholderTextColor="#555"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={tw`border border-gray-400 rounded p-3 mb-2 ${textColor}`}
        placeholder="Phone Number"
        placeholderTextColor="#555"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity onPress={saveContact} style={tw`bg-blue-500 rounded px-4 py-3 mb-4 mx-20 mt-2`}>
        <Text style={tw`text-center font-medium text-white`} >Save Contact</Text>
      </TouchableOpacity>

      {/* Toggle Sound */}
      <View style={tw`flex-row items-center justify-between`}>
        <Text style={tw`text-base mr-2 ${textColor}`}>Play Sound on SOS:</Text>
        <Switch
          value={playSoundEnabled}
          onValueChange={setPlaySoundEnabled}
        />
      </View>
        </View>


        <View style={tw`${bgColor} rounded-2xl shadow-lg p-4 mb-8 ${borderColor}`}>
          {/* Contact List */}
          <Text style={tw`text-lg mt-5 mb-2 ${textColor}`}>Your Emergency Contacts:</Text>

          {contacts.length === 0 ? (
            <Text style={tw`text-base italic ${textColor}`}>No contacts saved yet.</Text>
          ) : (
            contacts.map((item) => (
              <View key={item.id} style={tw`flex-row justify-between items-center py-2`}>
                <Text style={tw`text-base ${textColor}`}>{item.name} - {item.phone}</Text>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Delete Contact",
                      `Are you sure you want to delete ${item.name}?`,
                      [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () => deleteContact(item.id),
                        },
                      ]
                    )
                  }
                >
                  <Text style={tw`text-red-600 font-bold`}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      {/* SOS Button */}
      <View>
        <TouchableOpacity
         style={tw`bg-red-600 py-3 px-6 rounded-xl items-center justify-center shadow-md ${sending ? 'opacity-50' : ''}`}
        onPress={sendSOS}
        disabled={sending}
        >
       <Text style={tw`text-white text-lg font-bold`}>
            {sending ? "Sending SOS..." : "Send SOS Alert"}
        </Text>
        </TouchableOpacity>
      </View>

    </View>
      </ScrollView>

    </SafeAreaView>

  );
};

export default SosScreen;

