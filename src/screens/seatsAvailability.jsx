// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   SafeAreaView,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import SideMenu from './components/SideMenu';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // save data locally
// async function getLocalDataTime() {
//   try {
//     const data = await AsyncStorage.getItem('selectedRoute');
//     if (data !== null) {
//       return JSON.parse(data);
//     }
//     return null;
//   } catch (error) {
//     console.log('Error reading route:', error);
//   }
// }

// // connection
// async function connection(url, method) {
//   const response = fetch(url, {
//     method: { method },
//     headers: {
//       'content-Type': 'application/json',
//       Authorization: '',
//     },
//     body: JSON.stringify(),
//   });

//   if (!(await response).ok) {
//     throw new Error('Error');
//   }

//   const data = (await response).json();
//   Alert.alert('Success');
//   return data;
// }

// // Manual Icons Components
// const BackIcon = ({ size = 24, color = 'white' }) => (
//   <View style={[styles.icon, { width: size, height: size }]}>
//     <View
//       style={[
//         styles.backArrow,
//         { borderTopColor: color, borderRightColor: color },
//       ]}
//     />
//   </View>
// );

// const MenuIcon = ({ size = 24, color = 'white' }) => (
//   <View style={[styles.icon, { width: size, height: size }]}>
//     <View style={[styles.menuLine, { backgroundColor: color }]} />
//     <View style={[styles.menuLine, { backgroundColor: color }]} />
//     <View style={[styles.menuLine, { backgroundColor: color }]} />
//   </View>
// );

// const SeatManagerScreen = () => {
//   const navigation = useNavigation();
//   const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

//   // Updated seat configuration to match the image (left: 2 seats, right: 3 seats per row + 6 back seats)
//   const [seats, setSeats] = useState({
//     // Left side seats (2 seats per row - A & B columns)
//     A1: 0,
//     B1: 1,
//     A2: 0,
//     B2: 0,
//     A3: 0,
//     B3: 0,
//     A4: 0,
//     B4: 0,
//     A5: 0,
//     B5: 0,
//     A6: 0,
//     B6: 0,
//     A7: 0,
//     B7: 0,
//     A8: 0,
//     B8: 0,
//     A9: 0,
//     B9: 0,
//     A10: 0,
//     B10: 1,
//     A11: 0,
//     B11: 0,
//     A12: 0,
//     B12: 0,
//     A13: 0,
//     B13: 0,
//     A14: 0,
//     B14: 0,
//     A15: 0,
//     B15: 0,

//     // Right side seats (3 seats per row - C, D & E columns)
//     C1: 0,
//     D1: 0,
//     E1: 0,
//     C2: 0,
//     D2: 0,
//     E2: 0,
//     C3: 0,
//     D3: 0,
//     E3: 0,
//     C4: 0,
//     D4: 0,
//     E4: 0,
//     C5: 0,
//     D5: 0,
//     E5: 0,
//     C6: 0,
//     D6: 0,
//     E6: 0,
//     C7: 0,
//     D7: 0,
//     E7: 0,
//     C8: 0,
//     D8: 0,
//     E8: 0,
//     C9: 0,
//     D9: 0,
//     E9: 0,
//     C10: 0,
//     D10: 0,
//     E10: 0,
//     C11: 0,
//     D11: 0,
//     E11: 0,
//     C12: 0,
//     D12: 0,
//     E12: 0,
//     C13: 0,
//     D13: 0,
//     E13: 0,
//     C14: 0,
//     D14: 0,
//     E14: 0,
//     C15: 0,
//     D15: 0,
//     E15: 0,

//     // Back row seats (6 seats in the last row)
//     BACK1: 0,
//     BACK2: 0,
//     BACK3: 0,
//     BACK4: 0,
//     BACK5: 0,
//     BACK6: 0,
//   });

//   const handleBackPress = () => {
//     navigation.goBack();
//   };

