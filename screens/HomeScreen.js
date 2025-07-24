import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { UserContext } from "../context/UserContext"; // adjust path

const HomeScreen = ({navigation}) => {
  const { userData } = useContext(UserContext);
  const name = userData?.name || "User";
  const streak = userData?.streak ?? 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {name}!</Text>
      <Text style={styles.streak}>🔥 Streak: {streak}</Text>
      <Pressable onPress={()=> navigation.navigate('Splash')}>
          <Text>Quiz</Text>
      </Pressable>
      <Pressable onPress={()=> navigation.navigate('PackBagGame')}>
          <Text>Pack the Emergency Kit bag</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'lightblue',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  streak: {
    fontSize: 20,
    color: 'darkorange',
    marginTop: 10
  }
});
