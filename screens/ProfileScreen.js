// ---------------------PROFILE SCREEN------------------------
import {View, Text, Button, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

const ProfileScreen = ({navigation}) => {


    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Settings')}>
              <Text>Settings</Text>
            </TouchableOpacity>

        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 40
  },
  signOutButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});