// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   SafeAreaView,
//   ScrollView,
//   TextInput,
//   Alert
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import SideMenu from './components/SideMenu';
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

// const PlusIcon = ({ size = 24, color = '#4A9BB8' }) => (
//   <View style={[styles.icon, { width: size, height: size }]}>
//     <View style={[styles.plusHorizontal, { backgroundColor: color }]} />
//     <View style={[styles.plusVertical, { backgroundColor: color }]} />
//   </View>
// );

// const PhoneIcon = ({ size = 20, color = '#4A9BB8' }) => (
//   <View style={[styles.icon, { width: size, height: size }]}>
//     <View style={[styles.phoneBody, { borderColor: color }]}>
//       <View style={[styles.phoneScreen, { backgroundColor: color }]} />
//     </View>
//   </View>
// );

// const EmailIcon = ({ size = 20, color = '#4A9BB8' }) => (
//   <View style={[styles.icon, { width: size, height: size }]}>
//     <View style={[styles.emailBody, { borderColor: color }]}>
//       <View style={[styles.emailFlap, { borderBottomColor: color }]} />
//     </View>
//   </View>
// );

// const EditIcon = ({ size = 16, color = '#666' }) => (
//   <View style={[styles.icon, { width: size, height: size }]}>
//     <View style={[styles.editPencil, { backgroundColor: color }]} />
//     <View style={[styles.editTip, { backgroundColor: color }]} />
//   </View>
// );

// const SettingsScreen = () => {
//   const navigation = useNavigation();
//   const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

//   // Form states
//   const [driverName, setDriverName] = useState('Anjana Heshan');
//   const [phoneNumber, setPhoneNumber] = useState('0765545851');
//   const [email, setEmail] = useState('anjana@gmail.com');
//   const [busName, setBusName] = useState('');
//   const [startLocation, setStartLocation] = useState('');
//   const [endLocation, setEndLocation] = useState('');
//   const [code, setCode] = useState('');

//   // Seat configuration states
//   const [leftSeats, setLeftSeats] = useState(2);
//   const [rightSeats, setRightSeats] = useState(3);
//   const [rowCount, setRowCount] = useState(15);
//   const [reserveSeatCount, setReserveSeatCount] = useState(6);

//   const handleBackPress = () => {
//     navigation.goBack();
//   };

//   const handleMenuPress = () => {
//     setIsSideMenuVisible(true);
//   };

//   const handleCloseSideMenu = () => {
//     setIsSideMenuVisible(false);
//   };

//   const handleSave = () => {
//     const settingsData = {
//       driverName,
//       phoneNumber,
//       email,
//       busName,
//       startLocation,
//       endLocation,
//       code,
//       seatConfiguration: {
//         leftSeats,
//         rightSeats,
//         rowCount,
//         reserveSeatCount,
//       },
//     };
//     console.log('Saving settings:', settingsData);
//     // Add your save logic here
//   };

//   // Drag and drop seat configuration component
//   const SeatConfigItem = ({ label, value, onIncrease, onDecrease }) => (
//     <View style={styles.seatConfigRow}>
//       <Text style={styles.seatConfigLabel}>{label}</Text>
//       <View style={styles.seatConfigControls}>
//         <TouchableOpacity
//           style={styles.configButton}
//           onPress={onDecrease}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.configButtonText}>-</Text>
//         </TouchableOpacity>
//         <Text style={styles.seatConfigValue}>{value}</Text>
//         <TouchableOpacity
//           style={styles.configButton}
//           onPress={onIncrease}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.configButtonText}>+</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   // Bus preview component
//   const BusPreview = () => (
//     <View style={styles.busPreview}>
//       <View style={styles.busPreviewContent}>
//         {/* Driver seat */}
//         <View style={styles.driverPreviewRow}>
//           <View style={styles.leftPreviewEmpty} />
//           <View style={styles.previewAisle} />
//           <View style={styles.driverPreviewSeat} />
//         </View>

