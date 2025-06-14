// ---------------------PROFILE SCREEN------------------------
import {View, Text, Button, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const ProfileScreen = ({navigation}) => {
  // handleSignout function
    const handleSignOut = () => {
        signOut(auth).catch(error => {
        alert("Failed to sign out: " + error.message);
        });
    };


    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>

            {/* Sign Out Button */}
            <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
              {/*UpdatePassword Button  */}
              <TouchableOpacity onPress={() => navigation.navigate('UpdatePassword') }>
                <Text style={{ color: 'black', textAlign: 'center' }}>Update Password</Text>
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