//   const handleMenuPress = () => {
//     setIsSideMenuVisible(true);
//   };

//   const handleCloseSideMenu = () => {
//     setIsSideMenuVisible(false);
//   };

//   const handleSeatPress = seatId => {
//     setSeats(prevSeats => ({
//       ...prevSeats,
//       [seatId]: prevSeats[seatId] === 0 ? 1 : 0,
//     }));
//   };

//   const handleSave = () => {
//     const bookedSeats = Object.keys(seats).filter(
//       seatId => seats[seatId] === 1,
//     );
//     console.log('Saving booked seats:', bookedSeats);
//     // Add your save logic here
//   };

//   const getSeatStyle = status => {
//     return status === 1 ? styles.bookedSeat : styles.availableSeat;
//   };

//   const Seat = ({ seatId, isDouble = false }) => (
//     <TouchableOpacity
//       style={[
//         styles.seat,
//         getSeatStyle(seats[seatId]),
//         isDouble && styles.doubleSeat,
//       ]}
//       onPress={() => handleSeatPress(seatId)}
//       activeOpacity={0.7}
//     />
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4A9BB8" barStyle="light-content" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.headerButton}
//           onPress={handleBackPress}
//           activeOpacity={0.7}
//         >
//           <BackIcon size={24} color="white" />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Seat Manager</Text>

//         <TouchableOpacity
//           style={styles.headerButton}
//           onPress={handleMenuPress}
//           activeOpacity={0.7}
//         >
//           <MenuIcon size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       {/* Content */}
//       <View style={styles.content}>
//         {/* Bus Layout Card */}
//         <View style={styles.busCard}>
//           <ScrollView
//             style={styles.busLayout}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.busLayoutContent}
//           >
//             {/* Door indicator at front */}
//             <View style={styles.doorRow}>
//               <View style={styles.door} />
//               <View style={styles.doorLines}>
//                 <View style={styles.doorLine} />
//                 <View style={styles.doorLine} />
//               </View>
//             </View>

//             {/* Driver's area - Right Side */}
//             <View style={styles.driverRow}>
//               <View style={styles.leftEmpty} />
//               <View style={styles.aisle} />
//               <View style={styles.driverSide}>
//                 <View style={styles.driverSeat} />
//               </View>
//             </View>

//             {/* Regular seat rows */}
//             {Array.from({ length: 15 }, (_, index) => {
//               const rowNumber = index + 1;
//               return (
//                 <View key={rowNumber} style={styles.seatRow}>
//                   <View style={styles.leftSide}>
//                     <View style={styles.leftSeatGroup}>
//                       <Seat seatId={`A${rowNumber}`} />
//                       <Seat seatId={`B${rowNumber}`} />
//                     </View>
//                   </View>
//                   <View style={styles.aisle} />
//                   <View style={styles.rightSide}>
//                     <View style={styles.rightSeatGroup}>
//                       <Seat seatId={`C${rowNumber}`} />
//                       <Seat seatId={`D${rowNumber}`} />
//                       <Seat seatId={`E${rowNumber}`} />
//                     </View>
//                   </View>
//                 </View>
//               );
//             })}

//             {/* Back row with 6 seats */}
//             <View style={styles.backRow}>
//               <Seat seatId="BACK1" />
//               <Seat seatId="BACK2" />
//               <Seat seatId="BACK3" />
//               <Seat seatId="BACK4" />
//               <Seat seatId="BACK5" />
//               <Seat seatId="BACK6" />
//             </View>
//           </ScrollView>
//         </View>

//         {/* Legend */}
//         <View style={styles.legend}>
//           <View style={styles.legendItem}>
//             <View style={[styles.legendSeat, styles.availableSeat]} />
//             <Text style={styles.legendText}>Available</Text>
//           </View>
//           <View style={styles.legendItem}>
//             <View style={[styles.legendSeat, styles.bookedSeat]} />
//             <Text style={styles.legendText}>Booked</Text>
//           </View>
//         </View>