//         {/* Regular rows preview */}
//         {Array.from({ length: Math.min(rowCount, 8) }, (_, index) => (
//           <View key={index} style={styles.previewSeatRow}>
//             <View style={styles.leftPreviewSeats}>
//               {Array.from({ length: leftSeats }, (_, seatIndex) => (
//                 <View key={seatIndex} style={styles.previewSeat} />
//               ))}
//             </View>
//             <View style={styles.previewAisle} />
//             <View style={styles.rightPreviewSeats}>
//               {Array.from({ length: rightSeats }, (_, seatIndex) => (
//                 <View key={seatIndex} style={styles.previewSeat} />
//               ))}
//             </View>
//           </View>
//         ))}

//         {/* Reserve seats at back */}
//         <View style={styles.reservePreviewRow}>
//           {Array.from({ length: reserveSeatCount }, (_, index) => (
//             <View key={index} style={styles.previewSeat} />
//           ))}
//         </View>

//         {rowCount > 8 && (
//           <Text style={styles.moreRowsText}>... +{rowCount - 8} more rows</Text>
//         )}
//       </View>
//     </View>
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

//         <Text style={styles.headerTitle}>Settings</Text>

//         <TouchableOpacity
//           style={styles.headerButton}
//           onPress={handleMenuPress}
//           activeOpacity={0.7}
//         >
//           <MenuIcon size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       {/* Content */}
//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* Driver Profile Section */}
//         <View style={styles.profileSection}>
//           <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
//             <PlusIcon size={24} color="#4A9BB8" />
//           </TouchableOpacity>
//           <Text style={styles.driverNameText}>{driverName}</Text>
//         </View>

//         {/* Contact Information */}
//         <View style={styles.contactSection}>
//           <View style={styles.contactRow}>
//             <PhoneIcon size={20} color="#4A9BB8" />
//             <TextInput
//               style={styles.contactInput}
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//               placeholder="Phone Number"
//               keyboardType="phone-pad"
//             />
//             <TouchableOpacity activeOpacity={0.7}>
//               <EditIcon size={16} color="#666" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.contactRow}>
//             <EmailIcon size={20} color="#4A9BB8" />
//             <TextInput
//               style={styles.contactInput}
//               value={email}
//               onChangeText={setEmail}
//               placeholder="Email Address"
//               keyboardType="email-address"
//             />
//             <TouchableOpacity activeOpacity={0.7}>
//               <EditIcon size={16} color="#666" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Bus Information */}
//         <View style={styles.formSection}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Bus Name</Text>
//             <TextInput
//               style={styles.textInput}
//               value={busName}
//               onChangeText={setBusName}
//               placeholder="Enter bus name"
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Start Location</Text>
//             <TextInput
//               style={styles.textInput}
//               value={startLocation}
//               onChangeText={setStartLocation}
//               placeholder="Enter start location"
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>End Location</Text>
//             <TextInput
//               style={styles.textInput}
//               value={endLocation}
//               onChangeText={setEndLocation}
//               placeholder="Enter end location"
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Code</Text>
//             <TextInput
//               style={styles.textInput}
//               value={code}
//               onChangeText={setCode}
//               placeholder="Enter code"
//             />
//           </View>
//         </View>

//         {/* Seat Configuration Section */}
//         <View style={styles.seatConfigSection}>
//           <Text style={styles.sectionTitle}>Seat Configuration</Text>

//           <SeatConfigItem
//             label="Left Seats"
//             value={leftSeats}
//             onIncrease={() => setLeftSeats(prev => Math.min(prev + 1, 4))}
//             onDecrease={() => setLeftSeats(prev => Math.max(prev - 1, 1))}
//           />

//           <SeatConfigItem
//             label="Right Seats"
//             value={rightSeats}
//             onIncrease={() => setRightSeats(prev => Math.min(prev + 1, 5))}
//             onDecrease={() => setRightSeats(prev => Math.max(prev - 1, 1))}
//           />

//           <SeatConfigItem
//             label="Row Count"
//             value={rowCount}
//             onIncrease={() => setRowCount(prev => Math.min(prev + 1, 25))}
//             onDecrease={() => setRowCount(prev => Math.max(prev - 1, 5))}
//           />

//           <SeatConfigItem
//             label="Reserve Seat Count"
//             value={reserveSeatCount}
//             onIncrease={() =>
//               setReserveSeatCount(prev => Math.min(prev + 1, 8))
//             }
//             onDecrease={() =>
//               setReserveSeatCount(prev => Math.max(prev - 1, 0))
//             }
//           />
//         </View>

