// ------------------SOS SCREEN---------------
import React from "react";
import {View, Text, Button, StyleSheet} from 'react-native';

const SosScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>SOS Screen</Text>
        </View>
    );
}

export default SosScreen;

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'lightred',
    }
})