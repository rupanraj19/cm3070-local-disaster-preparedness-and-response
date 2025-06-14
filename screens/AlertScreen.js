// -----------ALERT SCREEN---------------------
import React from "react";
import {View, Text, Button, StyleSheet} from 'react-native';

const AlertScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Alert Screen</Text>
        </View>
    );
}

export default AlertScreen;

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'lightpink',
    }
})