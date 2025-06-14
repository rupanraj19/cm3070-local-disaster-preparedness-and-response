import React, {useState} from "react";
import {View, Text, Button, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { updatePassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';


const UpdatePasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password should be at least 6 characters.");
      return;
    }

    const user = auth.currentUser;
    updatePassword(user, newPassword)
      .then(() => {
        alert("Password updated successfully!");
        navigation.goBack(); // or navigate to Profile
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          alert("Please re-login to update your password.");
          signOut(auth)
        } else {
          alert(error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleUpdatePassword} style={styles.button}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>

    </View>
  );
};

export default UpdatePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0782f9',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#0782f9',
    fontSize: 14,
  },
});