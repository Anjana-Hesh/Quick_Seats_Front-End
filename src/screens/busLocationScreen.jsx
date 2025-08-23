import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getLocalDataTime() {
  try {
    const data = await AsyncStorage.getItem('selectedRoute');
    if (data !== null) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.log('Error reading route:', error);
  }
}

// connection
async function connection(url, method) {
  const response = fetch(url, {
    method: { method },
    headers: {
      'content-Type': 'application/json',
      Authorization: '',
    },
    body: JSON.stringify(),
  });

  if (!(await response).ok) {
    throw new Error('Error');
  }

  const data = (await response).json();
  Alert.alert('Success');
  return data;
}

const BusLocationScreen = ({ route, navigation }) => {
  const { busNumber, route: busRoute, currentLocation, busId } = route.params;
  const [busLocation, setBusLocation] = useState(currentLocation);
  const [isTracking, setIsTracking] = useState(false);
  const mapRef = useRef(null);

  // Simulate real-time location updates
  useEffect(() => {
    let locationInterval;

    if (isTracking) {
      locationInterval = setInterval(() => {
        // Simulate bus movement (small random changes)
        setBusLocation(prevLocation => ({
          latitude: prevLocation.latitude + (Math.random() - 0.5) * 0.001,
          longitude: prevLocation.longitude + (Math.random() - 0.5) * 0.001,
        }));
      }, 5000); // Update every 5 seconds
    }

    return () => {
      if (locationInterval) {
        clearInterval(locationInterval);
      }
    };
  }, [isTracking]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCenterMap = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...busLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    }
  };

  const handleToggleTracking = () => {
    setIsTracking(!isTracking);
    if (!isTracking) {
      Alert.alert(
        'Live Tracking',
        'Live tracking enabled. Bus location will update automatically.',
        [{ text: 'OK' }],
      );
    } else {
      Alert.alert('Live Tracking', 'Live tracking disabled.', [{ text: 'OK' }]);
    }
  };

  const getBusInfo = () => {
    // Simulate API call to get more bus details
    Alert.alert(
      'Bus Information',
      `Bus: ${busNumber}\nRoute: ${busRoute}\nStatus: Active\nDriver: John Doe\nNext Stop: Main Street\nETA: 5 minutes`,
      [{ text: 'OK' }],
    );
  };

  const BatteryIcon = ({ level = 75 }) => {
    const batteryColor = level > 20 ? 'black' : 'red';

    return (
      <View style={styles.batteryContainer}>
        <View
          style={[
            styles.battery,
            { width: `${level}%`, backgroundColor: batteryColor },
          ]}
        />
        <View style={styles.batteryTip} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Custom Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.timeText}>22:00</Text>

        {Platform.OS === 'ios' && (
          <View style={styles.notchArea}>
            <View style={styles.notch} />
          </View>
        )}

        <View style={styles.statusIcons}>
          <View style={styles.signalBars}>
            <View style={[styles.bar, styles.bar1]} />
            <View style={[styles.bar, styles.bar2]} />
            <View style={[styles.bar, styles.bar3]} />
            <View style={[styles.bar, styles.bar4]} />
          </View>
          <Text style={styles.iconText}></Text>
          <BatteryIcon level={75} />
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{busNumber}</Text>
          <Text style={styles.headerSubtitle}>{busRoute}</Text>
        </View>

        <TouchableOpacity style={styles.infoButton} onPress={getBusInfo}>
          <Text style={styles.infoIcon}>ℹ️</Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            ...busLocation,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          showsMyLocationButton={false}
          followsUserLocation={false}
        >
          <Marker
            coordinate={busLocation}
            title={`Bus ${busNumber}`}
            description={`Route: ${busRoute}`}
            pinColor="#FF6B6B"
          >
            <View style={styles.busMarker}>
              <Text style={styles.busMarkerText}>🚌</Text>
            </View>
          </Marker>
        </MapView>

        {/* Map Controls */}
        <TouchableOpacity style={styles.centerButton} onPress={handleCenterMap}>
          <Text style={styles.centerButtonText}>📍</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Info Panel */}
      <View style={styles.bottomPanel}>
        <View style={styles.busStatusContainer}>
          <View style={styles.statusIndicator}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isTracking ? '#10B981' : '#EF4444' },
              ]}
            />
            <Text style={styles.statusText}>
              {isTracking ? 'Live Tracking' : 'Static Location'}
            </Text>
          </View>

          <Text style={styles.lastUpdated}>
            Last updated: {new Date().toLocaleTimeString()}
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.trackingButton]}
            onPress={handleToggleTracking}
          >
            <Text style={styles.actionButtonText}>
              {isTracking ? 'Stop Tracking' : 'Start Tracking'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.shareButton]}
            onPress={() =>
              Alert.alert('Share', 'Location shared successfully!')
            }
          >
            <Text style={styles.actionButtonText}>Share Location</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.locationInfo}>
          <Text style={styles.coordinatesText}>
            📍 {busLocation.latitude.toFixed(6)},{' '}
            {busLocation.longitude.toFixed(6)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 5 : 35,
    paddingBottom: 5,
    backgroundColor: '#FFFFFF',
  },
  timeText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
  notchArea: {
    flex: 1,
    alignItems: 'center',
  },
  notch: {
    width: 120,
    height: 25,
    backgroundColor: 'black',
    borderRadius: 15,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 8,
    height: 14,
  },
  bar: {
    width: 3,
    backgroundColor: 'black',
    marginRight: 2,
  },
  bar1: { height: 5 },
  bar2: { height: 7 },
  bar3: { height: 9 },
  bar4: { height: 11 },
  iconText: {
    fontSize: 14,
    marginRight: 8,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  battery: {
    width: 20,
    height: 10,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'black',
  },
  batteryTip: {
    width: 2,
    height: 4,
    backgroundColor: 'black',
    marginLeft: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  infoButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 20,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  busMarker: {
    width: 40,
    height: 40,
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  busMarkerText: {
    fontSize: 20,
  },
  centerButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  centerButtonText: {
    fontSize: 24,
  },
  bottomPanel: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  busStatusContainer: {
    marginBottom: 20,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  lastUpdated: {
    fontSize: 14,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  actionButton: {
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackingButton: {
    backgroundColor: '#3B82F6',
  },
  shareButton: {
    backgroundColor: '#10B981',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  locationInfo: {
    alignItems: 'center',
  },
  coordinatesText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});

export default BusLocationScreen;
