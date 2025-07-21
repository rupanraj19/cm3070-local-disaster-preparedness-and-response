import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import MapView,  { Polygon, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const FlashFloodsScreen = ({ route }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [affectedAreas, setAffectedAreas] = useState(route.params?.affectedAreas || []);
  console.log('Affected Areas:', affectedAreas);

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
    <View style={styles.container}>
      <Text style={styles.heading}>Flash Flood Affected Areas</Text>

      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
          latitude: location ? location.latitude : 1.3521,
          longitude: location ? location.longitude : 103.8198,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}

        >
        {/* Your location marker */}
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
        <Text>Loading map...</Text>
      )}

      <ScrollView style={styles.areaList}>
        <Text style={styles.subHeading}>Affected Areas:</Text>
        {affectedAreas.length > 0 ? (
          affectedAreas.map((area) => (
            <Text key={area.id} style={styles.areaText}>
              - {area.name}
            </Text>
          ))
        ) : (
          <Text style={styles.areaText}>No areas affected</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default FlashFloodsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  map: {
    // flex: 1,
    width: '100%',
    height: 400,
  },
  areaList: {
    padding: 16,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  areaText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