//         {/* Save Button */}
//         <TouchableOpacity
//           style={styles.saveButton}
//           onPress={handleSave}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.saveButtonText}>Save</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Side Menu */}
//       <SideMenu isVisible={isSideMenuVisible} onClose={handleCloseSideMenu} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },

//   // Header Styles
//   header: {
//     backgroundColor: '#4A9BB8',
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   headerButton: {
//     padding: 8,
//     borderRadius: 20,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: '600',
//     flex: 1,
//     textAlign: 'left',
//     marginLeft: 16,
//   },

//   // Content Styles
//   content: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 20,
//   },

//   // Bus Card Styles
//   busCard: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     flex: 1,
//     marginBottom: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     overflow: 'hidden',
//   },
//   busLayout: {
//     flex: 1,
//     backgroundColor: '#E8E8E8',
//   },
//   busLayoutContent: {
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//   },

//   // Door Styles
//   doorRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     marginBottom: 15,
//     paddingRight: 20,
//   },
//   door: {
//     width: 25,
//     height: 8,
//     backgroundColor: '#666',
//     borderRadius: 2,
//     marginRight: 10,
//   },
//   doorLines: {
//     flexDirection: 'column',
//   },
//   doorLine: {
//     width: 15,
//     height: 1.5,
//     backgroundColor: '#777',
//     marginVertical: 1,
//     borderRadius: 1,
//   },

//   // Driver's area
//   driverRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   leftEmpty: {
//     flex: 1,
//   },
//   driverSide: {
//     flex: 1.5,
//     alignItems: 'flex-end',
//     paddingRight: 10,
//   },
//   driverSeat: {
//     width: 30,
//     height: 20,
//     backgroundColor: '#333',
//     borderRadius: 4,
//   },

//   // Back row styles
//   backRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     marginTop: 10,
//     paddingHorizontal: 10,
//   },

//   // Seat Styles
//   seatRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     paddingHorizontal: 5,
//   },
//   leftSide: {
//     flex: 1,
//     alignItems: 'flex-start',
//     paddingLeft: 10,
//   },
//   rightSide: {
//     flex: 1.5,
//     alignItems: 'flex-end',
//     paddingRight: 10,
//   },
//   leftSeatGroup: {
//     flexDirection: 'row',
//     gap: 5,
//   },
//   rightSeatGroup: {
//     flexDirection: 'row',
//     gap: 5,
//   },
//   aisle: {
//     width: 25,
//     height: 1,
//   },
//   seat: {
//     width: 28,
//     height: 18,
//     borderRadius: 4,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   availableSeat: {
//     backgroundColor: '#999',
//   },
//   bookedSeat: {
//     backgroundColor: '#FF3333',
//   },

//   // Legend Styles
//   legend: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//     paddingVertical: 10,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 20,
//   },
//   legendSeat: {
//     width: 20,
//     height: 12,
//     borderRadius: 2,
//     marginRight: 8,
//   },
//   legendText: {
//     fontSize: 14,
//     color: '#666',
//   },

//   // Save Button Styles
//   saveButton: {
//     backgroundColor: '#4A4A6A',
//     borderRadius: 8,
//     paddingVertical: 16,
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   saveButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },

//   // Manual Icon Styles
//   icon: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   // Back Arrow Icon
//   backArrow: {
//     width: 0,
//     height: 0,
//     borderTopWidth: 6,
//     borderRightWidth: 6,
//     borderTopColor: 'transparent',
//     borderRightColor: 'transparent',
//     transform: [{ rotate: '225deg' }],
//     marginLeft: 2,
//   },

//   // Menu Icon (Hamburger)
//   menuLine: {
//     width: 18,
//     height: 2,
//     marginVertical: 2,
//     borderRadius: 1,
//   },
// });

