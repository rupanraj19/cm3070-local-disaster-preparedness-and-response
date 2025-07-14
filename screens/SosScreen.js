import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity, Switch } from "react-native";
import * as Location from "expo-location";
import * as SMS from "expo-sms";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Audio } from 'expo-av';


const SosScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [sound, setSound] = useState();
  const [playSoundEnabled, setPlaySoundEnabled] = useState(true);


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
    <View style={styles.container}>
      <Text style={styles.heading}>Emergency SOS</Text>

      {/* Add Contact Form */}
      <Text style={styles.label}>Add Emergency Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button title="Save Contact" onPress={saveContact} />

      {/* Contact List */}
      <Text style={styles.label}>Your Emergency Contacts:</Text>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.contactItem}>{item.name} - {item.phone}</Text>
        )}
      />

      {/* delete list */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 }}>
            <Text style={styles.contactItem}>{item.name} - {item.phone}</Text>
            <TouchableOpacity onPress={() => {
                Alert.alert(
                "Delete Contact",
                `Are you sure you want to delete ${item.name}?`,
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", style: "destructive", onPress: () => deleteContact(item.id) }
                ]
                );
            }}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>Delete</Text>
            </TouchableOpacity>
            </View>
        )}
        />

      {/* Toggle Sound */}
      <View style={{  flex: 2, flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 16, marginRight: 10 }}>Play Sound on SOS:</Text>
        <Switch
          value={playSoundEnabled}
          onValueChange={setPlaySoundEnabled}
        />
      </View>

      {/* SOS Button */}
      <View style={styles.sosButtonContainer}>
        <TouchableOpacity
        style={[styles.sosButton, sending && styles.disabledButton]}
        onPress={sendSOS}
        disabled={sending}
        >
        <Text style={styles.sosButtonText}>
            {sending ? "Sending SOS..." : "Send SOS Alert"}
        </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default SosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  contactItem: {
    fontSize: 16,
    paddingVertical: 4,
  },

  sosButtonContainer: {
    flex:3,
  },
  sosButton: {
    backgroundColor: '#e32f45',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    },

    sosButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

});
