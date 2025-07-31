import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView, Switch, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


const STATIC_STATIONS = [
  { id: 'S224', name: 'Airport Boulevard', latitude: 1.34392, longitude: 103.98409 },
  { id: 'S77', name: 'Alexandra Road', latitude: 1.2937, longitude: 103.8125 },
  { id: 'S216', name: 'Ang Mo Kio Avenue 10', latitude: 1.36019, longitude: 103.85335 },
  { id: 'S109', name: 'Ang Mo Kio Avenue 5', latitude: 1.3764, longitude: 103.8492 },
  { id: 'S117', name: 'Banyan Road', latitude: 1.256, longitude: 103.679 },
  { id: 'S217', name: 'Bishan Street 13', latitude: 1.35041, longitude: 103.85526 },
  { id: 'S64', name: 'Bukit Panjang Road', latitude: 1.3824, longitude: 103.7603 },
  { id: 'S90', name: 'Bukit Timah Road', latitude: 1.3191, longitude: 103.8191 },
  { id: 'S208', name: 'Changi East Close', latitude: 1.3136, longitude: 104.00317 },
  { id: 'S201', name: 'Clementi Park', latitude: 1.32311, longitude: 103.76714 },
  { id: 'S50', name: 'Clementi Road', latitude: 1.3337, longitude: 103.7768 },
  { id: 'S220', name: 'Compassvale Lane', latitude: 1.38666, longitude: 103.89797 },
  { id: 'S213', name: 'Coronation Walk', latitude: 1.32427, longitude: 103.8097 },
  { id: 'S107', name: 'East Coast Parkway', latitude: 1.3135, longitude: 103.9625 },
  { id: 'S215', name: 'Geylang East Central', latitude: 1.32785, longitude: 103.88899 },
  { id: 'S222', name: 'Henderson Road', latitude: 1.28987, longitude: 103.82364 },
  { id: 'S221', name: 'Hougang Avenue 1', latitude: 1.35691, longitude: 103.89088 },
  { id: 'S33', name: 'Jurong Pier Road', latitude: 1.3081, longitude: 103.71 },
  { id: 'S229', name: 'Jurong West Street 42', latitude: 1.35167, longitude: 103.72195 },
  { id: 'S228', name: 'Jurong West Street 73', latitude: 1.34703, longitude: 103.70073 },
  { id: 'S71', name: 'Kent Ridge Road', latitude: 1.2923, longitude: 103.7815 },
  { id: 'S43', name: 'Kim Chuan Road', latitude: 1.3399, longitude: 103.8878 },
  { id: 'S211', name: 'Kranji Road', latitude: 1.42918, longitude: 103.75711 },
  { id: 'S66', name: 'Kranji Way', latitude: 1.4387, longitude: 103.7363 },
  { id: 'S112', name: 'Lim Chu Kang Road', latitude: 1.43854, longitude: 103.70131 },
  { id: 'S07', name: 'Lornie Road', latitude: 1.3415, longitude: 103.8334 },
  { id: 'S226', name: 'Malan Road', latitude: 1.27472, longitude: 103.80389 },
  { id: 'S40', name: 'Mandai Lake Road', latitude: 1.4044, longitude: 103.78962 },
  { id: 'S223', name: 'Margaret Drive', latitude: 1.29984, longitude: 103.80264 },
  { id: 'S108', name: 'Marina Gardens Drive', latitude: 1.2799, longitude: 103.8703 },
  { id: 'S113', name: 'Marine Parade Road', latitude: 1.30648, longitude: 103.9104 },
  { id: 'S44', name: 'Nanyang Avenue', latitude: 1.34583, longitude: 103.68166 },
  { id: 'S119', name: 'Nicoll Highway', latitude: 1.30105, longitude: 103.8666 },
  { id: 'S203', name: 'Pasir Panjang', latitude: 1.29164, longitude: 103.7702 },
  { id: 'S29', name: 'Pasir Ris Drive 12', latitude: 1.387, longitude: 103.935 },
  { id: 'S94', name: 'Pasir Ris Street 51', latitude: 1.3662, longitude: 103.9528 },
  { id: 'S78', name: 'Poole Road', latitude: 1.30703, longitude: 103.89067 },
  { id: 'S106', name: 'Pulau Ubin', latitude: 1.4168, longitude: 103.9673 },
  { id: 'S81', name: 'Punggol Central', latitude: 1.4029, longitude: 103.9092 },
  { id: 'S111', name: 'Scotts Road', latitude: 1.31055, longitude: 103.8365 },
  { id: 'S900', name: 'Seletar Aerospace View', latitude: 1.41284, longitude: 103.86922 },
  { id: 'S102', name: 'Semakau Landfill', latitude: 1.189, longitude: 103.768 },
  { id: 'S60', name: 'Sentosa', latitude: 1.25, longitude: 103.8279 },
  { id: 'S84', name: 'Simei Avenue', latitude: 1.3437, longitude: 103.9444 },
  { id: 'S79', name: 'Somerset Road', latitude: 1.3004, longitude: 103.8372 },
  { id: 'S92', name: 'South Buona Vista Road', latitude: 1.2841, longitude: 103.7886 },
  { id: 'S214', name: 'Tanjong Rhu', latitude: 1.29911, longitude: 103.88289 },
  { id: 'S88', name: 'Toa Payoh North', latitude: 1.3427, longitude: 103.8482 },
  { id: 'S123', name: 'Towner Road', latitude: 1.3214, longitude: 103.8577 },
  { id: 'S115', name: 'Tuas South Avenue 3', latitude: 1.29377, longitude: 103.61843 },
  { id: 'S24', name: 'Upper Changi Road North', latitude: 1.3678, longitude: 103.9826 },
  { id: 'S69', name: 'Upper Peirce Reservoir Park', latitude: 1.37, longitude: 103.805 },
  { id: 'S08', name: 'Upper Thomson Road', latitude: 1.3701, longitude: 103.8271 },
  { id: 'S230', name: 'West Coast Road', latitude: 1.30167, longitude: 103.76444 },
  { id: 'S104', name: 'Woodlands Avenue 9', latitude: 1.44387, longitude: 103.78538 },
  { id: 'S210', name: 'Woodlands Centre', latitude: 1.44003, longitude: 103.76904 },
  { id: 'S227', name: 'Woodlands Drive 62', latitude: 1.43944, longitude: 103.80389 },
  { id: 'S219', name: 'Yio Chu Kang Road', latitude: 1.37999, longitude: 103.87643 },
  { id: 'S209', name: 'Yishun Ring Road', latitude: 1.42111, longitude: 103.84472 },
];

const AlertsScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [heavyRain, setHeavyRain] = useState(false);
  const [rainStations, setRainStations] = useState([]);
  const [showStations, setShowStations] = useState(false);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [affectedAreas, setAffectedAreas] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      console.log('Location:', loc.coords);
      setLocation(loc.coords);
      fetchWeatherData(loc.coords.latitude, loc.coords.longitude);
    })();
  }, []);

  useEffect(() => {
    const fetchRainfallData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.data.gov.sg/v1/environment/rainfall');
        const data = await response.json();

        const readings = data.items[0].readings;
        const stationData = STATIC_STATIONS.map(station => {
          const reading = readings.find(r => r.station_id === station.id);
          return {
            ...station,
            value: reading ? reading.value : 0,
            isHeavyRain: reading ? reading.value >= 10 : false,
            isFloodRisk: reading ? reading.value >= 18 : false,
          };
        });

        setRainStations(stationData);
        const heavyRainExists = stationData.some(station => station.isHeavyRain);
        setHeavyRain(heavyRainExists);

        const affectedRegions = stationData
          .filter(station => station.isFloodRisk)
          .map(station => ({
            id: station.id,
            name: station.name,
            coordinates: [
              { latitude: station.latitude, longitude: station.longitude },
              { latitude: station.latitude + 0.01, longitude: station.longitude },
              { latitude: station.latitude, longitude: station.longitude + 0.01 },
              { latitude: station.latitude - 0.01, longitude: station.longitude },
            ],
          }));
        setAffectedAreas(affectedRegions);
      } catch (error) {
        console.error('Error fetching rainfall data:', error);
        Alert.alert('Error', 'Unable to fetch rainfall data.');
      } finally {
        setLoading(false);
      }
    };

    fetchRainfallData();
    const interval = setInterval(fetchRainfallData, 300000); // every 5 min
    return () => clearInterval(interval);
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setWeatherLoading(true);
      const apiKey = '41cc19554efb3d7751df67f9bd90f730';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData);
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }
      const data = await response.json();
      console.log('OpenWeather data:', data);
      if (data.cod && data.cod !== 200) {
        throw new Error(data.message || 'Unknown API error');
      }
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      Alert.alert('Error', `Unable to fetch weather data: ${error.message}`);
    } finally {
      setWeatherLoading(false);
    }
  };

  const markers = useMemo(() => {
    const baseMarkers = location
      ? [{
          key: 'user-location',
          coordinate: { latitude: location.latitude, longitude: location.longitude },
          title: 'You are here',
          pinColor: 'red',
        }]
      : [];

    if (!showStations) return baseMarkers;

    const stationMarkers = STATIC_STATIONS.map(station => {
      const rainStation = rainStations.find(r => r.id === station.id);
      return {
        key: `station-${station.id}`,
        coordinate: {
          latitude: station.latitude,
          longitude: station.longitude,
        },
        title: station.name,
        pinColor: rainStation
          ? rainStation.value >= 20
            ? 'red'
            : rainStation.value >= 10
            ? 'yellow'
            : 'green'
          : 'gray',
      };
    });

    return [...baseMarkers, ...stationMarkers];
  }, [location, showStations, rainStations]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Flood & Weather Alerts</Text>

          <View style={styles.mapContainer}>
            <MapView
              key={showStations + rainStations.map(r => r.value).join(',')} // force re-render if data changes
              style={styles.map}
              region={{
                latitude: location ? location.latitude : 1.3521,
                longitude: location ? location.longitude : 103.8198,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
            >
              {markers.map(marker => (
                <Marker
                  key={marker.key}
                  coordinate={marker.coordinate}
                  title={marker.title}
                  pinColor={marker.pinColor}
                />
              ))}
            </MapView>

            <View style={styles.toggleContainer}>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Show Stations</Text>
                <Switch
                  onValueChange={setShowStations}
                  value={showStations}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={showStations ? '#f4f3f4' : '#f4f3f4'}
                />
              </View>
            </View>

            <Text style={styles.mapCaption}>
              Rainfall Intensity (mm): Green &lt; 10, Yellow 10–20, Red &gt; 20
            </Text>
          </View>

          <View style={styles.weatherContainer}>
            <Text style={styles.sectionTitle}>Current Weather</Text>
            {weatherLoading ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : weather && weather.main && weather.weather && weather.weather.length > 0 ? (
              <View style={styles.weatherInfo}>
                <Text style={styles.weatherText}>🌡 Temperature: {weather.main.temp} °C</Text>
                <Text style={styles.weatherText}>☁️ Condition: {weather.weather[0].description}</Text>
                <Text style={styles.weatherText}>💨 Wind Speed: {weather.wind.speed} m/s</Text>
                <Text style={styles.weatherText}>💧 Humidity: {weather.main.humidity}%</Text>
              </View>
            ) : (
              <Text style={styles.weatherText}>No weather data available.</Text>
            )}
          </View>

          <View style={styles.alertTable}>
            <Text style={styles.alertTitle}>Weather Alerts (NEA)</Text>
            {loading ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <>
                <View style={styles.alertRow}>
                  <Text style={styles.alertLabel}>Heavy Rain:</Text>
                  <Text style={[styles.alertStatus, { color: heavyRain ? 'red' : 'green' }]}>
                    {heavyRain ? 'Yes' : 'No'}
                  </Text>
                </View>
                <View style={styles.alertRow}>
                  <Text style={styles.alertLabel}>Flood Warning:</Text>
                  <Text style={[styles.alertStatus, { color: heavyRain ? 'red' : 'green' }]}>
                    {heavyRain ? 'Yes' : 'No'}
                  </Text>
                </View>
              </>
            )}
          </View>

          {showStations && (
            <View style={styles.stationsContainer}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableColName}>Station</Text>
                <Text style={styles.tableColRain}>Rainfall (mm)</Text>
                <Text style={styles.tableColStatus}>Status</Text>
              </View>
              {rainStations.map((station) => (
                <View key={station.id} style={styles.tableRow}>
                  <Text style={styles.tableColName}>{station.name}</Text>
                  <Text style={styles.tableColRain}>{station.value.toFixed(1)}</Text>
                  <Text style={[styles.tableColStatus, { color: station.isHeavyRain ? 'red' : 'green' }]}>
                    {station.isHeavyRain ? '⚠️ Heavy' : '✅ Normal'}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.flashFloodsButton}
            onPress={() => navigation.navigate('FlashFloods', { affectedAreas })}
          >
            <Text style={styles.flashFloodsButtonText}>Flash Floods</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlertsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  mapContainer: {
    marginBottom: 16,
  },
  map: {
    width: Dimensions.get('window').width - 32,
    height: 300,
  },
  toggleContainer: {
    flexDirection: 'column',
    marginTop: 8,
    marginBottom: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#333',
  },
  mapCaption: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  weatherContainer: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f0f8ff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  weatherInfo: {
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 16,
    marginVertical: 2,
  },
  alertTable: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  alertLabel: {
    fontSize: 16,
  },
  alertStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stationsContainer: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  tableColName: {
    flex: 1.5,
    fontSize: 14,
  },
  tableColRain: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  tableColStatus: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  flashFloodsButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  flashFloodsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});