// export default SeatManagerScreen;

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SideMenu from './components/SideMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  SEAT_DATA: 'bus_seat_data',
  SELECTED_ROUTE: 'selectedRoute',
  LAST_UPDATE: 'seat_last_update',
};

// Seat status constants
const SEAT_STATUS = {
  AVAILABLE: 0,
  BOOKED: 1,
  UNAVAILABLE: 2,
};

// Local Storage Service
class SeatStorageService {
  // Get seat data from local storage
  static async getSeatData() {
    try {
      const seatData = await AsyncStorage.getItem('UserArray');
      if (seatData) {
        return JSON.parse(seatData);
      }
      return null;
    } catch (error) {
      console.error('Error reading seat data:', error);
      return null;
    }
  }

  // Save seat data to local storage
  static async saveSeatData(seatData) {
    try {
      const dataToSave = {
        seats: seatData,
        lastUpdate: new Date().toISOString(),
        version: '1.0',
      };
      await AsyncStorage.setItem(
        STORAGE_KEYS.SEAT_DATA,
        JSON.stringify(dataToSave),
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.LAST_UPDATE,
        new Date().toISOString(),
      );
      return true;
    } catch (error) {
      console.error('Error saving seat data:', error);
      return false;
    }
  }

  // Get route data
  static async getRouteData() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_ROUTE);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.error('Error reading route:', error);
      return null;
    }
  }

  // Clear all seat data
  static async clearSeatData() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.SEAT_DATA);
      await AsyncStorage.removeItem(STORAGE_KEYS.LAST_UPDATE);
      return true;
    } catch (error) {
      console.error('Error clearing seat data:', error);
      return false;
    }
  }

  // Get last update timestamp
  static async getLastUpdate() {
    try {
      const lastUpdate = await AsyncStorage.getItem(STORAGE_KEYS.LAST_UPDATE);
      return lastUpdate;
    } catch (error) {
      console.error('Error getting last update:', error);
      return null;
    }
  }
}

// API Service
class APIService {
  static async makeRequest(url, method = 'GET', body = null) {
    try {
      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: '', // Add your auth token here
        },
      };

