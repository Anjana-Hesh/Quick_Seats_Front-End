// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   TextInput,
//   ScrollView,
//   StatusBar,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

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

// const AddDriverToBusScreen = ({ navigation, route }) => {
//   const [driverName, setDriverName] = useState('');
//   const [driverId, setDriverId] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [selectedBus, setSelectedBus] = useState(null);

//   // Sample bus data
//   const buses = [
//     { id: 'BUS-001', number: 'NA-1234', route: 'Colombo-Kandy' },
//     { id: 'BUS-002', number: 'NA-5678', route: 'Colombo-Galle' },
//     { id: 'BUS-003', number: 'NA-9012', route: 'Kandy-Jaffna' },
//   ];

//   const handleAssignDriver = () => {
//     if (!driverName || !driverId || !phoneNumber || !selectedBus) {
//       Alert.alert('Error', 'Please fill all fields and select a bus');
//       return;
//     }

//     Alert.alert(
//       'Success',
//       `Driver ${driverName} assigned to Bus ${selectedBus.number}`,
//       [{ text: 'OK', onPress: () => navigation.goBack() }],
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#4A9EAF" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Text style={styles.backIcon}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Assign Driver to Bus</Text>
//         <View style={styles.headerRight} />
//       </View>

//       <ScrollView style={styles.content}>
//         {/* Driver Information Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Driver Details</Text>

//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Driver Name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter driver name"
//               value={driverName}
//               onChangeText={setDriverName}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Driver ID</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter driver ID"
//               value={driverId}
//               onChangeText={setDriverId}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Phone Number</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter phone number"
//               keyboardType="phone-pad"
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//             />
//           </View>
//         </View>

//         {/* Bus Selection Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select Bus</Text>

//           {buses.map(bus => (
//             <TouchableOpacity
//               key={bus.id}
//               style={[
//                 styles.busCard,
//                 selectedBus?.id === bus.id && styles.selectedBusCard,
//               ]}
//               onPress={() => setSelectedBus(bus)}
//             >
//               <View style={styles.busInfo}>
//                 <Text style={styles.busNumber}>{bus.number}</Text>
//                 <Text style={styles.busRoute}>{bus.route}</Text>
//               </View>
//               {selectedBus?.id === bus.id && (
//                 <Text style={styles.selectedIcon}>✓</Text>
//               )}
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Submit Button */}
//         <TouchableOpacity
//           style={styles.assignButton}
//           onPress={handleAssignDriver}
//         >
//           <Text style={styles.assignButtonText}>Assign Driver</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#4A9EAF',
//     paddingVertical: 15,
//     paddingHorizontal: 16,
//   },
//   backButton: {
//     padding: 8,
//   },
//   backIcon: {
//     fontSize: 24,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: 'white',
//   },
//   headerRight: {
//     width: 40, // To balance the header
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 20,
//   },
//   section: {
//     marginBottom: 25,
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#4A9EAF',
//     marginBottom: 15,
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   inputLabel: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 5,
//   },
//   input: {
//     backgroundColor: '#F0F0F0',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//   },
//   busCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#F8F8F8',
//     borderRadius: 8,
//     padding: 15,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   selectedBusCard: {
//     backgroundColor: '#E1F0F7',
//     borderColor: '#4A9EAF',
//   },
//   busInfo: {
//     flex: 1,
//   },
//   busNumber: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#2E3B5C',
//     marginBottom: 3,
//   },
//   busRoute: {
//     fontSize: 14,
//     color: '#666',
//   },
//   selectedIcon: {
//     fontSize: 20,
//     color: '#4A9EAF',
//     marginLeft: 10,
//   },
//   assignButton: {
//     backgroundColor: '#4A9EAF',
//     borderRadius: 8,
//     padding: 16,
//     alignItems: 'center',
//     marginVertical: 20,
//     elevation: 3,
//   },
//   assignButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default AddDriverToBusScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get owner buses from local storage
async function getOwnerBuses() {
  try {
    const userData = await AsyncStorage.getItem('usersArray');
    if (userData !== null) {
      const users = JSON.parse(userData);
      console.log('all the data', users);
      // Filter users with role "Owner" and have buses
      const owners = users.filter(
        user => user.role === 'Owner' && user.bus && user.bus.length > 0,
      );
      console.log('O', owners);
      // Extract all buses from owners
      let allBuses = [];
      owners.forEach(owner => {
        owner.bus.forEach(bus => {
          allBuses.push({
            ...bus,
            ownerId: owner.id,
            ownerName: owner.name,
            ownerEmail: owner.email,
          });
        });
      });
      console.log('a', allBuses);

      return allBuses;
    }
    return [];
  } catch (error) {
    console.log('Error reading owner buses:', error);
    return [];
  }
}