//         {/* Bus Preview */}
//         <View style={styles.previewSection}>
//           <Text style={styles.sectionTitle}>Bus Layout Preview</Text>
//           <BusPreview />
//         </View>
//       </ScrollView>

//       {/* Save Button */}
//       <View style={styles.saveButtonContainer}>
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

//   // Scroll View Styles
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingTop: 20,
//     paddingBottom: 100,
//   },

//   // Profile Section
//   profileSection: {
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 20,
//     alignItems: 'center',
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   addButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   driverNameText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },

//   // Contact Section
//   contactSection: {
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   contactInput: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: '#333',
//   },

//   // Form Section
//   formSection: {
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   inputLabel: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     fontSize: 16,
//     backgroundColor: '#fafafa',
//   },

//   // Seat Configuration Section
//   seatConfigSection: {
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 16,
//   },
//   seatConfigRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   seatConfigLabel: {
//     fontSize: 16,
//     color: '#333',
//     flex: 1,
//   },
//   seatConfigControls: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   configButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#4A9BB8',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   configButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   seatConfigValue: {
//     marginHorizontal: 16,
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     minWidth: 30,
//     textAlign: 'center',
//   },

//   // Bus Preview Section
//   previewSection: {
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   busPreview: {
//     backgroundColor: '#E8E8E8',
//     borderRadius: 12,
//     padding: 16,
//     minHeight: 200,
//   },
//   busPreviewContent: {
//     flex: 1,
//   },
//   driverPreviewRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   leftPreviewEmpty: {
//     flex: 1,
//   },
//   driverPreviewSeat: {
//     width: 20,
//     height: 12,
//     backgroundColor: '#333',
//     borderRadius: 2,
//     flex: 1.5,
//     alignSelf: 'flex-end',
//     marginRight: 8,
//   },
//   previewSeatRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 6,
//   },
//   leftPreviewSeats: {
//     flex: 1,
//     flexDirection: 'row',
//     gap: 3,
//   },
//   rightPreviewSeats: {
//     flex: 1.5,
//     flexDirection: 'row',
//     gap: 3,
//     justifyContent: 'flex-end',
//     paddingRight: 8,
//   },
//   previewAisle: {
//     width: 15,
//   },
//   previewSeat: {
//     width: 16,
//     height: 10,
//     backgroundColor: '#999',
//     borderRadius: 2,
//   },
//   reservePreviewRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 8,
//     paddingHorizontal: 8,
//   },
//   moreRowsText: {
//     textAlign: 'center',
//     color: '#666',
//     fontSize: 12,
//     marginTop: 8,
//   },

//   // Save Button
//   saveButtonContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#f5f5f5',
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     paddingBottom: 16,
//   },
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

//   // Menu Icon
//   menuLine: {
//     width: 18,
//     height: 2,
//     marginVertical: 2,
//     borderRadius: 1,
//   },

//   // Plus Icon
//   plusHorizontal: {
//     position: 'absolute',
//     width: 16,
//     height: 2,
//     borderRadius: 1,
//   },
//   plusVertical: {
//     position: 'absolute',
//     width: 2,
//     height: 16,
//     borderRadius: 1,
//   },

//   // Phone Icon
//   phoneBody: {
//     width: 14,
//     height: 18,
//     borderWidth: 1.5,
//     borderRadius: 3,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   phoneScreen: {
//     width: 8,
//     height: 10,
//     borderRadius: 1,
//   },

//   // Email Icon
//   emailBody: {
//     width: 16,
//     height: 12,
//     borderWidth: 1.5,
//     borderRadius: 2,
//   },
//   emailFlap: {
//     position: 'absolute',
//     top: -1.5,
//     left: -1.5,
//     right: -1.5,
//     height: 0,
//     borderLeftWidth: 8,
//     borderRightWidth: 8,
//     borderBottomWidth: 6,
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//   },

//   // Edit Icon
//   editPencil: {
//     width: 2,
//     height: 12,
//     borderRadius: 1,
//     transform: [{ rotate: '45deg' }],
//   },
//   editTip: {
//     position: 'absolute',
//     top: 2,
//     left: 1,
//     width: 4,
//     height: 4,
//     transform: [{ rotate: '45deg' }],
//   },
// });

// export default SettingsScreen;
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SideMenu from './components/SideMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Local storage functions
async function getStoredSettings() {
  try {
    const settingsData = await AsyncStorage.getItem('busSettings');
    if (settingsData !== null) {
      return JSON.parse(settingsData);
    }
    return null;
  } catch (error) {
    console.log('Error reading settings:', error);
    return null;
  }
}

async function saveSettingsToStorage(settings) {
  try {
    await AsyncStorage.setItem('busSettings', JSON.stringify(settings));
    return true;
  } catch (error) {
    console.log('Error saving settings:', error);
    return false;
  }
}

async function getCurrentUserData() {
  try {
    const userData = await AsyncStorage.getItem('currentUser');
    if (userData !== null) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.log('Error reading user data:', error);
    return null;
  }
}

// connection function (improved)
async function connection(url, method, data = null) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: '',
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    Alert.alert('Success', 'Data saved successfully');
    return result;
  } catch (error) {
    Alert.alert('Error', 'Failed to save data: ' + error.message);
    throw error;
  }
}