      if (body && method !== 'GET') {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} - ${response.statusText}`,
        );
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API Request Error:', error);
      return { success: false, error: error.message };
    }
  }

  // Sync seat data with server
  static async syncSeatData(seatData) {
    const result = await this.makeRequest('/api/seats/sync', 'POST', seatData);
    return result;
  }

  // Fetch latest seat data from server
  static async fetchSeatData() {
    const result = await this.makeRequest('/api/seats', 'GET');
    return result;
  }
}

// Manual Icons Components
const BackIcon = ({ size = 24, color = 'white' }) => (
  <View style={[styles.icon, { width: size, height: size }]}>
    <View
      style={[
        styles.backArrow,
        { borderTopColor: color, borderRightColor: color },
      ]}
    />
  </View>
);

const MenuIcon = ({ size = 24, color = 'white' }) => (
  <View style={[styles.icon, { width: size, height: size }]}>
    <View style={[styles.menuLine, { backgroundColor: color }]} />
    <View style={[styles.menuLine, { backgroundColor: color }]} />
    <View style={[styles.menuLine, { backgroundColor: color }]} />
  </View>
);

const RefreshIcon = ({ size = 20, color = 'white' }) => (
  <View style={[styles.icon, { width: size, height: size }]}>
    <View style={[styles.refreshCircle, { borderColor: color }]} />
  </View>
);

const SeatManagerScreen = () => {
  const navigation = useNavigation();
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Initialize default seat configuration
  const getDefaultSeats = () => {
    const defaultSeats = {};

    // Left side seats (2 seats per row - A & B columns)
    for (let row = 1; row <= 15; row++) {
      defaultSeats[`A${row}`] = SEAT_STATUS.AVAILABLE;
      defaultSeats[`B${row}`] = SEAT_STATUS.AVAILABLE;
    }

    // Right side seats (3 seats per row - C, D & E columns)
    for (let row = 1; row <= 15; row++) {
      defaultSeats[`C${row}`] = SEAT_STATUS.AVAILABLE;
      defaultSeats[`D${row}`] = SEAT_STATUS.AVAILABLE;
      defaultSeats[`E${row}`] = SEAT_STATUS.AVAILABLE;
    }

    // Back row seats (6 seats in the last row)
    for (let i = 1; i <= 6; i++) {
      defaultSeats[`BACK${i}`] = SEAT_STATUS.AVAILABLE;
    }

    return defaultSeats;
  };

  const [seats, setSeats] = useState(getDefaultSeats());

  // Load seat data on component mount
  useEffect(() => {
    loadSeatData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load seat data from storage
  const loadSeatData = async () => {
    try {
      setIsLoading(true);

      const storedData = await SeatStorageService.getSeatData();
      const lastUpdateTime = await SeatStorageService.getLastUpdate();

      if (storedData && storedData.seats) {
        setSeats(storedData.seats);
        console.log(
          'Loaded seat data from storage:',
          Object.keys(storedData.seats).length,
          'seats',
        );
      } else {
        console.log('No stored seat data found, using defaults');
        const defaultSeats = getDefaultSeats();
        setSeats(defaultSeats);
        // Save default configuration
        await SeatStorageService.saveSeatData(defaultSeats);
      }

      setLastUpdate(lastUpdateTime);
    } catch (error) {
      console.error('Error loading seat data:', error);
      Alert.alert('Error', 'Failed to load seat data');
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh seat data from server
  const refreshSeatData = async () => {
    try {
      setIsRefreshing(true);

      const result = await APIService.fetchSeatData();
      if (result.success && result.data) {
        setSeats(result.data.seats || getDefaultSeats());
        await SeatStorageService.saveSeatData(
          result.data.seats || getDefaultSeats(),
        );
        const newLastUpdate = await SeatStorageService.getLastUpdate();
        setLastUpdate(newLastUpdate);

        Alert.alert('Success', 'Seat data refreshed successfully');
      } else {
        Alert.alert('Error', 'Failed to refresh seat data from server');
      }
    } catch (error) {
      console.error('Error refreshing seat data:', error);
      Alert.alert('Error', 'Failed to refresh seat data');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Handle navigation
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuPress = () => {
    setIsSideMenuVisible(true);
  };

  const handleCloseSideMenu = () => {
    setIsSideMenuVisible(false);
  };

  // Handle seat selection
  const handleSeatPress = useCallback(seatId => {
    setSeats(prevSeats => ({
      ...prevSeats,
      [seatId]:
        prevSeats[seatId] === SEAT_STATUS.AVAILABLE
          ? SEAT_STATUS.BOOKED
          : SEAT_STATUS.AVAILABLE,
    }));
  }, []);

  // Save seat data
  const handleSave = async () => {
    try {
      setIsSaving(true);

      const saveSuccess = await SeatStorageService.saveSeatData(seats);

      if (saveSuccess) {
        // Sync with server
        const syncResult = await APIService.syncSeatData({ seats });

        const bookedSeats = Object.keys(seats).filter(
          seatId => seats[seatId] === SEAT_STATUS.BOOKED,
        );

        console.log('Saved booked seats:', bookedSeats);

        const newLastUpdate = await SeatStorageService.getLastUpdate();
        setLastUpdate(newLastUpdate);

        if (syncResult.success) {
          Alert.alert(
            'Success',
            `Seat data saved successfully!\nBooked seats: ${bookedSeats.length}`,
          );
        } else {
          Alert.alert(
            'Partially Saved',
            'Data saved locally but failed to sync with server',
          );
        }
      } else {
        Alert.alert('Error', 'Failed to save seat data');
      }
    } catch (error) {
      console.error('Error saving seat data:', error);
      Alert.alert('Error', 'Failed to save seat data');
    } finally {
      setIsSaving(false);
    }
  };

  // Reset all seats
  const handleReset = () => {
    Alert.alert(
      'Reset Seats',
      'Are you sure you want to reset all seats to available?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            const defaultSeats = getDefaultSeats();
            setSeats(defaultSeats);
          },
        },
      ],
    );
  };

  // Get seat style based on status
  const getSeatStyle = status => {
    switch (status) {
      case SEAT_STATUS.BOOKED:
        return styles.bookedSeat;
      case SEAT_STATUS.UNAVAILABLE:
        return styles.unavailableSeat;
      default:
        return styles.availableSeat;
    }
  };

  // Get seat statistics
  const getSeatStats = () => {
    const totalSeats = Object.keys(seats).length;
    const bookedSeats = Object.values(seats).filter(
      status => status === SEAT_STATUS.BOOKED,
    ).length;
    const availableSeats = Object.values(seats).filter(
      status => status === SEAT_STATUS.AVAILABLE,
    ).length;
    const unavailableSeats = Object.values(seats).filter(
      status => status === SEAT_STATUS.UNAVAILABLE,
    ).length;

    return { totalSeats, bookedSeats, availableSeats, unavailableSeats };
  };

  const stats = getSeatStats();

  // Seat component
  const Seat = ({ seatId, isDouble = false }) => (
    <TouchableOpacity
      style={[
        styles.seat,
        getSeatStyle(seats[seatId]),
        isDouble && styles.doubleSeat,
      ]}
      onPress={() => handleSeatPress(seatId)}
      activeOpacity={0.7}
      disabled={seats[seatId] === SEAT_STATUS.UNAVAILABLE}
    >
      <Text style={styles.seatLabel}>{seatId.replace('BACK', 'B')}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#4A9BB8" barStyle="light-content" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A9BB8" />
          <Text style={styles.loadingText}>Loading seat data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4A9BB8" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <BackIcon size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Seat Manager</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.headerButton, styles.refreshButton]}
            onPress={refreshSeatData}
            activeOpacity={0.7}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <ActivityIndicator size={20} color="white" />
            ) : (
              <RefreshIcon size={20} color="white" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleMenuPress}
            activeOpacity={0.7}
          >
            <MenuIcon size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Header */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.totalSeats}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, styles.bookedStatNumber]}>
            {stats.bookedSeats}
          </Text>
          <Text style={styles.statLabel}>Booked</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, styles.availableStatNumber]}>
            {stats.availableSeats}
          </Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Bus Layout Card */}
        <View style={styles.busCard}>
          <ScrollView
            style={styles.busLayout}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.busLayoutContent}
          >
            {/* Door indicator at front */}
            <View style={styles.doorRow}>
              <View style={styles.door} />
              <View style={styles.doorLines}>
                <View style={styles.doorLine} />
                <View style={styles.doorLine} />
              </View>
            </View>

            {/* Driver's area - Right Side */}
            <View style={styles.driverRow}>
              <View style={styles.leftEmpty} />
              <View style={styles.aisle} />
              <View style={styles.driverSide}>
                <View style={styles.driverSeat} />
                <Text style={styles.driverLabel}>Driver</Text>
              </View>
            </View>

            {/* Regular seat rows */}
            {Array.from({ length: 15 }, (_, index) => {
              const rowNumber = index + 1;
              return (
                <View key={rowNumber} style={styles.seatRow}>
                  <Text style={styles.rowNumber}>{rowNumber}</Text>
                  <View style={styles.leftSide}>
                    <View style={styles.leftSeatGroup}>
                      <Seat seatId={`A${rowNumber}`} />
                      <Seat seatId={`B${rowNumber}`} />
                    </View>
                  </View>
                  <View style={styles.aisle} />
                  <View style={styles.rightSide}>
                    <View style={styles.rightSeatGroup}>
                      <Seat seatId={`C${rowNumber}`} />
                      <Seat seatId={`D${rowNumber}`} />
                      <Seat seatId={`E${rowNumber}`} />
                    </View>
                  </View>
                </View>
              );
            })}

            {/* Back row with 6 seats */}
            <View style={styles.backRow}>
              <Text style={styles.backRowLabel}>Back Row</Text>
              <View style={styles.backSeatsContainer}>
                {Array.from({ length: 6 }, (_, index) => (
                  <Seat key={`BACK${index + 1}`} seatId={`BACK${index + 1}`} />
                ))}
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendSeat, styles.availableSeat]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendSeat, styles.bookedSeat]} />
            <Text style={styles.legendText}>Booked</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendSeat, styles.unavailableSeat]} />
            <Text style={styles.legendText}>Unavailable</Text>
          </View>
        </View>

        {/* Action Buttons
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.resetButton]}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Text style={styles.resetButtonText}>Reset All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSave}
            activeOpacity={0.8}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size={20} color="white" />
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </View> */}

        {/* Last Update Info */}
        {lastUpdate && (
          <Text style={styles.lastUpdateText}>
            Last updated: {new Date(lastUpdate).toLocaleString()}
          </Text>
        )}
      </View>

      {/* Side Menu */}
      <SideMenu isVisible={isSideMenuVisible} onClose={handleCloseSideMenu} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },

  // Header Styles
  header: {
    backgroundColor: '#4A9BB8',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
  },
  refreshButton: {
    marginRight: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'left',
    marginLeft: 16,
  },

  // Stats Styles
  statsContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bookedStatNumber: {
    color: '#FF3333',
  },
  availableStatNumber: {
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },

  // Content Styles
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  // Bus Card Styles
  busCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 1,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  busLayout: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  busLayoutContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  // Door Styles
  doorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 15,
    paddingRight: 20,
  },
  door: {
    width: 25,
    height: 8,
    backgroundColor: '#666',
    borderRadius: 2,
    marginRight: 10,
  },
  doorLines: {
    flexDirection: 'column',
  },
  doorLine: {
    width: 15,
    height: 1.5,
    backgroundColor: '#777',
    marginVertical: 1,
    borderRadius: 1,
  },

  // Driver's area
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  leftEmpty: {
    flex: 1,
  },
  driverSide: {
    flex: 1.5,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  driverSeat: {
    width: 30,
    height: 20,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  driverLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },

  // Row number
  rowNumber: {
    fontSize: 10,
    color: '#666',
    width: 20,
    textAlign: 'center',
  },

  // Back row styles
  backRow: {
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  backRowLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  backSeatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },

  // Seat Styles
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  leftSide: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  rightSide: {
    flex: 1.5,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  leftSeatGroup: {
    flexDirection: 'row',
    gap: 5,
  },
  rightSeatGroup: {
    flexDirection: 'row',
    gap: 5,
  },
  aisle: {
    width: 25,
    height: 1,
  },
  seat: {
    width: 32,
    height: 20,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'white',
  },
  availableSeat: {
    backgroundColor: '#4CAF50',
  },
  bookedSeat: {
    backgroundColor: '#FF3333',
  },
  unavailableSeat: {
    backgroundColor: '#999',
  },

  // Legend Styles
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  legendSeat: {
    width: 20,
    height: 12,
    borderRadius: 2,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },

  // Action Button Styles
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  resetButton: {
    backgroundColor: '#FF5722',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#4A4A6A',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Last Update Styles
  lastUpdateText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 10,
  },

  // Manual Icon Styles
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Back Arrow Icon
  backArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '225deg' }],
    marginLeft: 2,
  },

  // Menu Icon (Hamburger)
  menuLine: {
    width: 18,
    height: 2,
    marginVertical: 2,
    borderRadius: 1,
  },

  // Refresh Icon
  refreshCircle: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderRadius: 8,
    borderTopColor: 'transparent',
  },
});

export default SeatManagerScreen;
