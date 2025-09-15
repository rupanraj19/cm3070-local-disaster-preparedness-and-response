// --------------CONTACT SCREEN--------------------
import {View, Text,TouchableOpacity, ScrollView, SafeAreaView, Platform, StatusBar} from 'react-native';
import {Table, Row} from 'react-native-table-component'
import tw from 'twrnc'
import { useTheme } from '../context/ThemeContext';
import {Linking} from 'react-native';

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
    <SafeAreaView   style={[
    tw`flex-1 ${bgColor}`,
    { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  ]}>
      <Text style={tw`text-2xl font-bold text-center border-b p-5 border-gray-300 ${bgColor} ${textColor}`}>Contact</Text>
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
          <View style={tw`${bgColor} rounded-xl p-2 mx-3 mt-2 mb-40 shadow-xl ${borderColor}`}>
            <Text style={tw`text-xl font-bold mb-2 ml-1 ${textColor}`}>Emergency Contacts</Text>
            <Text style={tw`text-base mx-1 mb-2 ${textColor}`}>
              For emergencies, please call the relevant numbers:
            </Text>

            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              {/* Header */}
              <Row
                data={tableHead}
                widthArr={[220, 130]} // wider service column
                style={tw`h-10 bg-green-600`}
                textStyle={tw`text-white font-bold text-center`}
              />

              {/* Data rows */}
              {tableData.map(([service, number], index) => (
                <Row
                  key={index}
                  widthArr={[220, 130]}
                  data={[
                    service,
                    <TouchableOpacity key={index} onPress={() => Linking.openURL(`tel:${number}`)}>
                      <Text style={tw`text-blue-600 underline text-center text-base`}>
                        {number}
                      </Text>
                    </TouchableOpacity>,
                  ]}
                  style={tw`h-12 bg-white`}
                  textStyle={tw`text-base text-center py-2 ${textColor}`}
                />
              ))}
            </Table>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactScreen;
