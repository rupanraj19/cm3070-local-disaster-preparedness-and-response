// --------------------- MATCHING GAME HOME ----------------------------

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Arrays of items for each category
const categories = {
  "Emergency Supplies": [
    require('../../../assets/images/games/water.png'),
    require('../../../assets/images/games/medicine.png'),
    require('../../../assets/images/games/flashlight.png'),
    require('../../../assets/images/games/firstaid.png'),
    require('../../../assets/images/games/whistle.png'),
    require('../../../assets/images/games/battery.png'),
  ],
  "Disaster Type": [
    require('../../../assets/images/games/earthquake.png'),
    require('../../../assets/images/games/flood.png'),
    require('../../../assets/images/games/wildfire.png'),
    require('../../../assets/images/games/tornado.png'),
    require('../../../assets/images/games/landslide.png'),
    require('../../../assets/images/games/tsunami.png'),
  ],
  "Safety Concepts": [
    require('../../../assets/images/games/evacuation.png'),
    require('../../../assets/images/games/shelter.png'),
    require('../../../assets/images/games/fireextinguisher.png'),
    require('../../../assets/images/games/umbrella.png'),
    require('../../../assets/images/games/helmet.png'),
    require('../../../assets/images/games/warning.png'),
  ],
};


export default function MatchingGameHome({ navigation }) {
  // Navigate to the MemoryGame screen and pass the selected category items
  const onSelectCategory = (category) => {
    navigation.navigate('Memory Game',  {
      items: categories[category],
      categoryKey: category.replace(/\s/g, '')
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Game Type</Text>
      {Object.keys(categories).map((category) => (
        <TouchableOpacity
          key={category}
          style={styles.button}
          onPress={() => onSelectCategory(category)}
        >
          <Text style={styles.buttonText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00796b',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