// Save updated user data with driver assignment///////////////////////////////////////////////////////
async function assignDriverToBus(busId, driverDetails) {
  try {
    const userData = await AsyncStorage.getItem('usersArray');
    if (userData !== null) {
      let users = JSON.parse(userData);
      console.log('all the data', users);
      let isCont;
      users.map(user => {
        console.log('dd', user.role);
        console.log('ee', user.email);
        console.log('ee2', driverDetails.driverId);
        if (user.role === 'Driver' || user.email === driverDetails.driverId) {
          isCont = true;
        }
      });
      if (!isCont) {
        Alert('error', 'no match driver');
        return;
      }
      // Find the owner and bus to update
      users = users.map(user => {
        if (user.role === 'Owner' && user.bus && user.bus.length > 0) {
          user.bus = user.bus.map(bus => {
            if (bus.id === busId) {
              console.log('tr', bus.id);
              console.log('tr2', busId);
              return {
                ...bus,
                driver: {
                  name: driverDetails.driverId,
                  assignedAt: new Date().toISOString(),
                },
              };
            }
            console.log('bus', bus);
            return bus;
          });
        }
        console.log('user', user);
        return user;
      });
      console.log('users', users);
      // Save updated data back to AsyncStorage
      await AsyncStorage.setItem('usersArray', JSON.stringify(users));
      return true;
    }
    return false;
  } catch (error) {
    console.log('Error assigning driver to bus:', error);
    return false;
  }
}

const AddDriverToBusScreen = ({ navigation, route }) => {
  const [driverName, setDriverName] = useState('');
  const [driverId, setDriverId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedBus, setSelectedBus] = useState(null);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOwnerBuses();
  }, []);

  const loadOwnerBuses = async () => {
    try {
      setLoading(true);
      const ownerBuses = await getOwnerBuses();
      setBuses(ownerBuses);
    } catch (error) {
      console.log('Error loading buses:', error);
      Alert.alert('Error', 'Failed to load buses');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignDriver = async () => {
    if (!driverName || !driverId || !phoneNumber || !selectedBus) {
      Alert.alert('Error', 'Please fill all fields and select a bus');
      return;
    }

    try {
      const driverDetails = {
        driverId: driverId,
        name: driverName,
        phone: phoneNumber,
      };

      const success = await assignDriverToBus(selectedBus.id, driverDetails);

      if (success) {
        Alert.alert(
          'Success',
          `Driver ${driverName} has been assigned to Bus ${
            selectedBus.driverId || selectedBus.busNumber
          }`,
          [{ text: 'OK', onPress: () => navigation.goBack() }],
        );
      } else {
        Alert.alert('Error', 'Failed to assign driver to bus');
      }
    } catch (error) {
      console.log('Error in assignment:', error);
      Alert.alert('Error', 'An error occurred while assigning the driver');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#4A9EAF" />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Assign Driver to Bus</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading buses...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A9EAF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assign Driver to Bus</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {/* Driver Information Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Driver Information</Text>

          <TextInput
            style={styles.input}
            placeholder="Driver Name"
            value={driverName}
            onChangeText={setDriverName}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Driver ID"
            value={driverId}
            onChangeText={setDriverId}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
        </View>

        {/* Bus Selection */}
        <View style={styles.busSection}>
          <Text style={styles.sectionTitle}>Select Bus</Text>

          {buses.length === 0 ? (
            <View style={styles.noBusesContainer}>
              <Text style={styles.noBusesText}>
                No buses available from owners
              </Text>
            </View>
          ) : (
            buses.map(bus => (
              <TouchableOpacity
                key={bus.id}
                style={[
                  styles.busCard,
                  selectedBus?.id === bus.id && styles.selectedBusCard,
                ]}
                onPress={() => setSelectedBus(bus)}
              >
                <View style={styles.busInfo}>
                  <Text style={styles.busNumber}>
                    {bus.id || bus.busNumber || 'N/A'}
                  </Text>
                  <Text style={styles.busRoute}>
                    {bus.schedules[0]?.route?.startLocation &&
                    bus.schedules[0]?.route?.endLocation
                      ? `${bus.schedules[0].route.startLocation} → ${bus.schedules[0].route.endLocation}`
                      : 'Route not specified'}
                  </Text>
                  <Text style={styles.busOwner}>Owner: {bus.ownerName}</Text>
                  {bus.driver && (
                    <Text style={styles.currentDriver}>
                      Current Driver: {bus.driver.name}
                    </Text>
                  )}
                </View>
                {selectedBus?.id === bus.id && (
                  <Text style={styles.selectedIcon}>✓</Text>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.assignButton,
            buses.length === 0 && styles.disabledButton,
          ]}
          onPress={handleAssignDriver}
          disabled={buses.length === 0}
        >
          <Text style={styles.assignButtonText}>Assign Driver</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#4A9EAF',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formSection: {
    marginBottom: 24,
  },
  busSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    fontSize: 16,
  },
  busCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedBusCard: {
    borderColor: '#4A9EAF',
    borderWidth: 2,
    backgroundColor: '#F0F9FF',
  },
  busInfo: {
    flex: 1,
  },
  busNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  busRoute: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  busOwner: {
    fontSize: 12,
    color: '#4A9EAF',
    marginBottom: 2,
  },
  currentDriver: {
    fontSize: 12,
    color: '#FF6B6B',
    fontStyle: 'italic',
  },
  selectedIcon: {
    fontSize: 20,
    color: '#4A9EAF',
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  noBusesContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noBusesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  assignButton: {
    backgroundColor: '#4A9EAF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  assignButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddDriverToBusScreen;
