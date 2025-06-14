// --------------CONTACT SCREEN--------------------
import React from "react";
import {View, Text, Button, StyleSheet} from 'react-native';

const ContactScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Contact Screen</Text>
        </View>
    );
}

export default ContactScreen;

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'lightyellow',
    }
})