// --------------CONTACT SCREEN--------------------
import React from "react";
import {View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component'


const tableHead = ['Service', 'Number'];
const tableData = [
    ['Police Emergencies', '999'],
    ['Police Emergency SMS', '71999'],
    ['Police Hotline', '1800 255 0000'],
    ['SCDF Ambulance & Fire', '995'],
    ['Non-Emergency Ambulance', '1777'],
  ];

const ContactScreen = ({navigation}) => {
    return (
        <SafeAreaView>
        <ScrollView style={styles.container} >
            <View >


            {/* about us */}
            <View style={[styles.sectionBox,styles.aboutusContainer]}>
                <Text style={styles.heading}>About US</Text>
                <Text style={styles.text}>This app is my final year project, created to help people in Singapore prepare for floods. Using gamification, I aim to make learning about disaster response more engaging and effective.</Text>
            </View>

            {/* contact us */}
            <View style={[styles.sectionBox,styles.contactContainer]}>
                <Text style={styles.heading}>Contact Us</Text>
                <Text style={styles.text}>Get in touch with us here.</Text>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Feedback')}>
                    <Text style={styles.btnText}>Feedback</Text>
                    </TouchableOpacity>
                </View>
            </View>



            {/* emergency contacts */}
            <View style={[styles.sectionBox,styles.emergencyContainer]}>
            <Text style={styles.heading}>Emergency Contacts</Text>
            <Text style={[styles.text, {marginBottom: 5}]}>For emergencies, please call the relevant numbers:</Text>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9'}}>
                <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
                <Rows data={tableData} textStyle={styles.text} />
            </Table>
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>


    );
}

export default ContactScreen;

const styles =  StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor:'#5EABD6',
        paddingBottom: 100,
    },
    aboutusContainer: {
        // marginVertical: 20
    },
    contactContainer:{
        // marginVertical: 20
    },
    emergencyContainer:{

    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        marginLeft: 4,
    },
    head: {
        height: 40,
        backgroundColor: '#4CAF50',
    },
    headText: {
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    text: {
        marginHorizontal: 4,
        fontSize: 16,
        padding: 2,
    },
    btn: {
        backgroundColor: '#447D9B',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
        width: '50%',
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionBox: {
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        padding: 8,
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 8,
        elevation: 3, // for Android
    }

});