// Manual Icons Components (keeping existing ones)
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

const PlusIcon = ({ size = 24, color = '#4A9BB8' }) => (
  <View style={[styles.icon, { width: size, height: size }]}>
    <View style={[styles.plusHorizontal, { backgroundColor: color }]} />
    <View style={[styles.plusVertical, { backgroundColor: color }]} />
  </View>
);

const PhoneIcon = ({ size = 20, color = '#4A9BB8' }) => (
  <View style={[styles.icon, { width: size, height: size }]}>
    <View style={[styles.phoneBody, { borderColor: color }]}>
      <View style={[styles.phoneScreen, { backgroundColor: color }]} />
    </View>
  </View>
);

const EmailIcon = ({ size = 20, color = '#4A9BB8' }) => (
  <View style={[styles.icon, { width: size, height: size }]}>
    <View style={[styles.emailBody, { borderColor: color }]}>
      <View style={[styles.emailFlap, { borderBottomColor: color }]} />
    </View>
  </View>
);

const EditIcon = ({ size = 16, color = '#666' }) => (
  <View style={[styles.icon, { width: size, height: size }]}>
    <View style={[styles.editPencil, { backgroundColor: color }]} />
    <View style={[styles.editTip, { backgroundColor: color }]} />
  </View>
);

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [driverName, setDriverName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [busName, setBusName] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [code, setCode] = useState('');

  // Seat configuration states
  const [leftSeats, setLeftSeats] = useState(2);
  const [rightSeats, setRightSeats] = useState(3);
  const [rowCount, setRowCount] = useState(15);
  const [reserveSeatCount, setReserveSeatCount] = useState(6);

  // Calculated values
  const [totalSeats, setTotalSeats] = useState(0);
  const [busStructure, setBusStructure] = useState([]);

  useEffect(() => {
    loadStoredData();
  }, []);

  useEffect(() => {
    calculateBusStructure();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftSeats, rightSeats, rowCount, reserveSeatCount]);

  const loadStoredData = async () => {
    try {
      setLoading(true);

      // Load stored settings
      const storedSettings = await getStoredSettings();
      const currentUser = await getCurrentUserData();

      if (currentUser) {
        setDriverName(currentUser.name || '');
        setPhoneNumber(currentUser.phone || '');
        setEmail(currentUser.email || '');
      }

      if (storedSettings) {
        setBusName(storedSettings.busName || '');
        setBusNumber(storedSettings.busNumber || '');
        setStartLocation(storedSettings.startLocation || '');
        setEndLocation(storedSettings.endLocation || '');
        setCode(storedSettings.code || '');
        setLeftSeats(storedSettings.seatConfiguration?.leftSeats || 2);
        setRightSeats(storedSettings.seatConfiguration?.rightSeats || 3);
        setRowCount(storedSettings.seatConfiguration?.rowCount || 15);
        setReserveSeatCount(
          storedSettings.seatConfiguration?.reserveSeatCount || 6,
        );
      }
    } catch (error) {
      console.log('Error loading stored data:', error);
      Alert.alert('Error', 'Failed to load stored data');
    } finally {
      setLoading(false);
    }
  };

  const calculateBusStructure = () => {
    const structure = [];
    let seatNumber = 1;

    // Driver seat (doesn't count in total)
    structure.push({
      type: 'driver',
      seats: [{ id: 'driver', number: 'D', isDriver: true }],
    });

    // Regular rows
    for (let row = 1; row <= rowCount; row++) {
      const rowSeats = [];

      // Left side seats
      for (let leftSeat = 0; leftSeat < leftSeats; leftSeat++) {
        rowSeats.push({
          id: `seat-${seatNumber}`,
          number: seatNumber,
          row: row,
          side: 'left',
          position: leftSeat,
          isReserved: false,
          isOccupied: false,
        });
        seatNumber++;
      }

      // Right side seats
      for (let rightSeat = 0; rightSeat < rightSeats; rightSeat++) {
        rowSeats.push({
          id: `seat-${seatNumber}`,
          number: seatNumber,
          row: row,
          side: 'right',
          position: rightSeat,
          isReserved: false,
          isOccupied: false,
        });
        seatNumber++;
      }

      structure.push({
        type: 'regular',
        row: row,
        seats: rowSeats,
      });
    }

    // Reserve seats at back
    if (reserveSeatCount > 0) {
      const reserveSeats = [];
      for (let i = 0; i < reserveSeatCount; i++) {
        reserveSeats.push({
          id: `reserve-${seatNumber}`,
          number: seatNumber,
          row: 'reserve',
          side: 'back',
          position: i,
          isReserved: true,
          isOccupied: false,
        });
        seatNumber++;
      }
      structure.push({
        type: 'reserve',
        seats: reserveSeats,
      });
    }

    setBusStructure(structure);

    // Calculate total seats (excluding driver)
    const total = (leftSeats + rightSeats) * rowCount + reserveSeatCount;
    setTotalSeats(total);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuPress = () => {
    setIsSideMenuVisible(true);
  };

  const handleCloseSideMenu = () => {
    setIsSideMenuVisible(false);
  };

  const handleSave = async () => {
    if (!busName.trim() || !busNumber.trim()) {
      Alert.alert('Validation Error', 'Please fill in Bus Name and Bus Number');
      return;
    }

    const settingsData = {
      driverName,
      phoneNumber,
      email,
      busName: busName.trim(),
      busNumber: busNumber.trim(),
      startLocation: startLocation.trim(),
      endLocation: endLocation.trim(),
      code: code.trim(),
      seatConfiguration: {
        leftSeats,
        rightSeats,
        rowCount,
        reserveSeatCount,
        totalSeats,
      },
      busStructure,
      lastUpdated: new Date().toISOString(),
    };

    try {
      // Save to local storage
      const saved = await saveSettingsToStorage(settingsData);
      if (saved) {
        Alert.alert('Success', 'Settings saved successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
      console.log('Save error:', error);
    }
  };

  // Seat configuration component
  const SeatConfigItem = ({
    label,
    value,
    onIncrease,
    onDecrease,
    min = 0,
    max = 10,
  }) => (
    <View style={styles.seatConfigRow}>
      <Text style={styles.seatConfigLabel}>{label}</Text>
      <View style={styles.seatConfigControls}>
        <TouchableOpacity
          style={[
            styles.configButton,
            value <= min && styles.configButtonDisabled,
          ]}
          onPress={onDecrease}
          activeOpacity={0.7}
          disabled={value <= min}
        >
          <Text
            style={[
              styles.configButtonText,
              value <= min && styles.configButtonTextDisabled,
            ]}
          >
            -
          </Text>
        </TouchableOpacity>
        <Text style={styles.seatConfigValue}>{value}</Text>
        <TouchableOpacity
          style={[
            styles.configButton,
            value >= max && styles.configButtonDisabled,
          ]}
          onPress={onIncrease}
          activeOpacity={0.7}
          disabled={value >= max}
        >
          <Text
            style={[
              styles.configButtonText,
              value >= max && styles.configButtonTextDisabled,
            ]}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Improved Bus preview component
  const BusPreview = () => (
    <View style={styles.busPreview}>
      <View style={styles.busPreviewContent}>
        {/* Driver seat */}
        <View style={styles.driverPreviewRow}>
          <View style={styles.leftPreviewEmpty} />
          <View style={styles.previewAisle} />
          <View style={styles.driverPreviewSeat}>
            <Text style={styles.driverSeatText}>D</Text>
          </View>
        </View>

        {/* Regular rows preview */}
        {Array.from({ length: Math.min(rowCount, 6) }, (_, index) => (
          <View key={index} style={styles.previewSeatRow}>
            <View style={styles.leftPreviewSeats}>
              {Array.from({ length: leftSeats }, (_, seatIndex) => (
                <View key={seatIndex} style={styles.previewSeat}>
                  <Text style={styles.previewSeatText}>
                    {index * (leftSeats + rightSeats) + seatIndex + 1}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.previewAisle} />
            <View style={styles.rightPreviewSeats}>
              {Array.from({ length: rightSeats }, (_, seatIndex) => (
                <View key={seatIndex} style={styles.previewSeat}>
                  <Text style={styles.previewSeatText}>
                    {index * (leftSeats + rightSeats) +
                      leftSeats +
                      seatIndex +
                      1}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Reserve seats at back */}
        {reserveSeatCount > 0 && (
          <View style={styles.reservePreviewRow}>
            {Array.from({ length: reserveSeatCount }, (_, index) => (
              <View
                key={index}
                style={[styles.previewSeat, styles.reserveSeat]}
              >
                <Text style={styles.previewSeatText}>R{index + 1}</Text>
              </View>
            ))}
          </View>
        )}

        {rowCount > 6 && (
          <Text style={styles.moreRowsText}>... +{rowCount - 6} more rows</Text>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#4A9BB8" barStyle="light-content" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading settings...</Text>
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

        <Text style={styles.headerTitle}>Bus Settings</Text>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleMenuPress}
          activeOpacity={0.7}
        >
          <MenuIcon size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Driver Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
            <PlusIcon size={24} color="#4A9BB8" />
          </TouchableOpacity>
          <Text style={styles.driverNameText}>
            {driverName || 'Driver Name'}
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <View style={styles.contactRow}>
            <PhoneIcon size={20} color="#4A9BB8" />
            <TextInput
              style={styles.contactInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
            <TouchableOpacity activeOpacity={0.7}>
              <EditIcon size={16} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.contactRow}>
            <EmailIcon size={20} color="#4A9BB8" />
            <TextInput
              style={styles.contactInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Email Address"
              keyboardType="email-address"
            />
            <TouchableOpacity activeOpacity={0.7}>
              <EditIcon size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bus Information */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Bus Name</Text>
            <TextInput
              style={styles.textInput}
              value={busName}
              onChangeText={setBusName}
              placeholder="Enter bus name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Bus Number</Text>
            <TextInput
              style={styles.textInput}
              value={busNumber}
              onChangeText={setBusNumber}
              placeholder="Enter bus number (e.g., ACD-01-DB)"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Start Location</Text>
            <TextInput
              style={styles.textInput}
              value={startLocation}
              onChangeText={setStartLocation}
              placeholder="Enter start location"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>End Location</Text>
            <TextInput
              style={styles.textInput}
              value={endLocation}
              onChangeText={setEndLocation}
              placeholder="Enter end location"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Route Code</Text>
            <TextInput
              style={styles.textInput}
              value={code}
              onChangeText={setCode}
              placeholder="Enter route code"
            />
          </View>
        </View>

        {/* Seat Configuration Section */}
        <View style={styles.seatConfigSection}>
          <Text style={styles.sectionTitle}>Seat Configuration</Text>

          <SeatConfigItem
            label="Left Side Seats"
            value={leftSeats}
            onIncrease={() => setLeftSeats(prev => prev + 1)}
            onDecrease={() => setLeftSeats(prev => prev - 1)}
            min={1}
            max={4}
          />

          <SeatConfigItem
            label="Right Side Seats"
            value={rightSeats}
            onIncrease={() => setRightSeats(prev => prev + 1)}
            onDecrease={() => setRightSeats(prev => prev - 1)}
            min={1}
            max={5}
          />

          <SeatConfigItem
            label="Number of Rows"
            value={rowCount}
            onIncrease={() => setRowCount(prev => prev + 1)}
            onDecrease={() => setRowCount(prev => prev - 1)}
            min={5}
            max={25}
          />

          <SeatConfigItem
            label="Reserve Seats (Back)"
            value={reserveSeatCount}
            onIncrease={() => setReserveSeatCount(prev => prev + 1)}
            onDecrease={() => setReserveSeatCount(prev => prev - 1)}
            min={0}
            max={8}
          />

          {/* Seat Summary */}
          <View style={styles.seatSummary}>
            <Text style={styles.seatSummaryTitle}>Seat Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Regular Seats:</Text>
              <Text style={styles.summaryValue}>
                {(leftSeats + rightSeats) * rowCount}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Reserve Seats:</Text>
              <Text style={styles.summaryValue}>{reserveSeatCount}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.summaryLabelTotal}>Total Seats:</Text>
              <Text style={styles.summaryValueTotal}>{totalSeats}</Text>
            </View>
          </View>
        </View>

        {/* Bus Preview */}
        <View style={styles.previewSection}>
          <Text style={styles.sectionTitle}>Bus Layout Preview</Text>
          <BusPreview />
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save Configuration</Text>
        </TouchableOpacity>
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
  },
  loadingText: {
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
  headerButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'left',
    marginLeft: 16,
  },

  // Scroll View Styles
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100,
  },

  // Profile Section
  profileSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverNameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },

  // Contact Section
  contactSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },

  // Form Section
  formSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },

  // Seat Configuration Section
  seatConfigSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  seatConfigRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  seatConfigLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  seatConfigControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  configButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A9BB8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  configButtonDisabled: {
    backgroundColor: '#ccc',
  },
  configButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  configButtonTextDisabled: {
    color: '#999',
  },
  seatConfigValue: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
  },

  // Seat Summary
  seatSummary: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  seatSummaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  summaryLabelTotal: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  summaryValueTotal: {
    fontSize: 16,
    color: '#4A9BB8',
    fontWeight: '700',
  },

  // Bus Preview Section
  previewSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  busPreview: {
    backgroundColor: '#E8E8E8',
    borderRadius: 12,
    padding: 16,
    minHeight: 200,
  },
  busPreviewContent: {
    flex: 1,
  },
  driverPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  leftPreviewEmpty: {
    flex: 1,
  },
  driverPreviewSeat: {
    width: 24,
    height: 16,
    backgroundColor: '#333',
    borderRadius: 4,
    flex: 1.5,
    alignSelf: 'flex-end',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverSeatText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
  previewSeatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  leftPreviewSeats: {
    flex: 1,
    flexDirection: 'row',
    gap: 3,
  },
  rightPreviewSeats: {
    flex: 1.5,
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'flex-end',
    paddingRight: 8,
  },
  previewAisle: {
    width: 15,
  },
  previewSeat: {
    width: 18,
    height: 14,
    backgroundColor: '#4A9BB8',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reserveSeat: {
    backgroundColor: '#FF6B6B',
  },
  previewSeatText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
  reservePreviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  moreRowsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 8,
  },

  // Save Button
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  saveButton: {
    backgroundColor: '#4A9BB8',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
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

  // Menu Icon
  menuLine: {
    width: 18,
    height: 2,
    marginVertical: 2,
    borderRadius: 1,
  },

  // Plus Icon
  plusHorizontal: {
    position: 'absolute',
    width: 16,
    height: 2,
    borderRadius: 1,
  },
  plusVertical: {
    position: 'absolute',
    width: 2,
    height: 16,
    borderRadius: 1,
  },

  // Phone Icon
  phoneBody: {
    width: 14,
    height: 18,
    borderWidth: 1.5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneScreen: {
    width: 8,
    height: 10,
    borderRadius: 1,
  },

  // Email Icon
  emailBody: {
    width: 16,
    height: 12,
    borderWidth: 1.5,
    borderRadius: 2,
  },
  emailFlap: {
    position: 'absolute',
    top: -1.5,
    left: -1.5,
    right: -1.5,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },

  // Edit Icon
  editPencil: {
    width: 2,
    height: 12,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  editTip: {
    position: 'absolute',
    top: 2,
    left: 1,
    width: 4,
    height: 4,
    transform: [{ rotate: '45deg' }],
  },
});

export default SettingsScreen;
