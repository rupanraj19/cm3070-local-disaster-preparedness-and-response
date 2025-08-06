// --------------CONTACT SCREEN--------------------
import React from "react";
import {View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component'
import tw from 'twrnc'
import { useTheme } from '../context/ThemeContext';

const tableHead = ['Service', 'Number'];
const tableData = [
    ['Police Emergencies', '999'],
    ['Police Emergency SMS', '71999'],
    ['Police Hotline', '1800 255 0000'],
    ['SCDF Ambulance & Fire', '995'],
    ['Non-Emergency Ambulance', '1777'],
  ];

const ContactScreen = ({ navigation }) => {
  const { bgColor, textColor, borderColor } = useTheme();

  return (
    <SafeAreaView style={tw`${bgColor}`}>
      <ScrollView style={tw`pb-25`}>
        <View>
          {/* About Us */}
          <View style={tw`${bgColor} rounded-xl p-2 mx-3 mt-2 mb-1 shadow-xl ${borderColor}`}>
            <Text style={tw`text-xl font-bold mb-2 ml-1 ${textColor}`}>About Us</Text>
            <Text style={tw`text-base mx-1 pb-1 ${textColor}`}>
              This app is my final year project, created to help people in Singapore prepare for floods.
              Using gamification, I aim to make learning about disaster response more engaging and effective.
            </Text>
          </View>

          {/* Contact Us */}
          <View style={tw`${bgColor} rounded-xl p-2 mx-3 mt-2 mb-1 shadow-xl ${borderColor}`}>
            <Text style={tw`text-xl font-bold mb-2 ml-1 ${textColor}`}>Contact Us</Text>
            <Text style={tw`text-base mx-1 pb-1 ${textColor}`}>Get in touch with us here.</Text>
            <View style={tw`items-center justify-center`}>
              <TouchableOpacity
                style={tw`bg-[#447D9B] py-3 px-5 rounded-lg mt-3 w-1/2 items-center`}
                onPress={() => navigation.navigate('Feedback')}
              >
                <Text style={tw`text-white text-base font-bold`}>Feedback</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Emergency Contacts */}
          <View style={tw`${bgColor} rounded-xl p-2 mx-3 mt-2 mb-20 shadow-xl ${borderColor}`}>
            <Text style={tw`text-xl font-bold mb-2 ml-1 ${textColor}`}>Emergency Contacts</Text>
            <Text style={tw`text-base mx-1 mb-2 ${textColor}`}>For emergencies, please call the relevant numbers:</Text>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row data={tableHead} style={tw`h-10 bg-green-600`} textStyle={tw`text-white font-bold text-center`} />
              <Rows data={tableData} textStyle={tw`text-base text-center py-2 ${textColor}`} />
            </Table>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  shadowBlack: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
shadowWhite: {
  shadowColor: '#fff',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.9,
  shadowRadius: 5,
  elevation: 5,
},

});