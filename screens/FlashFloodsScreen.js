// ------------------------- FLASH FLOOD SCREEN -----------------------------
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, Dimensions } from 'react-native';
import MapView,  { Polygon, Marker } from 'react-native-maps';
import tw from 'twrnc'
import * as Location from 'expo-location';
import { useTheme } from '../context/ThemeContext';

const FlashFloodsScreen = ({ route }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [affectedAreas, setAffectedAreas] = useState(route.params?.affectedAreas || []);
  const { bgColor, textColor,borderColor} = useTheme();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;
  }

  return (
    <View style={tw`flex-1 ${bgColor}`}>
      <Text style={tw`text-xl font-bold text-center my-4 ${textColor}`}>Flash Flood Affected Areas</Text>

      {location ? (
        <MapView
          style={{ width: Dimensions.get('window').width, height: 400 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
          {affectedAreas.map((area) => (
            <Polygon
              key={area.id}
              coordinates={area.coordinates}
              fillColor="rgba(255, 0, 0, 0.3)"
              strokeColor="red"
              strokeWidth={2}
            />
          ))}
        </MapView>
      ) : (
        <Text style={tw`text-center text-base mt-2 ${textColor}`}>Loading map...</Text>
      )}

      <ScrollView style={tw`p-4`}>
        <Text style={tw`text-lg font-semibold mb-2 ${textColor}`}>Affected Areas:</Text>
        {affectedAreas.length > 0 ? (
          affectedAreas.map((area) => (
            <Text key={area.id} style={tw`text-base mb-1 ${textColor} `}>
              - {area.name}
            </Text>
          ))
        ) : (
          <Text style={tw`text-base ${textColor}`}>No areas affected</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default FlashFloodsScreen;