// import React from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   FlatList,
// } from 'react-native';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// export default function BusScheduleScreen({ navigation, route }) {
//   // Get bus information from route params with defaults
//   const busInfo = route?.params || {
//     busId: 'ACD-01-DB',
//     busNumber: 'ACD-01-DB',
//   };

//   const handleBackClick = () => {
//     navigation.goBack();
//   };

//   const handleBookPress = () => {
//     navigation.navigate('BookingDate');
//   };

//   const daily = [
//     {
//       id: 'galle-makubura',
//       start: 'Galle',
//       end: 'Makubura',
//       schedules: [
//         { id: 'morning', startTime: '06:00', endTime: '08:30' },
//         { id: 'afternoon', startTime: '12:00', endTime: '14:30' },
//       ],
//     },
//     {
//       id: 'makubura-galle',
//       start: 'Makubura',
//       end: 'Galle',
//       schedules: [
//         { id: 'morning', startTime: '09:00', endTime: '11:30' },
//         { id: 'afternoon', startTime: '15:00', endTime: '17:30' },
//       ],
//     },
//   ];

//   const renderRoute = ({ item }) => (
//     <View style={styles.routeContainer}>
//       <Text style={styles.routeTitle}>
//         {item.start} → {item.end}
//       </Text>

//       {item.schedules.map(schedule => (
//         <TouchableOpacity
//           key={schedule.id}
//           style={styles.scheduleCard}
//           onPress={handleBookPress}
//         >
//           <View style={styles.scheduleTimes}>
//             <Text style={styles.timeText}>
//               <Icon name="arrow-up" size={14} color="#22D3EE" /> Depart:{' '}
//               {schedule.startTime}
//             </Text>
//             <Text style={styles.timeText}>
//               <Icon name="arrow-down" size={14} color="#22D3EE" /> Arrive:{' '}
//               {schedule.endTime}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleBackClick} style={styles.backButton}>
//           <Icon name="arrow-left" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{busInfo.busNumber}</Text>
//         <View style={styles.backButton} />
//       </View>

//       {/* Content */}
//       <ScrollView style={styles.content}>
//         {/* Bus Info Card */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Bus:</Text>
//             <Text style={styles.infoValue}>{busInfo.busNumber}</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Contact:</Text>
//             <View style={styles.contactContainer}>
//               <Text style={styles.infoValue}>070 435 3463</Text>
//               <Text style={styles.flag}>🇱🇰</Text>
//             </View>
//           </View>
//         </View>

//         {/* Schedule List */}
//         <FlatList
//           data={daily}
//           renderItem={renderRoute}
//           keyExtractor={item => item.id}
//           scrollEnabled={false}
//           contentContainerStyle={styles.scheduleList}
//         />

//         {/* Remaining Seats */}
//         <View style={styles.seatsContainer}>
//           <Text style={styles.seatsText}>Remaining Seats: 10</Text>
//         </View>
//       </ScrollView>

//       {/* Fixed Book Button */}
//       <TouchableOpacity style={styles.bookButton} onPress={handleBookPress}>
//         <Text style={styles.bookButtonText}>Book Now</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   header: {
//     backgroundColor: '#22D3EE',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//   },
//   backButton: {
//     width: 40,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     color: '#FFFFFF',
//     fontSize: 20,
//     fontWeight: '600',
//     flex: 1,
//     textAlign: 'center',
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   infoCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 25,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   infoLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#2C5F7C',
//     width: 80,
//   },
//   infoValue: {
//     fontSize: 16,
//     color: '#2C5F7C',
//     fontWeight: '500',
//   },
//   contactContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   flag: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   scheduleList: {
//     paddingBottom: 20,
//   },
//   routeContainer: {
//     marginBottom: 25,
//   },
//   routeTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#2C5F7C',
//     marginBottom: 15,
//   },
//   scheduleCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   scheduleTimes: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   timeText: {
//     fontSize: 16,
//     color: '#374151',
//   },
//   seatsContainer: {
//     marginVertical: 20,
//     alignItems: 'center',
//   },
//   seatsText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#2C5F7C',
//   },
//   bookButton: {
//     backgroundColor: '#374151',
//     padding: 18,
//     marginHorizontal: 20,
//     marginBottom: 20,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   bookButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// import React from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   FlatList,
//   StatusBar,
// } from 'react-native';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// export default function BusScheduleScreen({ navigation, route }) {
//   const busInfo = route?.params || {
//     busId: 'ACD-01-DB',
//     busNumber: 'ACD-01-DB',
//   };

//   const handleBackClick = () => {
//     navigation.goBack();
//   };

//   const handleBookPress = () => {
//     navigation.navigate('BookingDate');
//   };

//   const daily = [
//     {
//       id: 'galle-makubura',
//       start: 'Galle',
//       end: 'Makubura',
//       schedules: [
//         {
//           id: 'morning',
//           startTime: '06:00',
//           endTime: '08:30',
//           type: 'Morning',
//         },
//         {
//           id: 'afternoon',
//           startTime: '12:00',
//           endTime: '14:30',
//           type: 'Afternoon',
//         },
//       ],
//     },
//     {
//       id: 'makubura-galle',
//       start: 'Makubura',
//       end: 'Galle',
//       schedules: [
//         {
//           id: 'morning',
//           startTime: '09:00',
//           endTime: '11:30',
//           type: 'Morning',
//         },
//         {
//           id: 'afternoon',
//           startTime: '15:00',
//           endTime: '17:30',
//           type: 'Afternoon',
//         },
//       ],
//     },
//   ];
//   async function routeData(routeData) {
//     try {
//       await AsyncStorage.setItem('selectedRoute', JSON.stringify(routeData));
//       console.log('Route saved locally!');
//     } catch (error) {
//       console.log('Error saving route:', error);
//     }
//   }
//   const renderRoute = ({ item }) => (
//     <View style={styles.routeContainer}>
//       <View style={styles.routeHeader}>
//         <View style={styles.routeCircle}>
//           <Icon name="map-marker" size={16} color="#FFFFFF" />
//         </View>
//         <View style={styles.routeLine} />
//         <View style={styles.routeCircle}>
//           <Icon name="map-marker" size={16} color="#FFFFFF" />
//         </View>
//       </View>

//       <View style={styles.routeTitleContainer}>
//         <Text style={styles.routeTitle}>{item.start}</Text>
//         <Icon
//           name="arrow-right"
//           size={18}
//           color="#6366F1"
//           style={styles.arrowIcon}
//         />
//         <Text style={styles.routeTitle}>{item.end}</Text>
//       </View>

//       <View style={styles.schedulesContainer}>
//         {item.schedules.map(schedule => (
//           <TouchableOpacity
//             key={schedule.id}
//             style={styles.scheduleCard}
//             onPress={() => navigation.navigate('BoockingDate')}
//             activeOpacity={0.8}
//           >
//             {routeData(schedule.startTime)}
//             <View style={styles.scheduleHeader}>
//               <View style={styles.scheduleTypeContainer}>
//                 <Icon
//                   name={schedule.type === 'Morning' ? 'sun-o' : 'moon-o'}
//                   size={16}
//                   color="#6366F1"
//                 />
//                 <Text style={styles.scheduleType}>{schedule.type}</Text>
//               </View>
//               <View style={styles.durationContainer}>
//                 <Icon name="clock-o" size={12} color="#64748B" />
//                 <Text style={styles.duration}>2h 30m</Text>
//               </View>
//             </View>

//             <View style={styles.timeContainer}>
//               <View style={styles.timeSection}>
//                 <Text style={styles.timeLabel}>Departure</Text>
//                 <Text style={styles.timeValue}>{schedule.startTime}</Text>
//               </View>

//               <View style={styles.journeyLine}>
//                 <View style={styles.journeyDot} />
//                 <View style={styles.journeyTrack} />
//                 <View style={styles.journeyDot} />
//               </View>

//               <View style={styles.timeSection}>
//                 <Text style={styles.timeLabel}>Arrival</Text>
//                 <Text style={styles.timeValue}>{schedule.endTime}</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#4F46E5" barStyle="light-content" />

//       {/* Enhanced Header with Gradient */}
//       <LinearGradient
//         colors={['#4F46E5', '#6366F1', '#8B5CF6']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.header}
//       >
//         <TouchableOpacity onPress={handleBackClick} style={styles.backButton}>
//           <View style={styles.backButtonCircle}>
//             <Icon name="arrow-left" size={20} color="#4F46E5" />
//           </View>
//         </TouchableOpacity>

//         <View style={styles.headerContent}>
//           <Text style={styles.headerTitle}>{busInfo.busNumber}</Text>
//           <Text style={styles.headerSubtitle}>Bus Schedule</Text>
//         </View>

//         <TouchableOpacity style={styles.menuButton}>
//           <Icon name="ellipsis-v" size={18} color="#FFFFFF" />
//         </TouchableOpacity>
//       </LinearGradient>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Enhanced Bus Info Card */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoHeader}>
//             <View style={styles.busIconContainer}>
//               <Icon name="bus" size={24} color="#6366F1" />
//             </View>
//             <Text style={styles.infoCardTitle}>Bus Information</Text>
//           </View>

//           <View style={styles.infoContent}>
//             <View style={styles.infoRow}>
//               <View style={styles.infoIconContainer}>
//                 <Icon name="id-card-o" size={16} color="#64748B" />
//               </View>
//               <View style={styles.infoTextContainer}>
//                 <Text style={styles.infoLabel}>Bus Number</Text>
//                 <Text style={styles.infoValue}>{busInfo.busNumber}</Text>
//               </View>
//             </View>

//             <View style={styles.separator} />

//             <View style={styles.infoRow}>
//               <View style={styles.infoIconContainer}>
//                 <Icon name="phone" size={16} color="#64748B" />
//               </View>
//               <View style={styles.infoTextContainer}>
//                 <Text style={styles.infoLabel}>Contact Number</Text>
//                 <View style={styles.contactRow}>
//                   <Text style={styles.infoValue}>070 435 3463</Text>
//                   <Text style={styles.flag}>🇱🇰</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Routes Section */}
//         <View style={styles.routesSection}>
//           <Text style={styles.sectionTitle}>Available Routes</Text>
//           <FlatList
//             data={daily}
//             renderItem={renderRoute}
//             keyExtractor={item => item.id}
//             scrollEnabled={false}
//             showsVerticalScrollIndicator={false}
//           />
//         </View>

//         {/* Enhanced Seats Info */}
//         <View style={styles.seatsCard}>
//           <View style={styles.seatsHeader}>
//             <Icon name="users" size={20} color="#10B981" />
//             <Text style={styles.seatsTitle}>Seat Availability</Text>
//           </View>
//           <View style={styles.seatsContent}>
//             <Text style={styles.availableSeats}>10</Text>
//             <Text style={styles.seatsLabel}>seats remaining</Text>
//           </View>
//           <View style={styles.seatsProgress}>
//             <View style={styles.seatsProgressFilled} />
//           </View>
//         </View>

//         <View style={styles.bottomSpacing} />
//       </ScrollView>

//       {/* Enhanced Book Button */}
//       <View style={styles.bookButtonContainer}>
//         <TouchableOpacity
//           style={styles.bookButton}
//           // onPress={handleBookPress}
//           onPress={() => navigation.navigate('BoockingDate')}
//           activeOpacity={0.9}
//         >
//           <LinearGradient
//             colors={['#4F46E5', '#6366F1']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.bookButtonGradient}
//           >
//             <Icon name="calendar-check-o" size={20} color="#FFFFFF" />
//             <Text style={styles.bookButtonText}>Book Your Seat</Text>
//             <Icon name="arrow-right" size={16} color="#FFFFFF" />
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingBottom: 25,
//     paddingHorizontal: 20,
//     shadowColor: '#4F46E5',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   backButton: {
//     marginRight: 15,
//   },
//   backButtonCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   headerContent: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     color: '#FFFFFF',
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 2,
//   },
//   headerSubtitle: {
//     color: '#E0E7FF',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   menuButton: {
//     width: 40,
//     alignItems: 'center',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   infoCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     marginTop: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 4,
//   },
//   infoHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     paddingBottom: 15,
//   },
//   busIconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#EEF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   infoCardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1E293B',
//   },
//   infoContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   infoIconContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#F1F5F9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   infoTextContainer: {
//     flex: 1,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginBottom: 2,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   infoValue: {
//     fontSize: 16,
//     color: '#1E293B',
//     fontWeight: '600',
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   flag: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#F1F5F9',
//     marginVertical: 8,
//   },
//   routesSection: {
//     marginTop: 30,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 20,
//   },
//   routeContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   routeHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   routeCircle: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#6366F1',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   routeLine: {
//     flex: 1,
//     height: 2,
//     backgroundColor: '#E2E8F0',
//     marginHorizontal: 10,
//   },
//   routeTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   routeTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1E293B',
//   },
//   arrowIcon: {
//     marginHorizontal: 12,
//   },
//   schedulesContainer: {
//     gap: 12,
//   },
//   scheduleCard: {
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//   },
//   scheduleHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   scheduleTypeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   scheduleType: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#6366F1',
//     marginLeft: 6,
//   },
//   durationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   duration: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginLeft: 4,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   timeSection: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   timeLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   timeValue: {
//     fontSize: 18,
//     color: '#1E293B',
//     fontWeight: '700',
//   },
//   journeyLine: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 2,
//     paddingHorizontal: 20,
//   },
//   journeyDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#6366F1',
//   },
//   journeyTrack: {
//     flex: 1,
//     height: 2,
//     backgroundColor: '#CBD5E1',
//     marginHorizontal: 8,
//   },
//   seatsCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     marginTop: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   seatsHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   seatsTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginLeft: 10,
//   },
//   seatsContent: {
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   availableSeats: {
//     fontSize: 32,
//     fontWeight: '800',
//     color: '#10B981',
//     marginBottom: 4,
//   },
//   seatsLabel: {
//     fontSize: 14,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   seatsProgress: {
//     height: 6,
//     backgroundColor: '#E2E8F0',
//     borderRadius: 3,
//     overflow: 'hidden',
//   },
//   seatsProgressFilled: {
//     height: '100%',
//     width: '33%',
//     backgroundColor: '#10B981',
//     borderRadius: 3,
//   },
//   bottomSpacing: {
//     height: 100,
//   },
//   bookButtonContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   bookButton: {
//     borderRadius: 16,
//     overflow: 'hidden',
//   },
//   bookButtonGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 18,
//     paddingHorizontal: 24,
//   },
//   bookButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '700',
//     marginHorizontal: 12,
//   },
// });

// import React, { useState, useEffect } from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFS from 'react-native-fs';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   FlatList,
//   StatusBar,
//   Alert,
// } from 'react-native';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// export default function BusScheduleScreen({ navigation, route }) {
//   const [savedBookings, setSavedBookings] = useState([]);

//   const busInfo = route?.params || {
//     busId: 'ACD-01-DB',
//     busNumber: 'ACD-01-DB',
//   };

//   useEffect(() => {
//     loadSavedBookings();
//     const unsubscribe = navigation.addListener('focus', () => {
//       loadSavedBookings();
//     });
//     return unsubscribe;
//   }, [navigation]);

//   const loadSavedBookings = async () => {
//     try {
//       const bookings = await AsyncStorage.getItem('allBookings');
//       if (bookings) {
//         setSavedBookings(JSON.parse(bookings));
//       }
//     } catch (error) {
//       console.log('Error loading bookings:', error);
//     }
//   };

//   const handleBackClick = () => {
//     navigation.goBack();
//   };

//   const daily = [
//     {
//       id: 'galle-makubura',
//       start: 'Galle',
//       end: 'Makubura',
//       schedules: [
//         {
//           id: 'morning',
//           startTime: '06:00',
//           endTime: '08:30',
//           type: 'Morning',
//         },
//         {
//           id: 'afternoon',
//           startTime: '12:00',
//           endTime: '14:30',
//           type: 'Afternoon',
//         },
//       ],
//     },
//     {
//       id: 'makubura-galle',
//       start: 'Makubura',
//       end: 'Galle',
//       schedules: [
//         {
//           id: 'morning',
//           startTime: '09:00',
//           endTime: '11:30',
//           type: 'Morning',
//         },
//         {
//           id: 'afternoon',
//           startTime: '15:00',
//           endTime: '17:30',
//           type: 'Afternoon',
//         },
//       ],
//     },
//   ];

//   const storeScheduleData = async scheduleData => {
//     try {
//       await AsyncStorage.setItem(
//         'selectedSchedule',
//         JSON.stringify(scheduleData),
//       );
//       console.log('Schedule saved locally!');
//     } catch (error) {
//       console.log('Error saving schedule:', error);
//     }
//   };

//   const deleteBooking = async bookingId => {
//     try {
//       const updatedBookings = savedBookings.filter(
//         booking => booking.id !== bookingId,
//       );
//       await AsyncStorage.setItem(
//         'allBookings',
//         JSON.stringify(updatedBookings),
//       );
//       setSavedBookings(updatedBookings);
//       Alert.alert('Success', 'Booking deleted successfully!');
//     } catch (error) {
//       console.log('Error deleting booking:', error);
//     }
//   };

//   const renderBookingCard = ({ item }) => (
//     <View style={styles.bookingCard}>
//       <View style={styles.bookingHeader}>
//         <View style={styles.bookingRoute}>
//           <Text style={styles.bookingRouteText}>{item.route}</Text>
//           <Text style={styles.bookingScheduleText}>{item.schedule}</Text>
//         </View>
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={() => {
//             Alert.alert(
//               'Delete Booking',
//               'Are you sure you want to delete this booking?',
//               [
//                 { text: 'Cancel', style: 'cancel' },
//                 {
//                   text: 'Delete',
//                   style: 'destructive',
//                   onPress: () => deleteBooking(item.id),
//                 },
//               ],
//             );
//           }}
//         >
//           <Icon name="trash" size={14} color="#FF6B6B" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.datesScroll}
//       >
//         {item.dates.map((dateItem, index) => (
//           <View key={index} style={styles.dateBookingCard}>
//             <Text style={styles.dateText}>{dateItem.date}</Text>
//             <Text style={styles.seatText}>Seat: {dateItem.seat}</Text>
//           </View>
//         ))}
//       </ScrollView>

//       <View style={styles.bookingFooter}>
//         <Text style={styles.totalDatesText}>
//           {item.dates.length} dates booked
//         </Text>
//         <Text style={styles.bookingTimeText}>Booked: {item.bookingTime}</Text>
//       </View>
//     </View>
//   );

//   const renderRoute = ({ item }) => (
//     <View style={styles.routeContainer}>
//       {/* <View style={styles.routeHeader}>
//         <View style={styles.routeCircle}>
//           <Icon name="map-marker" size={16} color="#FFFFFF" />
//         </View>
//         <View style={styles.routeLine} />
//         <View style={styles.routeCircle}>
//           <Icon name="map-marker" size={16} color="#FFFFFF" />
//         </View>
//       </View> */}

//       <View style={styles.routeTitleContainer}>
//         <Text style={styles.routeTitle}>{item.start}</Text>
//         <Icon
//           name="arrow-right"
//           size={18}
//           color="#6366F1"
//           style={styles.arrowIcon}
//         />
//         <Text style={styles.routeTitle}>{item.end}</Text>
//       </View>

//       <View style={styles.schedulesContainer}>
//         {item.schedules.map(schedule => (
//           <TouchableOpacity
//             key={schedule.id}
//             style={styles.scheduleCard}
//             onPress={async () => {
//               const scheduleData = {
//                 ...schedule,
//                 route: `${item.start} → ${item.end}`,
//                 busNumber: busInfo.busNumber,
//               };
//               await storeScheduleData(scheduleData);
//               navigation.navigate('BoockingDate');
//             }}
//             activeOpacity={0.8}
//           >
//             <View style={styles.scheduleHeader}>
//               <View style={styles.scheduleTypeContainer}>
//                 <Icon
//                   name={schedule.type === 'Morning' ? 'sun-o' : 'moon-o'}
//                   size={16}
//                   color="#6366F1"
//                 />
//                 <Text style={styles.scheduleType}>{schedule.type}</Text>
//               </View>
//               <View style={styles.durationContainer}>
//                 <Icon name="clock-o" size={12} color="#64748B" />
//                 <Text style={styles.duration}>2h 30m</Text>
//               </View>
//             </View>

//             <View style={styles.timeContainer}>
//               <View style={styles.timeSection}>
//                 <Text style={styles.timeLabel}>Departure</Text>
//                 <Text style={styles.timeValue}>{schedule.startTime}</Text>
//               </View>

//               <View style={styles.journeyLine}>
//                 <View style={styles.journeyDot} />
//                 <View style={styles.journeyTrack} />
//                 <View style={styles.journeyDot} />
//               </View>

//               <View style={styles.timeSection}>
//                 <Text style={styles.timeLabel}>Arrival</Text>
//                 <Text style={styles.timeValue}>{schedule.endTime}</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#4F46E5" barStyle="light-content" />

//       {/* Enhanced Header with Gradient */}
//       <LinearGradient
//         colors={['#4F46E5', '#6366F1', '#8B5CF6']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.header}
//       >
//         <TouchableOpacity onPress={handleBackClick} style={styles.backButton}>
//           <View style={styles.backButtonCircle}>
//             <Icon name="arrow-left" size={20} color="#4F46E5" />
//           </View>
//         </TouchableOpacity>

//         <View style={styles.headerContent}>
//           <Text style={styles.headerTitle}>{busInfo.busNumber}</Text>
//           <Text style={styles.headerSubtitle}>Bus Schedule</Text>
//         </View>

//         <TouchableOpacity style={styles.menuButton}>
//           <Icon name="ellipsis-v" size={18} color="#FFFFFF" />
//         </TouchableOpacity>
//       </LinearGradient>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Enhanced Bus Info Card */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoHeader}>
//             <View style={styles.busIconContainer}>
//               <Icon name="bus" size={24} color="#6366F1" />
//             </View>
//             <Text style={styles.infoCardTitle}>Bus Information</Text>
//           </View>

//           <View style={styles.infoContent}>
//             <View style={styles.infoRow}>
//               <View style={styles.infoIconContainer}>
//                 <Icon name="id-card-o" size={16} color="#64748B" />
//               </View>
//               <View style={styles.infoTextContainer}>
//                 <Text style={styles.infoLabel}>Bus Number</Text>
//                 <Text style={styles.infoValue}>{busInfo.busNumber}</Text>
//               </View>
//             </View>

//             <View style={styles.separator} />

//             <View style={styles.infoRow}>
//               <View style={styles.infoIconContainer}>
//                 <Icon name="phone" size={16} color="#64748B" />
//               </View>
//               <View style={styles.infoTextContainer}>
//                 <Text style={styles.infoLabel}>Contact Number</Text>
//                 <View style={styles.contactRow}>
//                   <Text style={styles.infoValue}>070 435 3463</Text>
//                   <Text style={styles.flag}>🇱🇰</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Routes Section */}
//         <View style={styles.routesSection}>
//           <Text style={styles.sectionTitle}>Available Routes</Text>
//           <FlatList
//             data={daily}
//             renderItem={renderRoute}
//             keyExtractor={item => item.id}
//             scrollEnabled={false}
//             showsVerticalScrollIndicator={false}
//           />
//         </View>

//         {/* My Bookings Section */}
//         {savedBookings.length > 0 && (
//           <View style={styles.bookingsSection}>
//             <Text style={styles.sectionTitle}>My Bookings</Text>
//             <FlatList
//               data={savedBookings}
//               renderItem={renderBookingCard}
//               keyExtractor={item => item.id}
//               scrollEnabled={false}
//               showsVerticalScrollIndicator={false}
//             />
//           </View>
//         )}

//         {/* Enhanced Seats Info */}
//         <View style={styles.seatsCard}>
//           <View style={styles.seatsHeader}>
//             <Icon name="users" size={20} color="#10B981" />
//             <Text style={styles.seatsTitle}>Seat Availability</Text>
//           </View>
//           <View style={styles.seatsContent}>
//             <Text style={styles.availableSeats}>10</Text>
//             <Text style={styles.seatsLabel}>seats remaining</Text>
//           </View>
//           <View style={styles.seatsProgress}>
//             <View style={styles.seatsProgressFilled} />
//           </View>
//         </View>

//         <View style={styles.bottomSpacing} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingBottom: 25,
//     paddingHorizontal: 20,
//     shadowColor: '#4F46E5',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   backButton: {
//     marginRight: 15,
//   },
//   backButtonCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   headerContent: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     color: '#FFFFFF',
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 2,
//   },
//   headerSubtitle: {
//     color: '#E0E7FF',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   menuButton: {
//     width: 40,
//     alignItems: 'center',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   infoCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     marginTop: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 4,
//   },
//   infoHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     paddingBottom: 15,
//   },
//   busIconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#EEF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   infoCardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1E293B',
//   },
//   infoContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   infoIconContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#F1F5F9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   infoTextContainer: {
//     flex: 1,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginBottom: 2,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   infoValue: {
//     fontSize: 16,
//     color: '#1E293B',
//     fontWeight: '600',
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   flag: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#F1F5F9',
//     marginVertical: 8,
//   },
//   routesSection: {
//     marginTop: 30,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 20,
//   },
//   routeContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   routeHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   routeCircle: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#6366F1',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   routeLine: {
//     flex: 1,
//     height: 2,
//     backgroundColor: '#E2E8F0',
//     marginHorizontal: 10,
//   },
//   routeTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   routeTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1E293B',
//   },
//   arrowIcon: {
//     marginHorizontal: 12,
//   },
//   schedulesContainer: {
//     gap: 12,
//   },
//   scheduleCard: {
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//   },
//   scheduleHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   scheduleTypeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   scheduleType: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#6366F1',
//     marginLeft: 6,
//   },
//   durationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   duration: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginLeft: 4,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   timeSection: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   timeLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   timeValue: {
//     fontSize: 18,
//     color: '#1E293B',
//     fontWeight: '700',
//   },
//   journeyLine: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 2,
//     paddingHorizontal: 20,
//   },
//   journeyDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#6366F1',
//   },
//   journeyTrack: {
//     flex: 1,
//     height: 2,
//     backgroundColor: '#CBD5E1',
//     marginHorizontal: 8,
//   },
//   bookingsSection: {
//     marginTop: 30,
//   },
//   bookingCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 3,
//     borderLeftWidth: 4,
//     borderLeftColor: '#10B981',
//   },
//   bookingHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   bookingRoute: {
//     flex: 1,
//   },
//   bookingRouteText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1E293B',
//   },
//   bookingScheduleText: {
//     fontSize: 14,
//     color: '#64748B',
//     marginTop: 2,
//   },
//   deleteButton: {
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: '#FEE2E2',
//   },
//   datesScroll: {
//     marginBottom: 12,
//   },
//   dateBookingCard: {
//     backgroundColor: '#F0FDF4',
//     borderRadius: 8,
//     padding: 12,
//     marginRight: 8,
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   dateText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#15803D',
//   },
//   seatText: {
//     fontSize: 12,
//     color: '#166534',
//     marginTop: 2,
//   },
//   bookingFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 8,
//     borderTopWidth: 1,
//     borderTopColor: '#F1F5F9',
//   },
//   totalDatesText: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   bookingTimeText: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   seatsCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     marginTop: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   seatsHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   seatsTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginLeft: 10,
//   },
//   seatsContent: {
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   availableSeats: {
//     fontSize: 32,
//     fontWeight: '800',
//     color: '#10B981',
//     marginBottom: 4,
//   },
//   seatsLabel: {
//     fontSize: 14,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   seatsProgress: {
//     height: 6,
//     backgroundColor: '#E2E8F0',
//     borderRadius: 3,
//     overflow: 'hidden',
//   },
//   seatsProgressFilled: {
//     height: '100%',
//     width: '33%',
//     backgroundColor: '#10B981',
//     borderRadius: 3,
//   },
//   bottomSpacing: {
//     height: 100,
//   },
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect, useCallback } from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFS from 'react-native-fs';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   FlatList,
//   StatusBar,
//   Alert,
//   Animated,
//   RefreshControl,
// } from 'react-native';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// export default function BusScheduleScreen({ navigation, route }) {
//   const [savedBookings, setSavedBookings] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [fadeAnim] = useState(new Animated.Value(0));

//   const busInfo = route?.params || {
//     busId: 'ACD-01-DB',
//     busNumber: 'ACD-01-DB',
//   };

//   const animateIn = useCallback(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   useEffect(() => {
//     loadSavedBookings();
//     animateIn();
//     const unsubscribe = navigation.addListener('focus', () => {
//       loadSavedBookings();
//     });
//     return unsubscribe;
//   }, [navigation, animateIn]);

//   const loadSavedBookings = async () => {
//     try {
//       const bookings = await AsyncStorage.getItem('busBookings'); // busBookings
//       if (bookings) {
//         setSavedBookings(JSON.parse(bookings));
//       }
//     } catch (error) {
//       console.log('Error loading bookings:', error);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadSavedBookings();
//     setRefreshing(false);
//   }, []);

//   const handleBackClick = () => {
//     navigation.goBack();
//   };

//   const daily = [
//     {
//       id: 'galle-makubura',
//       start: 'Galle',
//       end: 'Makubura',
//       schedules: [
//         {
//           id: 'morning',
//           startTime: '06:00',
//           endTime: '08:30',
//           type: 'Morning',
//           busInfo: { number: busInfo.busNumber, capacity: 40 },
//         },
//         {
//           id: 'afternoon',
//           startTime: '12:00',
//           endTime: '14:30',
//           type: 'Afternoon',
//           busInfo: { number: busInfo.busNumber, capacity: 40 },
//         },
//       ],
//     },
//     {
//       id: 'makubura-galle',
//       start: 'Makubura',
//       end: 'Galle',
//       schedules: [
//         {
//           id: 'morning',
//           startTime: '09:00',
//           endTime: '11:30',
//           type: 'Morning',
//           busInfo: { number: busInfo.busNumber, capacity: 40 },
//         },
//         {
//           id: 'afternoon',
//           startTime: '15:00',
//           endTime: '17:30',
//           type: 'Afternoon',
//           busInfo: { number: busInfo.busNumber, capacity: 40 },
//         },
//       ],
//     },
//   ];

//   const storeScheduleData = async scheduleData => {
//     try {
//       await AsyncStorage.setItem(
//         'selectedSchedule',
//         JSON.stringify(scheduleData),
//       );
//       console.log('Schedule saved locally!');
//     } catch (error) {
//       console.log('Error saving schedule:', error);
//     }
//   };

//   const selectRoute = async (schedule, routeInfo) => {
//     try {
//       const routeData = {
//         ...schedule,
//         route: `${routeInfo.start} → ${routeInfo.end}`,
//         busNumber: busInfo.busNumber,
//         start: routeInfo.start,
//         end: routeInfo.end,
//       };
//       await AsyncStorage.setItem('selectedRoute', JSON.stringify(routeData));
//       await storeScheduleData(routeData);
//       navigation.navigate('BoockingDate');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to select route. Please try again.');
//     }
//   };

//   const deleteBooking = async bookingId => {
//     Alert.alert(
//       'Delete Booking',
//       'Are you sure you want to delete this booking?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const updatedBookings = savedBookings.filter(
//                 booking => booking.id !== bookingId,
//               );
//               await AsyncStorage.setItem(
//                 'allBookings',
//                 JSON.stringify(updatedBookings),
//               );
//               setSavedBookings(updatedBookings);
//               Alert.alert('Success', 'Booking deleted successfully!');
//             } catch (error) {
//               console.log('Error deleting booking:', error);
//               Alert.alert('Error', 'Failed to delete booking');
//             }
//           },
//         },
//       ],
//     );
//   };

//   const viewBookingDetails = booking => {
//     const totalSeats = booking.dates
//       ? booking.dates.reduce(
//           (sum, date) => sum + (date.seats ? date.seats.length : 1),
//           0,
//         )
//       : 1;
//     const datesList = booking.dates
//       ? booking.dates
//           .map(
//             d => `${d.date}: ${d.seats ? d.seats.join(', ') : d.seat || 'N/A'}`,
//           )
//           .join('\n')
//       : 'No dates available';

//     Alert.alert(
//       'Booking Details',
//       `Route: ${booking.route}\n` +
//         `Schedule: ${booking.schedule || 'N/A'}\n` +
//         `Total Dates: ${booking.dates ? booking.dates.length : 0}\n` +
//         `Total Seats: ${totalSeats}\n\n` +
//         `Dates & Seats:\n${datesList}`,
//       [{ text: 'OK' }],
//     );
//   };

//   const renderBookingCard = ({ item }) => (
//     <Animated.View style={[styles.bookingCard, { opacity: fadeAnim }]}>
//       <View style={styles.bookingHeader}>
//         <View style={styles.bookingRoute}>
//           <Icon name="map-marker" size={14} color="#10B981" />
//           <Text style={styles.bookingRouteText}>{item.route}</Text>
//         </View>
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={() => deleteBooking(item.id)}
//         >
//           <Icon name="trash" size={14} color="#FF6B6B" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.bookingDetails}>
//         <View style={styles.detailRow}>
//           <Icon name="clock-o" size={12} color="#666" />
//           <Text style={styles.bookingScheduleText}>{item.schedule}</Text>
//         </View>

//         {item.dates && item.dates.length > 0 && (
//           <View style={styles.detailRow}>
//             <Icon name="calendar" size={12} color="#666" />
//             <Text style={styles.detailText}>Next: {item.dates[0].date}</Text>
//           </View>
//         )}

//         <View style={styles.detailRow}>
//           <Icon name="users" size={12} color="#666" />
//           <Text style={styles.detailText}>
//             {item.dates
//               ? item.dates.reduce(
//                   (sum, date) => sum + (date.seats ? date.seats.length : 1),
//                   0,
//                 )
//               : 1}{' '}
//             seat(s) ({item.dates ? item.dates.length : 0} date
//             {item.dates && item.dates.length > 1 ? 's' : ''})
//           </Text>
//         </View>
//       </View>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.datesScroll}
//       >
//         {item.dates &&
//           item.dates.map((dateItem, index) => (
//             <View key={index} style={styles.dateBookingCard}>
//               <Text style={styles.dateText}>{dateItem.date}</Text>
//               <Text style={styles.seatText}>
//                 Seat:{' '}
//                 {dateItem.seats
//                   ? dateItem.seats.join(', ')
//                   : dateItem.seat || 'N/A'}
//               </Text>
//             </View>
//           ))}
//       </ScrollView>

//       <View style={styles.bookingActions}>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => viewBookingDetails(item)}
//         >
//           <Icon name="eye" size={14} color="#6366F1" />
//           <Text style={styles.actionButtonText}>View Details</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.bookingFooter}>
//         <Text style={styles.totalDatesText}>
//           {item.dates ? item.dates.length : 0} dates booked
//         </Text>
//         <Text style={styles.bookingTimeText}>Booked: {item.bookingTime}</Text>
//       </View>
//     </Animated.View>
//   );

//   const renderRoute = ({ item }) => (
//     <Animated.View style={[styles.routeContainer, { opacity: fadeAnim }]}>
//       <View style={styles.routeTitleContainer}>
//         <Text style={styles.routeTitle}>{item.start}</Text>
//         <Icon
//           name="arrow-right"
//           size={18}
//           color="#6366F1"
//           style={styles.arrowIcon}
//         />
//         <Text style={styles.routeTitle}>{item.end}</Text>
//       </View>

//       <View style={styles.schedulesContainer}>
//         {item.schedules.map(schedule => (
//           <TouchableOpacity
//             key={schedule.id}
//             style={styles.scheduleCard}
//             onPress={() => selectRoute(schedule, item)}
//             activeOpacity={0.8}
//           >
//             <View style={styles.scheduleHeader}>
//               <View style={styles.scheduleTypeContainer}>
//                 <Icon
//                   name={schedule.type === 'Morning' ? 'sun-o' : 'moon-o'}
//                   size={16}
//                   color="#6366F1"
//                 />
//                 <Text style={styles.scheduleType}>{schedule.type}</Text>
//               </View>
//               <View style={styles.durationContainer}>
//                 <Icon name="clock-o" size={12} color="#64748B" />
//                 <Text style={styles.duration}>2h 30m</Text>
//               </View>
//             </View>

//             <View style={styles.timeContainer}>
//               <View style={styles.timeSection}>
//                 <Text style={styles.timeLabel}>Departure</Text>
//                 <Text style={styles.timeValue}>{schedule.startTime}</Text>
//               </View>

//               <View style={styles.journeyLine}>
//                 <View style={styles.journeyDot} />
//                 <View style={styles.journeyTrack} />
//                 <View style={styles.journeyDot} />
//               </View>

//               <View style={styles.timeSection}>
//                 <Text style={styles.timeLabel}>Arrival</Text>
//                 <Text style={styles.timeValue}>{schedule.endTime}</Text>
//               </View>
//             </View>

//             <View style={styles.routeActions}>
//               <TouchableOpacity style={styles.bookRouteButton}>
//                 <Icon name="plus-circle" size={16} color="white" />
//                 <Text style={styles.bookRouteButtonText}>Book This Route</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </Animated.View>
//   );

//   const renderEmptyBookings = () => (
//     <Animated.View style={[styles.emptyState, { opacity: fadeAnim }]}>
//       <Icon name="calendar" size={48} color="#CBD5E1" />
//       <Text style={styles.emptyStateTitle}>No Bookings Yet</Text>
//       <Text style={styles.emptyStateText}>
//         Start by selecting a route below to make your first booking
//       </Text>
//     </Animated.View>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#4F46E5" barStyle="light-content" />

//       {/* Enhanced Header with Gradient */}
//       <LinearGradient
//         colors={['#4F46E5', '#6366F1', '#8B5CF6']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.header}
//       >
//         <TouchableOpacity onPress={handleBackClick} style={styles.backButton}>
//           <View style={styles.backButtonCircle}>
//             <Icon name="arrow-left" size={20} color="#4F46E5" />
//           </View>
//         </TouchableOpacity>

//         <View style={styles.headerContent}>
//           <Text style={styles.headerTitle}>{busInfo.busNumber}</Text>
//           <Text style={styles.headerSubtitle}>Bus Schedule</Text>
//         </View>

//         <TouchableOpacity style={styles.menuButton}>
//           <Icon name="ellipsis-v" size={18} color="#FFFFFF" />
//         </TouchableOpacity>
//       </LinearGradient>

//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         {/* Enhanced Bus Info Card */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoHeader}>
//             <View style={styles.busIconContainer}>
//               <Icon name="bus" size={24} color="#6366F1" />
//             </View>
//             <Text style={styles.infoCardTitle}>Bus Information</Text>
//           </View>

//           <View style={styles.infoContent}>
//             <View style={styles.infoRow}>
//               <View style={styles.infoIconContainer}>
//                 <Icon name="id-card-o" size={16} color="#64748B" />
//               </View>
//               <View style={styles.infoTextContainer}>
//                 <Text style={styles.infoLabel}>Bus Number</Text>
//                 <Text style={styles.infoValue}>{busInfo.busNumber}</Text>
//               </View>
//             </View>

//             <View style={styles.separator} />

//             <View style={styles.infoRow}>
//               <View style={styles.infoIconContainer}>
//                 <Icon name="phone" size={16} color="#64748B" />
//               </View>
//               <View style={styles.infoTextContainer}>
//                 <Text style={styles.infoLabel}>Contact Number</Text>
//                 <View style={styles.contactRow}>
//                   <Text style={styles.infoValue}>070 435 3463</Text>
//                   <Text style={styles.flag}>🇱🇰</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* My Bookings Section */}
//         {savedBookings.length > 0 ? (
//           <View style={styles.bookingsSection}>
//             <View style={styles.sectionHeader}>
//               <Icon name="check-circle" size={20} color="#10B981" />
//               <Text style={styles.sectionTitle}>My Bookings</Text>
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>{savedBookings.length}</Text>
//               </View>
//             </View>
//             <FlatList
//               data={savedBookings}
//               renderItem={renderBookingCard}
//               keyExtractor={item => item.id}
//               scrollEnabled={false}
//               showsVerticalScrollIndicator={false}
//             />
//           </View>
//         ) : (
//           <View style={styles.bookingsSection}>
//             <View style={styles.sectionHeader}>
//               <Icon name="check-circle" size={20} color="#10B981" />
//               <Text style={styles.sectionTitle}>My Bookings</Text>
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>0</Text>
//               </View>
//             </View>
//             {renderEmptyBookings()}
//           </View>
//         )}

//         {/* Routes Section */}
//         <View style={styles.routesSection}>
//           <View style={styles.sectionHeader}>
//             <Icon name="plus-circle" size={20} color="#6366F1" />
//             <Text style={styles.sectionTitle}>Book New Route</Text>
//           </View>
//           <FlatList
//             data={daily}
//             renderItem={renderRoute}
//             keyExtractor={item => item.id}
//             scrollEnabled={false}
//             showsVerticalScrollIndicator={false}
//           />
//         </View>

//         {/* Enhanced Seats Info */}
//         <View style={styles.seatsCard}>
//           <View style={styles.seatsHeader}>
//             <Icon name="users" size={20} color="#10B981" />
//             <Text style={styles.seatsTitle}>Seat Availability</Text>
//           </View>
//           <View style={styles.seatsContent}>
//             <Text style={styles.availableSeats}>10</Text>
//             <Text style={styles.seatsLabel}>seats remaining</Text>
//           </View>
//           <View style={styles.seatsProgress}>
//             <View style={styles.seatsProgressFilled} />
//           </View>
//         </View>

//         <View style={styles.bottomSpacing} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingBottom: 25,
//     paddingHorizontal: 20,
//     shadowColor: '#4F46E5',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   backButton: {
//     marginRight: 15,
//   },
//   backButtonCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   headerContent: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     color: '#FFFFFF',
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 2,
//   },
//   headerSubtitle: {
//     color: '#E0E7FF',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   menuButton: {
//     width: 40,
//     alignItems: 'center',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   infoCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     marginTop: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 4,
//   },
//   infoHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     paddingBottom: 15,
//   },
//   busIconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#EEF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   infoCardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1E293B',
//   },
//   infoContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   infoIconContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#F1F5F9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   infoTextContainer: {
//     flex: 1,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginBottom: 2,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   infoValue: {
//     fontSize: 16,
//     color: '#1E293B',
//     fontWeight: '600',
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   flag: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#F1F5F9',
//     marginVertical: 8,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginLeft: 8,
//     flex: 1,
//   },
//   badge: {
//     backgroundColor: '#6366F1',
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     minWidth: 24,
//     alignItems: 'center',
//   },
//   badgeText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   bookingsSection: {
//     marginTop: 30,
//   },
//   routesSection: {
//     marginTop: 30,
//   },
//   routeContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   routeTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   routeTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1E293B',
//   },
//   arrowIcon: {
//     marginHorizontal: 12,
//   },
//   schedulesContainer: {
//     gap: 12,
//   },
//   scheduleCard: {
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//   },
//   scheduleHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   scheduleTypeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   scheduleType: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#6366F1',
//     marginLeft: 6,
//   },
//   durationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   duration: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginLeft: 4,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   timeSection: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   timeLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   timeValue: {
//     fontSize: 18,
//     color: '#1E293B',
//     fontWeight: '700',
//   },
//   journeyLine: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 2,
//     paddingHorizontal: 20,
//   },
//   journeyDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#6366F1',
//   },
//   journeyTrack: {
//     flex: 1,
//     height: 2,
//     backgroundColor: '#CBD5E1',
//     marginHorizontal: 8,
//   },
//   routeActions: {
//     marginTop: 8,
//   },
//   bookRouteButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#6366F1',
//     paddingVertical: 12,
//     borderRadius: 10,
//     gap: 8,
//   },
//   bookRouteButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   bookingCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 3,
//     borderLeftWidth: 4,
//     borderLeftColor: '#10B981',
//   },
//   bookingHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   bookingRoute: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   bookingRouteText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginLeft: 8,
//   },
//   bookingScheduleText: {
//     fontSize: 14,
//     color: '#64748B',
//     marginLeft: 8,
//   },
//   bookingDetails: {
//     marginBottom: 12,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 6,
//   },
//   detailText: {
//     fontSize: 13,
//     color: '#666',
//     marginLeft: 8,
//     fontWeight: '500',
//   },
//   deleteButton: {
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: '#FEE2E2',
//   },
//   datesScroll: {
//     marginBottom: 12,
//   },
//   dateBookingCard: {
//     backgroundColor: '#F0FDF4',
//     borderRadius: 8,
//     padding: 12,
//     marginRight: 8,
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   dateText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#15803D',
//   },
//   seatText: {
//     fontSize: 12,
//     color: '#166534',
//     marginTop: 2,
//   },
//   bookingActions: {
//     marginBottom: 8,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//     backgroundColor: '#EEF2FF',
//   },
//   actionButtonText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#6366F1',
//     marginLeft: 6,
//   },
//   bookingFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 8,
//     borderTopWidth: 1,
//     borderTopColor: '#F1F5F9',
//   },
//   totalDatesText: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   bookingTimeText: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   emptyState: {
//     alignItems: 'center',
//     paddingVertical: 40,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     marginBottom: 20,
//   },
//   emptyStateTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#64748B',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptyStateText: {
//     fontSize: 14,
//     color: '#94A3B8',
//     textAlign: 'center',
//     lineHeight: 20,
//     paddingHorizontal: 20,
//   },
//   seatsCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     marginTop: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   seatsHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   seatsTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginLeft: 10,
//   },
//   seatsContent: {
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   availableSeats: {
//     fontSize: 32,
//     fontWeight: '800',
//     color: '#10B981',
//     marginBottom: 4,
//   },
//   seatsLabel: {
//     fontSize: 14,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   seatsProgress: {
//     height: 6,
//     backgroundColor: '#E2E8F0',
//     borderRadius: 3,
//     overflow: 'hidden',
//   },
//   seatsProgressFilled: {
//     height: '100%',
//     width: '33%',
//     backgroundColor: '#10B981',
//     borderRadius: 3,
//   },
//   bottomSpacing: {
//     height: 100,
//   },
// });
// //export default BusScheduleScreen;
///////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect, useCallback } from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import RNFS from 'react-native-fs';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   FlatList,
//   StatusBar,
//   Alert,
//   Animated,
//   RefreshControl,
// } from 'react-native';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// export default function BusScheduleScreen({ navigation, route }) {
//   const { busInfo } = route?.params || {
//     busId: 'ACD-01-DB',
//     busNumber: 'ACD-01-DB',
//   };
//   useFocusEffect(
//     React.useCallback(() => {
//       getBusUser;
//       return () => console.log('Screen unfocused');
//     }, [getBusUser]),
//   );
//   const [savedBookings, setSavedBookings] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [dailyRout, setdailyRout] = useState([]);

//   const getBusUser = useCallback(async function loadRout() {
//     try {
//       const users = await getUserData();

//       for (const user of users) {
//         if (Array.isArray(user.bus)) {
//           const bus = user.bus.find(b => b.id === busInfo.busId);
//           if (bus) {
//             console.log('Schdeule ', bus.schedules);
//             return bus.schedules || [];
//           }
//         }
//       }

//       return null;
//     } catch (error) {
//       console.log('Error no bus user:', error);
//       return null;
//     }
//   }, [busInfo.busId]);

//   async function getUserData() {
//     try {
//       const userData = await AsyncStorage.getItem('usersArray');
//       if (userData !== null) {
//         return JSON.parse(userData);
//       }
//       return [];
//     } catch (error) {
//       console.log('Error retrieving user data:', error);
//       return [];
//     }
//   }

//   const animateIn = useCallback(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   useEffect(() => {
//     loadSavedBookings();
//     animateIn();
//     const unsubscribe = navigation.addListener('focus', () => {
//       loadSavedBookings();
//     });
//     return unsubscribe;
//   }, [navigation, animateIn]);

//   const loadSavedBookings = async () => {
//     try {
//       const bookings = await AsyncStorage.getItem('busBookings');
//       if (bookings) {
//         setSavedBookings(JSON.parse(bookings));
//       }
//     } catch (error) {
//       console.log('Error loading bookings:', error);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadSavedBookings();
//     setRefreshing(false);
//   }, []);

//   const handleBackClick = () => {
//     navigation.goBack();
//   };

//   const daily = [
//     {
//       id: 'galle-makubura',
//       start: 'Galle',
//       end: 'Makubura',
//       schedules: [
//         {
//           id: 'morning',
//           startTime: '06:00',
//           endTime: '08:30',
//           type: 'Morning',
//           busInfo: { number: busInfo.busNumber, capacity: 40 },
//         },
//         {
//           id: 'afternoon',
//           startTime: '12:00',
//           endTime: '14:30',
//           type: 'Afternoon',
//           busInfo: { number: busInfo.busNumber, capacity: 40 },
//         },
//       ],
//     },
//   ];

//   const storeScheduleData = async scheduleData => {
//     try {
//       await AsyncStorage.setItem(
//         'selectedSchedule',
//         JSON.stringify(scheduleData),
//       );
//       console.log('Schedule saved locally!');
//     } catch (error) {
//       console.log('Error saving schedule:', error);
//     }
//   };

//   const selectRoute = async (schedule, routeInfo) => {
//     try {
//       const routeData = {
//         ...schedule,
//         route: `${routeInfo.start} → ${routeInfo.end}`,
//         busNumber: busInfo.busNumber,
//         start: routeInfo.start,
//         end: routeInfo.end,
//       };
//       await AsyncStorage.setItem('selectedRoute', JSON.stringify(routeData));
//       await storeScheduleData(routeData);
//       navigation.navigate('BoockingDate');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to select route. Please try again.');
//     }
//   };

//   const deleteBooking = async bookingId => {
//     Alert.alert(
//       'Delete Booking',
//       'Are you sure you want to delete this booking?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const updatedBookings = savedBookings.filter(
//                 booking => booking.id !== bookingId,
//               );
//               await AsyncStorage.setItem(
//                 'busBookings',
//                 JSON.stringify(updatedBookings),
//               );
//               setSavedBookings(updatedBookings);
//               Alert.alert('Success', 'Booking deleted successfully!');
//             } catch (error) {
//               console.log('Error deleting booking:', error);
//               Alert.alert('Error', 'Failed to delete booking');
//             }
//           },
//         },
//       ],
//     );
//   };

//   const viewBookingDetails = booking => {
//     const totalSeats = booking.dates
//       ? booking.dates.reduce(
//           (sum, date) => sum + (date.seats ? date.seats.length : 1),
//           0,
//         )
//       : 1;
//     const datesList = booking.dates
//       ? booking.dates
//           .map(d => `${d.date}: Seats ${d.seats ? d.seats.join(', ') : 'N/A'}`)
//           .join('\n')
//       : 'No dates available';

//     Alert.alert(
//       'Booking Details',
//       `Route: ${booking.route}\n` +
//         `Time: ${booking.startTime} - ${booking.endTime}\n` +
//         `Type: ${booking.type || 'Standard'}\n` +
//         `Bus: ${booking.busInfo ? booking.busInfo.number : 'N/A'}\n` +
//         `Total Dates: ${booking.dates ? booking.dates.length : 0}\n` +
//         `Total Seats: ${totalSeats}\n\n` +
//         `Booking Details:\n${datesList}\n\n` +
//         `Booked on: ${new Date(booking.bookingDate).toLocaleString()}`,
//       [{ text: 'OK' }],
//     );
//   };

//   const renderBookingCard = ({ item }) => (
//     <Animated.View style={[styles.bookingCard, { opacity: fadeAnim }]}>
//       <View style={styles.bookingHeader}>
//         <View style={styles.bookingRoute}>
//           <Icon name="map-marker" size={14} color="#10B981" />
//           <Text style={styles.bookingRouteText}>{item.route}</Text>
//         </View>
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={() => deleteBooking(item.id)}
//         >
//           <Icon name="trash" size={14} color="#FF6B6B" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.bookingDetails}>
//         <View style={styles.detailRow}>
//           <Icon name="clock-o" size={12} color="#666" />
//           <Text style={styles.bookingScheduleText}>
//             {item.startTime} - {item.endTime}
//           </Text>
//         </View>

//         <View style={styles.detailRow}>
//           <Icon name="tag" size={12} color="#666" />
//           <Text style={styles.detailText}>{item.type || 'Standard'}</Text>
//         </View>

//         {item.dates && item.dates.length > 0 && (
//           <View style={styles.detailRow}>
//             <Icon name="calendar" size={12} color="#666" />
//             <Text style={styles.detailText}>Next: {item.dates[0].date}</Text>
//           </View>
//         )}

//         <View style={styles.detailRow}>
//           <Icon name="users" size={12} color="#666" />
//           <Text style={styles.detailText}>
//             {item.dates
//               ? item.dates.reduce(
//                   (sum, date) => sum + (date.seats ? date.seats.length : 1),
//                   0,
//                 )
//               : 1}{' '}
//             seat(s) ({item.dates ? item.dates.length : 0} date
//             {item.dates && item.dates.length > 1 ? 's' : ''})
//           </Text>
//         </View>

//         {item.busInfo && (
//           <View style={styles.detailRow}>
//             <Icon name="bus" size={12} color="#666" />
//             <Text style={styles.detailText}>Bus: {item.busInfo.number}</Text>
//           </View>
//         )}
//       </View>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.datesScroll}
//       >
//         {item.dates &&
//           item.dates.map((dateItem, index) => (
//             <View key={index} style={styles.dateBookingCard}>
//               <Text style={styles.dateText}>{dateItem.date}</Text>
//               <Text style={styles.seatText}>
//                 Seats: {dateItem.seats ? dateItem.seats.join(', ') : 'N/A'}
//               </Text>
//             </View>
//           ))}
//       </ScrollView>

//       <View style={styles.bookingActions}>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => viewBookingDetails(item)}
//         >
//           <Icon name="eye" size={14} color="#6366F1" />
//           <Text style={styles.actionButtonText}>View Details</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.bookingFooter}>
//         <Text style={styles.totalDatesText}>
//           {item.dates ? item.dates.length : 0} dates booked
//         </Text>
//         <Text style={styles.bookingTimeText}>
//           Booked: {new Date(item.bookingDate).toLocaleDateString()}
//         </Text>
//       </View>
//     </Animated.View>
//   );

//   const renderRoute = ({ item }) => (
//     <Animated.View style={[styles.routeContainer, { opacity: fadeAnim }]}>
//       <View style={styles.routeTitleContainer}>
//         <Text style={styles.routeTitle}>{item.start}</Text>
//         <Icon
//           name="arrow-right"
//           size={18}
//           color="#6366F1"
//           style={styles.arrowIcon}
//         />
//         <Text style={styles.routeTitle}>{item.end}</Text>
//       </View>

//       <View style={styles.schedulesContainer}>
//         {item.schedules.map(schedule => (
//           <TouchableOpacity
//             key={schedule.id}
//             style={styles.scheduleCard}
//             onPress={() => selectRoute(schedule, item)}
//             activeOpacity={0.8}
//           >
//             <View style={styles.scheduleHeader}>
//               <View style={styles.scheduleTypeContainer}>
//                 <Icon
//                   name={schedule.type === 'Morning' ? 'sun-o' : 'moon-o'}
//                   size={16}
//                   color="#6366F1"
//                 />
//                 <Text style={styles.scheduleType}>{schedule.type}</Text>
//               </View>
//               <View style={styles.durationContainer}>
//                 <Icon name="clock-o" size={12} color="#64748B" />
//                 <Text style={styles.duration}>2h 30m</Text>
//               </View>
//             </View>

//             <View style={styles.timeContainer}>
//               <View style={styles.timeSection}>
//                 <Text style={styles.timeLabel}>Departure</Text>
//                 <Text style={styles.timeValue}>{schedule.startTime}</Text>
//               </View>

//               <View style={styles.journeyLine}>
//                 <View style={styles.journeyDot} />
//                 <View style={styles.journeyTrack} />
//                 <View style={styles.journeyDot} />
//               </View>

//               <View style={styles.timeSection}>
//                 <Text style={styles.timeLabel}>Arrival</Text>
//                 <Text style={styles.timeValue}>{schedule.endTime}</Text>
//               </View>
//             </View>

//             <View style={styles.routeActions}>
//               <TouchableOpacity style={styles.bookRouteButton}>
//                 <Icon name="plus-circle" size={16} color="white" />
//                 <Text style={styles.bookRouteButtonText}>Book This Route</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </Animated.View>
//   );

//   const renderEmptyBookings = () => (
//     <Animated.View style={[styles.emptyState, { opacity: fadeAnim }]}>
//       <Icon name="calendar" size={48} color="#CBD5E1" />
//       <Text style={styles.emptyStateTitle}>No Bookings Yet</Text>
//       <Text style={styles.emptyStateText}>
//         Start by selecting a route below to make your first booking
//       </Text>
//     </Animated.View>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#4F46E5" barStyle="light-content" />

//       {/* Enhanced Header with Gradient */}
//       <LinearGradient
//         colors={['#4F46E5', '#6366F1', '#8B5CF6']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.header}
//       >
//         <TouchableOpacity onPress={handleBackClick} style={styles.backButton}>
//           <View style={styles.backButtonCircle}>
//             <Icon name="arrow-left" size={20} color="#4F46E5" />
//           </View>
//         </TouchableOpacity>

//         <View style={styles.headerContent}>
//           <Text style={styles.headerTitle}>{busInfo.busNumber}</Text>
//           <Text style={styles.headerSubtitle}>Bus Schedule</Text>
//         </View>

//         <TouchableOpacity style={styles.menuButton}>
//           <Icon name="ellipsis-v" size={18} color="#FFFFFF" />
//         </TouchableOpacity>
//       </LinearGradient>

//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         {/* Enhanced Bus Info Card */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoHeader}>
//             <View style={styles.busIconContainer}>
//               <Icon name="bus" size={24} color="#6366F1" />
//             </View>
//             <Text style={styles.infoCardTitle}>Bus Information</Text>
//           </View>

//           <View style={styles.infoContent}>
//             <View style={styles.infoRow}>
//               <View style={styles.infoIconContainer}>
//                 <Icon name="id-card-o" size={16} color="#64748B" />
//               </View>
//               <View style={styles.infoTextContainer}>
//                 <Text style={styles.infoLabel}>Bus Number</Text>
//                 <Text style={styles.infoValue}>{busInfo.busNumber}</Text>
//               </View>
//             </View>

//             <View style={styles.separator} />

//             <View style={styles.infoRow}>
//               <View style={styles.infoIconContainer}>
//                 <Icon name="phone" size={16} color="#64748B" />
//               </View>
//               <View style={styles.infoTextContainer}>
//                 <Text style={styles.infoLabel}>Contact Number</Text>
//                 <View style={styles.contactRow}>
//                   <Text style={styles.infoValue}>070 435 3463</Text>
//                   <Text style={styles.flag}>🇱🇰</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* My Bookings Section */}
//         {savedBookings.length > 0 ? (
//           <View style={styles.bookingsSection}>
//             <View style={styles.sectionHeader}>
//               <Icon name="check-circle" size={20} color="#10B981" />
//               <Text style={styles.sectionTitle}>My Bookings</Text>
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>{savedBookings.length}</Text>
//               </View>
//             </View>
//             <FlatList
//               data={savedBookings}
//               renderItem={renderBookingCard}
//               keyExtractor={item => item.id}
//               scrollEnabled={false}
//               showsVerticalScrollIndicator={false}
//             />
//           </View>
//         ) : (
//           <View style={styles.bookingsSection}>
//             <View style={styles.sectionHeader}>
//               <Icon name="check-circle" size={20} color="#10B981" />
//               <Text style={styles.sectionTitle}>My Bookings</Text>
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>0</Text>
//               </View>
//             </View>
//             {renderEmptyBookings()}
//           </View>
//         )}

//         {/* Routes Section */}
//         <View style={styles.routesSection}>
//           <View style={styles.sectionHeader}>
//             <Icon name="plus-circle" size={20} color="#6366F1" />
//             <Text style={styles.sectionTitle}>Book New Route</Text>
//           </View>
//           <FlatList
//             data={daily}
//             renderItem={renderRoute}
//             keyExtractor={item => item.id}
//             scrollEnabled={false}
//             showsVerticalScrollIndicator={false}
//           />
//         </View>

//         {/* Enhanced Seats Info */}
//         <View style={styles.seatsCard}>
//           <View style={styles.seatsHeader}>
//             <Icon name="users" size={20} color="#10B981" />
//             <Text style={styles.seatsTitle}>Seat Availability</Text>
//           </View>
//           <View style={styles.seatsContent}>
//             <Text style={styles.availableSeats}>10</Text>
//             <Text style={styles.seatsLabel}>seats remaining</Text>
//           </View>
//           <View style={styles.seatsProgress}>
//             <View style={styles.seatsProgressFilled} />
//           </View>
//         </View>

//         <View style={styles.bottomSpacing} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingBottom: 25,
//     paddingHorizontal: 20,
//     shadowColor: '#4F46E5',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   backButton: {
//     marginRight: 15,
//   },
//   backButtonCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   headerContent: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     color: '#FFFFFF',
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 2,
//   },
//   headerSubtitle: {
//     color: '#E0E7FF',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   menuButton: {
//     width: 40,
//     alignItems: 'center',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   infoCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     marginTop: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 4,
//   },
//   infoHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     paddingBottom: 15,
//   },
//   busIconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#EEF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   infoCardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1E293B',
//   },
//   infoContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   infoIconContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#F1F5F9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   infoTextContainer: {
//     flex: 1,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginBottom: 2,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   infoValue: {
//     fontSize: 16,
//     color: '#1E293B',
//     fontWeight: '600',
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   flag: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#F1F5F9',
//     marginVertical: 8,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginLeft: 8,
//     flex: 1,
//   },
//   badge: {
//     backgroundColor: '#6366F1',
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     minWidth: 24,
//     alignItems: 'center',
//   },
//   badgeText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   bookingsSection: {
//     marginTop: 30,
//   },
//   routesSection: {
//     marginTop: 30,
//   },
//   routeContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   routeTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   routeTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1E293B',
//   },
//   arrowIcon: {
//     marginHorizontal: 12,
//   },
//   schedulesContainer: {
//     gap: 12,
//   },
//   scheduleCard: {
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//   },
//   scheduleHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   scheduleTypeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   scheduleType: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#6366F1',
//     marginLeft: 6,
//   },
//   durationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   duration: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginLeft: 4,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   timeSection: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   timeLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   timeValue: {
//     fontSize: 18,
//     color: '#1E293B',
//     fontWeight: '700',
//   },
//   journeyLine: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 2,
//     paddingHorizontal: 20,
//   },
//   journeyDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#6366F1',
//   },
//   journeyTrack: {
//     flex: 1,
//     height: 2,
//     backgroundColor: '#CBD5E1',
//     marginHorizontal: 8,
//   },
//   routeActions: {
//     marginTop: 8,
//   },
//   bookRouteButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#6366F1',
//     paddingVertical: 12,
//     borderRadius: 10,
//     gap: 8,
//   },
//   bookRouteButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   bookingCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 3,
//     borderLeftWidth: 4,
//     borderLeftColor: '#10B981',
//   },
//   bookingHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   bookingRoute: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   bookingRouteText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginLeft: 8,
//   },
//   bookingScheduleText: {
//     fontSize: 14,
//     color: '#64748B',
//     marginLeft: 8,
//   },
//   bookingDetails: {
//     marginBottom: 12,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 6,
//   },
//   detailText: {
//     fontSize: 13,
//     color: '#666',
//     marginLeft: 8,
//     fontWeight: '500',
//   },
//   deleteButton: {
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: '#FEE2E2',
//   },
//   datesScroll: {
//     marginBottom: 12,
//   },
//   dateBookingCard: {
//     backgroundColor: '#F0FDF4',
//     borderRadius: 8,
//     padding: 12,
//     marginRight: 8,
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   dateText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#15803D',
//   },
//   seatText: {
//     fontSize: 12,
//     color: '#166534',
//     marginTop: 2,
//   },
//   bookingActions: {
//     marginBottom: 8,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//     backgroundColor: '#EEF2FF',
//   },
//   actionButtonText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#6366F1',
//     marginLeft: 6,
//   },
//   bookingFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 8,
//     borderTopWidth: 1,
//     borderTopColor: '#F1F5F9',
//   },
//   totalDatesText: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   bookingTimeText: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   emptyState: {
//     alignItems: 'center',
//     paddingVertical: 40,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     marginBottom: 20,
//   },
//   emptyStateTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#64748B',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptyStateText: {
//     fontSize: 14,
//     color: '#94A3B8',
//     textAlign: 'center',
//     lineHeight: 20,
//     paddingHorizontal: 20,
//   },
//   seatsCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     marginTop: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   seatsHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   seatsTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginLeft: 10,
//   },
//   seatsContent: {
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   availableSeats: {
//     fontSize: 32,
//     fontWeight: '800',
//     color: '#10B981',
//     marginBottom: 4,
//   },
//   seatsLabel: {
//     fontSize: 14,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   seatsProgress: {
//     height: 6,
//     backgroundColor: '#E2E8F0',
//     borderRadius: 3,
//     overflow: 'hidden',
//   },
//   seatsProgressFilled: {
//     height: '100%',
//     width: '33%',
//     backgroundColor: '#10B981',
//     borderRadius: 3,
//   },
//   bottomSpacing: {
//     height: 100,
//   },
// });
////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect, useCallback } from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import RNFS from 'react-native-fs';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   FlatList,
//   StatusBar,
//   Alert,
//   Animated,
//   RefreshControl,
// } from 'react-native';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// export default function BusScheduleScreen({ navigation, route }) {
//   // Correctly extract parameters from route
//   const busId = route?.params?.busId || 'ACD-01-DB';
//   const busNumber = route?.params?.busNumber || 'ACD-01-DB';

//   // Create busInfo object from the parameters
//   const busInfo = {
//     busId: busId,
//     busNumber: busNumber,
//   };

//   async function getNo(data) {
//     try {
//       const u = getUserData();
//       let du;
//       for (const user of u) {
//         if (Array.isArray(user.bus)) {
//           du = u.find(
//             user => user.bus && user.bus.some(bus => bus.id === busId),
//           );
//           return du;
//         }
//       }
//     } catch {}
//   }

//   const [savedBookings, setSavedBookings] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [dailyRoutes, setDailyRoutes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Function to get user data from AsyncStorage
//   const getUserData = useCallback(async () => {
//     try {
//       const userData = await AsyncStorage.getItem('usersArray');
//       if (userData !== null) {
//         return JSON.parse(userData);
//       }
//       return [];
//     } catch (error) {
//       console.log('Error retrieving user data:', error);
//       return [];
//     }
//   }, []);

//   // Function to get default routes as fallback
//   const getDefaultRoutes = useCallback(
//     () => [
//       {
//         id: 'galle-makubura',
//         start: 'Galle',
//         end: 'Makubura',
//         schedules: [
//           {
//             id: 'morning',
//             startTime: '06:00',
//             endTime: '08:30',
//             type: 'Morning',
//             busInfo: { number: busInfo.busNumber, capacity: 40 },
//           },
//           {
//             id: 'afternoon',
//             startTime: '12:00',
//             endTime: '14:30',
//             type: 'Afternoon',
//             busInfo: { number: busInfo.busNumber, capacity: 40 },
//           },
//         ],
//       },
//     ],
//     [busInfo.busNumber],
//   );

//   // Transform bus data from AsyncStorage to route format
//   const transformBusDataToRoutes = useCallback(
//     busData => {
//       if (!busData || !busData.schedules || !Array.isArray(busData.schedules)) {
//         return getDefaultRoutes();
//       }

//       // Group schedules by route (start-end combination)
//       const routeMap = {};
//       console.log('busData', busData);
//       busData.schedules.forEach((schedule, index) => {
//         const start = schedule.route.startLocation || 'Galle';
//         const end = schedule.route.endLocation || 'Makubura';
//         const routeKey = `${start}-${end}`;

//         if (!routeMap[routeKey]) {
//           routeMap[routeKey] = {
//             id: routeKey.toLowerCase(),
//             start: start,
//             end: end,
//             schedules: [],
//           };
//         }

//         routeMap[routeKey].schedules.push({
//           id: schedule.id || `schedule-${index}`,
//           startTime: schedule.startTime || '06:00',
//           endTime: schedule.endTime || '08:30',
//           type: schedule.type || 'Standard',
//           busInfo: {
//             number: busInfo.busNumber,
//             capacity: schedule.capacity || 40,
//           },
//         });
//       });

//       const routes = Object.values(routeMap);
//       return routes.length > 0 ? routes : getDefaultRoutes();
//     },
//     [busInfo.busNumber, getDefaultRoutes],
//   );

//   // Function to load bus data and routes
//   const getBusData = useCallback(async () => {
//     try {
//       setLoading(true);
//       console.log('Loading bus data for ID:', busInfo.busId);

//       const users = await getUserData();
//       console.log('Users data loaded:', users.length, 'users');

//       let foundBus = null;

//       // Search through users to find the bus
//       for (const user of users) {
//         if (Array.isArray(user.bus)) {
//           const bus = user.bus.find(b => b.id === busInfo.busId);
//           if (bus) {
//             console.log('Found bus:', bus);
//             foundBus = bus;
//             break;
//           }
//         }
//       }

//       if (foundBus) {
//         console.log('Bus schedules:', foundBus.schedules);
//         const transformedRoutes = transformBusDataToRoutes(foundBus);
//         console.log('Transformed routes:', transformedRoutes);
//         setDailyRoutes(transformedRoutes);
//       } else {
//         console.log('No bus data found, using default routes');
//         setDailyRoutes(getDefaultRoutes());
//       }
//     } catch (error) {
//       console.log('Error loading bus data:', error);
//       setDailyRoutes(getDefaultRoutes());
//     } finally {
//       setLoading(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     busInfo.busId,
//     busInfo.busNumber,
//     getDefaultRoutes,
//     getUserData,
//     transformBusDataToRoutes,
//   ]);

//   // Focus effect hook
//   useFocusEffect(
//     useCallback(() => {
//       getBusData();
//       return () => console.log('Screen unfocused');
//     }, [getBusData]),
//   );

//   const animateIn = useCallback(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   useEffect(() => {
//     loadSavedBookings();
//     animateIn();
//     getBusData();

//     const unsubscribe = navigation.addListener('focus', () => {
//       loadSavedBookings();
//       getBusData();
//     });
//     return unsubscribe;
//   }, [navigation, animateIn, getBusData]);

//   const loadSavedBookings = async () => {
//     try {
//       const bookings = await AsyncStorage.getItem('busBookings');
//       if (bookings) {
//         setSavedBookings(JSON.parse(bookings));
//       }
//     } catch (error) {
//       console.log('Error loading bookings:', error);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await Promise.all([loadSavedBookings(), getBusData()]);
//     setRefreshing(false);
//   }, [getBusData]);

//   const handleBackClick = () => {
//     navigation.goBack();
//   };

//   const storeScheduleData = async scheduleData => {
//     try {
//       await AsyncStorage.setItem(
//         'selectedSchedule',
//         JSON.stringify(scheduleData),
//       );
//       console.log('Schedule saved locally!');
//     } catch (error) {
//       console.log('Error saving schedule:', error);
//     }
//   };

//   const selectRoute = async (schedule, routeInfo) => {
//     try {
//       const routeData = {
//         ...schedule,
//         route: `${routeInfo.start} → ${routeInfo.end}`,
//         busNumber: busInfo.busNumber,
//         start: routeInfo.start,
//         end: routeInfo.end,
//       };
//       await AsyncStorage.setItem('selectedRoute', JSON.stringify(routeData));
//       await storeScheduleData(routeData);
//       // navigation.navigate('');/////////////////////////////////////////////////////////////////
//       navigation.navigate('BoockingDate', {
//         busId: busInfo.busId,
//         busNumber: busInfo.busNumber,
//       });
//     } catch (error) {
//       Alert.alert('Error', 'Failed to select route. Please try again.');
//     }
//   };

//   const deleteBooking = async bookingId => {
//     Alert.alert(
//       'Delete Booking',
//       'Are you sure you want to delete this booking?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const updatedBookings = savedBookings.filter(
//                 booking => booking.id !== bookingId,
//               );
//               await AsyncStorage.setItem(
//                 'busBookings',
//                 JSON.stringify(updatedBookings),
//               );
//               setSavedBookings(updatedBookings);
//               Alert.alert('Success', 'Booking deleted successfully!');
//             } catch (error) {
//               console.log('Error deleting booking:', error);
//               Alert.alert('Error', 'Failed to delete booking');
//             }
//           },
//         },
//       ],
//     );
//   };

//   const viewBookingDetails = booking => {
//     const totalSeats = booking.dates
//       ? booking.dates.reduce(
//           (sum, date) => sum + (date.seats ? date.seats.length : 1),
//           0,
//         )
//       : 1;
//     const datesList = booking.dates
//       ? booking.dates
//           .map(d => `${d.date}: Seats ${d.seats ? d.seats.join(', ') : 'N/A'}`)
//           .join('\n')
//       : 'No dates available';

//     Alert.alert(
//       'Booking Details',
//       `Route: ${booking.route}\n` +
//         `Time: ${booking.startTime} - ${booking.endTime}\n` +
//         `Type: ${booking.type || 'Standard'}\n` +
//         `Bus: ${booking.busInfo ? booking.busInfo.number : 'N/A'}\n` +
//         `Total Dates: ${booking.dates ? booking.dates.length : 0}\n` +
//         `Total Seats: ${totalSeats}\n\n` +
//         `Booking Details:\n${datesList}\n\n` +
//         `Booked on: ${new Date(booking.bookingDate).toLocaleString()}`,
//       [{ text: 'OK' }],
//     );
//   };

//   const renderBookingCard = ({ item }) => (
//     <Animated.View style={[styles.bookingCard, { opacity: fadeAnim }]}>
//       <View style={styles.bookingHeader}>
//         <View style={styles.bookingRoute}>
//           <Icon name="map-marker" size={14} color="#10B981" />
//           <Text style={styles.bookingRouteText}>{item.route}</Text>
//         </View>
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={() => deleteBooking(item.id)}
//         >
//           <Icon name="trash" size={14} color="#FF6B6B" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.bookingDetails}>
//         <View style={styles.detailRow}>
//           <Icon name="clock-o" size={12} color="#666" />
//           <Text style={styles.bookingScheduleText}>
//             {item.startTime} - {item.endTime}
//           </Text>
//         </View>

//         <View style={styles.detailRow}>
//           <Icon name="tag" size={12} color="#666" />
//           <Text style={styles.detailText}>{item.type || 'Standard'}</Text>
//         </View>

//         {item.dates && item.dates.length > 0 && (
//           <View style={styles.detailRow}>
//             <Icon name="calendar" size={12} color="#666" />
//             <Text style={styles.detailText}>Next: {item.dates[0].date}</Text>
//           </View>
//         )}

//         <View style={styles.detailRow}>
//           <Icon name="users" size={12} color="#666" />
//           <Text style={styles.detailText}>
//             {item.dates
//               ? item.dates.reduce(
//                   (sum, date) => sum + (date.seats ? date.seats.length : 1),
//                   0,
//                 )
//               : 1}{' '}
//             seat(s) ({item.dates ? item.dates.length : 0} date
//             {item.dates && item.dates.length > 1 ? 's' : ''})
//           </Text>
//         </View>

//         {item.busInfo && (
//           <View style={styles.detailRow}>
//             <Icon name="bus" size={12} color="#666" />
//             <Text style={styles.detailText}>Bus: {item.busInfo.number}</Text>
//           </View>
//         )}
//       </View>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.datesScroll}
//       >
//         {item.dates &&
//           item.dates.map((dateItem, index) => (
//             <View key={index} style={styles.dateBookingCard}>
//               <Text style={styles.dateText}>{dateItem.date}</Text>
//               <Text style={styles.seatText}>
//                 Seats: {dateItem.seats ? dateItem.seats.join(', ') : 'N/A'}
//               </Text>
//             </View>
//           ))}
//       </ScrollView>

//       <View style={styles.bookingActions}>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => viewBookingDetails(item)}
//         >
//           <Icon name="eye" size={14} color="#6366F1" />
//           <Text style={styles.actionButtonText}>View Details</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.bookingFooter}>
//         <Text style={styles.totalDatesText}>
//           {item.dates ? item.dates.length : 0} dates booked
//         </Text>
//         <Text style={styles.bookingTimeText}>
//           Booked: {new Date(item.bookingDate).toLocaleDateString()}
//         </Text>
//       </View>
//     </Animated.View>
//   );

//   const renderRoute = ({ item }) => (
//     <Animated.View style={[styles.routeContainer, { opacity: fadeAnim }]}>
//       <View style={styles.routeTitleContainer}>
//         <Text style={styles.routeTitle}>{item.start}</Text>
//         <Icon
//           name="arrow-right"
//           size={18}
//           color="#6366F1"
//           style={styles.arrowIcon}
//         />
//         <Text style={styles.routeTitle}>{item.end}</Text>
//       </View>

//       <View style={styles.schedulesContainer}>
//         {item.schedules.map(schedule => (
//           <TouchableOpacity
//             key={schedule.id}
//             style={styles.scheduleCard}
//             onPress={() => selectRoute(schedule, item)}
//             activeOpacity={0.8}
//           >
//             <View style={styles.scheduleHeader}>
//               <View style={styles.scheduleTypeContainer}>
//                 <Icon
//                   name={schedule.type === 'Morning' ? 'sun-o' : 'moon-o'}
//                   size={16}
//                   color="#6366F1"
//                 />
//                 <Text style={styles.scheduleType}>{schedule.type}</Text>
//               </View>
//               <View style={styles.durationContainer}>
//                 <Icon name="clock-o" size={12} color="#64748B" />
//                 <Text style={styles.duration}></Text>
//               </View>
//             </View>

//             <View style={styles.timeContainer}>
//               <View style={styles.timeSection}>
//                 <Text style={styles.timeLabel}>Departure</Text>
//                 <Text style={styles.timeValue}>{schedule.startTime}</Text>
//               </View>

//               <View style={styles.journeyLine}>
//                 <View style={styles.journeyDot} />
//                 <View style={styles.journeyTrack} />
//                 <View style={styles.journeyDot} />
//               </View>

//               <View style={styles.timeSection}>
//                 <Text style={styles.timeLabel}>Arrival</Text>
//                 <Text style={styles.timeValue}>{schedule.endTime}</Text>
//               </View>
//             </View>

//             <View style={styles.routeActions}>
//               <TouchableOpacity style={styles.bookRouteButton}>
//                 <Icon name="plus-circle" size={16} color="white" />
//                 <Text style={styles.bookRouteButtonText}>Book This Route</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </Animated.View>
//   );

//   const renderEmptyBookings = () => (
//     <Animated.View style={[styles.emptyState, { opacity: fadeAnim }]}>
//       <Icon name="calendar" size={48} color="#CBD5E1" />
//       <Text style={styles.emptyStateTitle}>No Bookings Yet</Text>
//       <Text style={styles.emptyStateText}>
//         Start by selecting a route below to make your first booking
//       </Text>
//     </Animated.View>
//   );

//   const renderLoadingState = () => (
//     <View style={styles.loadingContainer}>
//       <Text style={styles.loadingText}>Loading routes...</Text>
//     </View>
//   );

//   const renderEmptyRoutes = () => (
//     <View style={styles.emptyRoutesContainer}>
//       <Icon name="road" size={48} color="#CBD5E1" />
//       <Text style={styles.emptyRoutesTitle}>No Routes Available</Text>
//       <Text style={styles.emptyRoutesText}>
//         No routes found for this bus. Please check back later.
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#4F46E5" barStyle="light-content" />

//       {/* Enhanced Header with Gradient */}
//       <LinearGradient
//         colors={['#4F46E5', '#6366F1', '#8B5CF6']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.header}
//       >
//         <TouchableOpacity onPress={handleBackClick} style={styles.backButton}>
//           <View style={styles.backButtonCircle}>
//             <Icon name="arrow-left" size={20} color="#4F46E5" />
//           </View>
//         </TouchableOpacity>

//         <View style={styles.headerContent}>
//           <Text style={styles.headerTitle}>{busInfo.busNumber}</Text>
//           <Text style={styles.headerSubtitle}>Bus Schedule</Text>
//         </View>

//         <TouchableOpacity style={styles.menuButton}>
//           <Icon name="ellipsis-v" size={18} color="#FFFFFF" />
//         </TouchableOpacity>
//       </LinearGradient>

//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         {/* Enhanced Bus Info Card */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoHeader}>
//             <View style={styles.busIconContainer}>
//               <Icon name="bus" size={24} color="#6366F1" />
//             </View>
//             <Text style={styles.infoCardTitle}>Bus Information</Text>
//           </View>

//           <View style={styles.infoContent}>
//             <View style={styles.infoRow}>
//               <View style={styles.infoIconContainer}>
//                 <Icon name="id-card-o" size={16} color="#64748B" />
//               </View>
//               <View style={styles.infoTextContainer}>
//                 <Text style={styles.infoLabel}>Bus Number</Text>
//                 <Text style={styles.infoValue}>{busInfo.busNumber}</Text>
//               </View>
//             </View>

//             <View style={styles.separator} />

//             <View style={styles.infoRow}>
//               <View style={styles.infoIconContainer}>
//                 <Icon name="phone" size={16} color="#64748B" />
//               </View>
//               <View style={styles.infoTextContainer}>
//                 <Text style={styles.infoLabel}>Contact Number</Text>
//                 <View style={styles.contactRow}>
//                   <Text style={styles.infoValue}>
//                     {getNo(busInfo.busNumber).phone}
//                   </Text>
//                   <Text style={styles.flag}>🇱🇰</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* My Bookings Section */}
//         {savedBookings.length > 0 ? (
//           <View style={styles.bookingsSection}>
//             <View style={styles.sectionHeader}>
//               <Icon name="check-circle" size={20} color="#10B981" />
//               <Text style={styles.sectionTitle}>My Bookings</Text>
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>{savedBookings.length}</Text>
//               </View>
//             </View>
//             <FlatList
//               data={savedBookings}
//               renderItem={renderBookingCard}
//               keyExtractor={item => item.id}
//               scrollEnabled={false}
//               showsVerticalScrollIndicator={false}
//             />
//           </View>
//         ) : (
//           <View style={styles.bookingsSection}>
//             <View style={styles.sectionHeader}>
//               <Icon name="check-circle" size={20} color="#10B981" />
//               <Text style={styles.sectionTitle}>My Bookings</Text>
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>0</Text>
//               </View>
//             </View>
//             {renderEmptyBookings()}
//           </View>
//         )}

//         {/* Routes Section */}
//         <View style={styles.routesSection}>
//           <View style={styles.sectionHeader}>
//             <Icon name="plus-circle" size={20} color="#6366F1" />
//             <Text style={styles.sectionTitle}>Book New Route</Text>
//           </View>
//           {loading ? (
//             renderLoadingState()
//           ) : dailyRoutes.length > 0 ? (
//             <FlatList
//               data={dailyRoutes}
//               renderItem={renderRoute}
//               keyExtractor={item => item.id}
//               scrollEnabled={false}
//               showsVerticalScrollIndicator={false}
//             />
//           ) : (
//             renderEmptyRoutes()
//           )}
//         </View>

//         {/* Enhanced Seats Info */}
//         <View style={styles.seatsCard}>
//           <View style={styles.seatsHeader}>
//             <Icon name="users" size={10} color="#10B981" />
//             <Text style={styles.seatsTitle}>Seat Availability</Text>
//           </View>
//           <View style={styles.seatsContent}>
//             <Text style={styles.availableSeats}>10</Text>
//             <Text style={styles.seatsLabel}>seats remaining</Text>
//           </View>
//           <View style={styles.seatsProgress}>
//             <View style={styles.seatsProgressFilled} />
//           </View>
//         </View>

//         <View style={styles.bottomSpacing} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingBottom: 25,
//     paddingHorizontal: 20,
//     shadowColor: '#4F46E5',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   backButton: {
//     marginRight: 15,
//   },
//   backButtonCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   headerContent: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     color: '#FFFFFF',
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 2,
//   },
//   headerSubtitle: {
//     color: '#E0E7FF',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   menuButton: {
//     width: 40,
//     alignItems: 'center',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   infoCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     marginTop: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 4,
//   },
//   infoHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     paddingBottom: 15,
//   },
//   busIconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#EEF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   infoCardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1E293B',
//   },
//   infoContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   infoIconContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#F1F5F9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   infoTextContainer: {
//     flex: 1,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginBottom: 2,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   infoValue: {
//     fontSize: 16,
//     color: '#1E293B',
//     fontWeight: '600',
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   flag: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#F1F5F9',
//     marginVertical: 8,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginLeft: 8,
//     flex: 1,
//   },
//   badge: {
//     backgroundColor: '#6366F1',
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     minWidth: 24,
//     alignItems: 'center',
//   },
//   badgeText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   bookingsSection: {
//     marginTop: 30,
//   },
//   routesSection: {
//     marginTop: 30,
//   },
//   loadingContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   emptyRoutesContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   emptyRoutesTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#64748B',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptyRoutesText: {
//     fontSize: 14,
//     color: '#94A3B8',
//     textAlign: 'center',
//     lineHeight: 20,
//     paddingHorizontal: 20,
//   },
//   routeContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   routeTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   routeTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1E293B',
//   },
//   arrowIcon: {
//     marginHorizontal: 12,
//   },
//   schedulesContainer: {
//     gap: 12,
//   },
//   scheduleCard: {
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//   },
//   scheduleHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   scheduleTypeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   scheduleType: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#6366F1',
//     marginLeft: 6,
//   },
//   durationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   duration: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginLeft: 4,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   timeSection: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   timeLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   timeValue: {
//     fontSize: 18,
//     color: '#1E293B',
//     fontWeight: '700',
//   },
//   journeyLine: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 2,
//     paddingHorizontal: 20,
//   },
//   journeyDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#6366F1',
//   },
//   journeyTrack: {
//     flex: 1,
//     height: 2,
//     backgroundColor: '#CBD5E1',
//     marginHorizontal: 8,
//   },
//   routeActions: {
//     marginTop: 8,
//   },
//   bookRouteButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#6366F1',
//     paddingVertical: 12,
//     borderRadius: 10,
//     gap: 8,
//   },
//   bookRouteButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   bookingCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '##64748B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 3,
//     borderLeftWidth: 4,
//     borderLeftColor: '#10B981',
//   },
//   bookingHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   bookingRoute: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   bookingRouteText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginLeft: 8,
//   },
//   bookingScheduleText: {
//     fontSize: 14,
//     color: '#64748B',
//     marginLeft: 8,
//   },
//   bookingDetails: {
//     marginBottom: 12,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 6,
//   },
//   detailText: {
//     fontSize: 13,
//     color: '#666',
//     marginLeft: 8,
//     fontWeight: '500',
//   },
//   deleteButton: {
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: '#FEE2E2',
//   },
//   datesScroll: {
//     marginBottom: 12,
//   },
//   dateBookingCard: {
//     backgroundColor: '#F0FDF4',
//     borderRadius: 8,
//     padding: 12,
//     marginRight: 8,
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   dateText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#15803D',
//   },
//   seatText: {
//     fontSize: 12,
//     color: '#166534',
//     marginTop: 2,
//   },
//   bookingActions: {
//     marginBottom: 8,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//     backgroundColor: '#EEF2FF',
//   },
//   actionButtonText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#6366F1',
//     marginLeft: 6,
//   },
//   bookingFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 8,
//     borderTopWidth: 1,
//     borderTopColor: '#F1F5F9',
//   },
//   totalDatesText: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   bookingTimeText: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   emptyState: {
//     alignItems: 'center',
//     paddingVertical: 40,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     marginBottom: 20,
//   },
//   emptyStateTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#64748B',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptyStateText: {
//     fontSize: 14,
//     color: '#94A3B8',
//     textAlign: 'center',
//     lineHeight: 20,
//     paddingHorizontal: 20,
//   },
//   seatsCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     marginTop: 20,
//     shadowColor: '#64748B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   seatsHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   seatsTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginLeft: 10,
//   },
//   seatsContent: {
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   availableSeats: {
//     fontSize: 32,
//     fontWeight: '800',
//     color: '#10B981',
//     marginBottom: 4,
//   },
//   seatsLabel: {
//     fontSize: 14,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   seatsProgress: {
//     height: 6,
//     backgroundColor: '#E2E8F0',
//     borderRadius: 3,
//     overflow: 'hidden',
//   },
//   seatsProgressFilled: {
//     height: '100%',
//     width: '33%',
//     backgroundColor: '#10B981',
//     borderRadius: 3,
//   },
//   bottomSpacing: {
//     height: 100,
//   },
// });//////////////////////////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
  Alert,
  Animated,
  RefreshControl,
  Modal,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// DISCOUNT CONFIGURATION - Change this value to adjust discount
const DISCOUNT_PERCENTAGE = 15; // 15% discount

export default function BusScheduleScreen({ navigation, route }) {
  // Correctly extract parameters from route
  const busId = route?.params?.busId || 'ACD-01-DB';
  const busNumber = route?.params?.busNumber || 'ACD-01-DB';

  // Create busInfo object from the parameters
  const busInfo = {
    busId: busId,
    busNumber: busNumber,
  };

  async function getOwnerData() {
    try {
      const users = await getUserData();
      for (const user of users) {
        if (Array.isArray(user.bus)) {
          const owner = users.find(
            user => user.bus && user.bus.some(bus => bus.id === busId),
          );
          return owner;
        }
      }
    } catch (error) {
      console.log('Error getting owner data:', error);
      return null;
    }
  }

  const [savedBookings, setSavedBookings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [dailyRoutes, setDailyRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedBookingForPayment, setSelectedBookingForPayment] =
    useState(null);
  const [ownerData, setOwnerData] = useState(null);

  // Function to get user data from AsyncStorage
  const getUserData = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem('usersArray');
      if (userData !== null) {
        return JSON.parse(userData);
      }
      return [];
    } catch (error) {
      console.log('Error retrieving user data:', error);
      return [];
    }
  }, []);

  // Function to get default routes as fallback
  const getDefaultRoutes = useCallback(
    () => [
      {
        id: 'galle-makubura',
        start: 'Galle',
        end: 'Makubura',
        schedules: [
          {
            id: 'morning',
            startTime: '06:00',
            endTime: '08:30',
            type: 'Morning',
            fare: 2000,
            busInfo: { number: busInfo.busNumber, capacity: 40 },
          },
          {
            id: 'afternoon',
            startTime: '12:00',
            endTime: '14:30',
            type: 'Afternoon',
            fare: 2000,
            busInfo: { number: busInfo.busNumber, capacity: 40 },
          },
        ],
      },
    ],
    [busInfo.busNumber],
  );

  // Transform bus data from AsyncStorage to route format
  const transformBusDataToRoutes = useCallback(
    busData => {
      if (!busData || !busData.schedules || !Array.isArray(busData.schedules)) {
        return getDefaultRoutes();
      }

      // Group schedules by route (start-end combination)
      const routeMap = {};
      console.log('busData', busData);
      busData.schedules.forEach((schedule, index) => {
        const start = schedule.route.startLocation || 'Galle';
        const end = schedule.route.endLocation || 'Makubura';
        const routeKey = `${start}-${end}`;

        if (!routeMap[routeKey]) {
          routeMap[routeKey] = {
            id: routeKey.toLowerCase(),
            start: start,
            end: end,
            schedules: [],
          };
        }

        routeMap[routeKey].schedules.push({
          id: schedule.id || `schedule-${index}`,
          startTime: schedule.startTime || '06:00',
          endTime: schedule.endTime || '08:30',
          type: schedule.type || 'Standard',
          fare: schedule.fare || 2000,
          busInfo: {
            number: busInfo.busNumber,
            capacity: schedule.capacity || 40,
          },
        });
      });

      const routes = Object.values(routeMap);
      return routes.length > 0 ? routes : getDefaultRoutes();
    },
    [busInfo.busNumber, getDefaultRoutes],
  );

  // Function to load bus data and routes
  const getBusData = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Loading bus data for ID:', busInfo.busId);

      const users = await getUserData();
      console.log('Users data loaded:', users.length, 'users');

      let foundBus = null;

      // Search through users to find the bus
      for (const user of users) {
        if (Array.isArray(user.bus)) {
          const bus = user.bus.find(b => b.id === busInfo.busId);
          if (bus) {
            console.log('Found bus:', bus);
            foundBus = bus;
            setOwnerData(user); // Set owner data
            break;
          }
        }
      }

      if (foundBus) {
        console.log('Bus schedules:', foundBus.schedules);
        const transformedRoutes = transformBusDataToRoutes(foundBus);
        console.log('Transformed routes:', transformedRoutes);
        setDailyRoutes(transformedRoutes);
      } else {
        console.log('No bus data found, using default routes');
        setDailyRoutes(getDefaultRoutes());
      }
    } catch (error) {
      console.log('Error loading bus data:', error);
      setDailyRoutes(getDefaultRoutes());
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    busInfo.busId,
    busInfo.busNumber,
    getDefaultRoutes,
    getUserData,
    transformBusDataToRoutes,
  ]);

  // Focus effect hook
  useFocusEffect(
    useCallback(() => {
      getBusData();
      return () => console.log('Screen unfocused');
    }, [getBusData]),
  );

  const animateIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    loadSavedBookings();
    animateIn();
    getBusData();

    const unsubscribe = navigation.addListener('focus', () => {
      loadSavedBookings();
      getBusData();
    });
    return unsubscribe;
  }, [navigation, animateIn, getBusData]);

  const loadSavedBookings = async () => {
    try {
      const bookings = await AsyncStorage.getItem('busBookings');
      if (bookings) {
        setSavedBookings(JSON.parse(bookings));
      }
    } catch (error) {
      console.log('Error loading bookings:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadSavedBookings(), getBusData()]);
    setRefreshing(false);
  }, [getBusData]);

  const handleBackClick = () => {
    navigation.goBack();
  };

  const storeScheduleData = async scheduleData => {
    try {
      await AsyncStorage.setItem(
        'selectedSchedule',
        JSON.stringify(scheduleData),
      );
      console.log('Schedule saved locally!');
    } catch (error) {
      console.log('Error saving schedule:', error);
    }
  };

  const selectRoute = async (schedule, routeInfo) => {
    try {
      const routeData = {
        ...schedule,
        route: {
          Start: routeInfo.start,
          End: routeInfo.end,
        },
        busNumber: busInfo.busNumber,
        start: routeInfo.start,
        end: routeInfo.end,
      };
      await AsyncStorage.setItem('selectedRoute', JSON.stringify(routeData));
      await storeScheduleData(routeData);
      navigation.navigate('BoockingDate', {
        busId: busInfo.busId,
        busNumber: busInfo.busNumber,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to select route. Please try again.');
    }
  };

  const deleteBooking = async bookingId => {
    Alert.alert(
      'Delete Booking',
      'Are you sure you want to delete this booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedBookings = savedBookings.filter(
                booking => booking.id !== bookingId,
              );
              await AsyncStorage.setItem(
                'busBookings',
                JSON.stringify(updatedBookings),
              );
              setSavedBookings(updatedBookings);
              Alert.alert('Success', 'Booking deleted successfully!');
            } catch (error) {
              console.log('Error deleting booking:', error);
              Alert.alert('Error', 'Failed to delete booking');
            }
          },
        },
      ],
    );
  };

  const calculateDiscountedAmount = originalAmount => {
    const discount = (originalAmount * DISCOUNT_PERCENTAGE) / 100;
    const discountedAmount = originalAmount - discount;
    return {
      originalAmount,
      discount,
      discountedAmount,
      discountPercentage: DISCOUNT_PERCENTAGE,
    };
  };

  const initiatePayment = booking => {
    const totalAmount = booking.fareDetails
      ? booking.fareDetails.totalAmount
      : booking.dates
      ? booking.dates.reduce(
          (sum, date) => sum + (date.seats ? date.seats.length : 1),
          0,
        ) * 2000
      : 2000;

    const paymentDetails = calculateDiscountedAmount(totalAmount);

    setSelectedBookingForPayment({
      ...booking,
      paymentDetails,
    });
    setPaymentModalVisible(true);
  };

  const processPayment = async () => {
    try {
      // Simulate payment processing
      Alert.alert(
        'Payment Processing',
        'Please wait while we process your payment...',
        [],
        { cancelable: false },
      );

      // Simulate API call delay
      setTimeout(() => {
        Alert.alert(
          'Payment Successful!',
          `Your payment of LKR ${selectedBookingForPayment.paymentDetails.discountedAmount.toLocaleString()} has been processed successfully.\n\nYou saved LKR ${selectedBookingForPayment.paymentDetails.discount.toLocaleString()} (${DISCOUNT_PERCENTAGE}% discount)!`,
          [
            {
              text: 'OK',
              onPress: () => {
                setPaymentModalVisible(false);
                setSelectedBookingForPayment(null);
              },
            },
          ],
        );
      }, 2000);
    } catch (error) {
      Alert.alert(
        'Payment Failed',
        'There was an error processing your payment. Please try again.',
      );
    }
  };

  const viewBookingDetails = booking => {
    const totalSeats = booking.dates
      ? booking.dates.reduce(
          (sum, date) => sum + (date.seats ? date.seats.length : 1),
          0,
        )
      : 1;
    const datesList = booking.dates
      ? booking.dates
          .map(d => `${d.date}: Seats ${d.seats ? d.seats.join(', ') : 'N/A'}`)
          .join('\n')
      : 'No dates available';

    const totalAmount = booking.fareDetails
      ? booking.fareDetails.totalAmount
      : totalSeats * 2000;
    const paymentDetails = calculateDiscountedAmount(totalAmount);

    Alert.alert(
      'Booking Details',
      `Route: ${booking.route}\n` +
        `Time: ${booking.startTime} - ${booking.endTime}\n` +
        `Type: ${booking.type || 'Standard'}\n` +
        `Bus: ${booking.busInfo ? booking.busInfo.number : 'N/A'}\n` +
        `Total Dates: ${booking.dates ? booking.dates.length : 0}\n` +
        `Total Seats: ${totalSeats}\n\n` +
        `Booking Details:\n${datesList}\n\n` +
        `Amount: LKR ${totalAmount.toLocaleString()}\n` +
        `With ${DISCOUNT_PERCENTAGE}% Discount: LKR ${paymentDetails.discountedAmount.toLocaleString()}\n\n` +
        `Booked on: ${new Date(booking.bookingDate).toLocaleString()}`,
      [
        { text: 'OK' },
        {
          text: 'Pay Now',
          onPress: () => initiatePayment(booking),
        },
      ],
    );
  };

  // Calculate available seats (commented out the seat availability section)
  const calculateAvailableSeats = () => {
    const totalCapacity = 75; // 15 rows * 5 seats per row
    const bookedSeats = savedBookings.reduce((total, booking) => {
      return (
        total +
        (booking.dates
          ? booking.dates.reduce(
              (sum, date) => sum + (date.seats ? date.seats.length : 1),
              0,
            )
          : 1)
      );
    }, 0);
    return totalCapacity - bookedSeats;
  };

  const renderPaymentModal = () => {
    if (!selectedBookingForPayment) return null;

    const { paymentDetails } = selectedBookingForPayment;

    return (
      <Modal
        visible={paymentModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.paymentModal}>
            <View style={styles.paymentHeader}>
              <Text style={styles.paymentTitle}>Payment Details</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setPaymentModalVisible(false)}
              >
                <Icon name="times" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.paymentContent}>
              <View style={styles.bookingSummary}>
                <Text style={styles.summaryTitle}>Booking Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Route:</Text>
                  <Text style={styles.summaryValue}>
                    {selectedBookingForPayment.route.startLocation} -{' '}
                    {selectedBookingForPayment.route.endLocation}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Time:</Text>
                  <Text style={styles.summaryValue}>
                    {selectedBookingForPayment.startTime} -{' '}
                    {selectedBookingForPayment.endTime}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Total Seats:</Text>
                  <Text style={styles.summaryValue}>
                    {selectedBookingForPayment.dates
                      ? selectedBookingForPayment.dates.reduce(
                          (sum, date) =>
                            sum + (date.seats ? date.seats.length : 1),
                          0,
                        )
                      : 1}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Dates:</Text>
                  <Text style={styles.summaryValue}>
                    {selectedBookingForPayment.dates
                      ? selectedBookingForPayment.dates.length
                      : 0}
                  </Text>
                </View>
              </View>

              <View style={styles.paymentBreakdown}>
                <Text style={styles.breakdownTitle}>Payment Breakdown</Text>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Original Amount:</Text>
                  <Text style={styles.breakdownValue}>
                    LKR {paymentDetails.originalAmount.toLocaleString()}
                  </Text>
                </View>

                <View style={styles.discountRow}>
                  <Text style={styles.discountLabel}>
                    Discount ({paymentDetails.discountPercentage}%):
                  </Text>
                  <Text style={styles.discountValue}>
                    -LKR {paymentDetails.discount.toLocaleString()}
                  </Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total to Pay:</Text>
                  <Text style={styles.totalValue}>
                    LKR {paymentDetails.discountedAmount.toLocaleString()}
                  </Text>
                </View>

                <View style={styles.savingsRow}>
                  <Text style={styles.savingsText}>
                    You save LKR {paymentDetails.discount.toLocaleString()}!
                  </Text>
                </View>
              </View>

              <View style={styles.paymentMethods}>
                <Text style={styles.methodsTitle}>Payment Methods</Text>
                <TouchableOpacity style={styles.paymentMethod}>
                  <Icon name="credit-card" size={20} color="#6366F1" />
                  <Text style={styles.methodText}>Credit/Debit Card</Text>
                  <Icon name="chevron-right" size={16} color="#94A3B8" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMethod}>
                  <Icon name="mobile" size={20} color="#6366F1" />
                  <Text style={styles.methodText}>Mobile Payment</Text>
                  <Icon name="chevron-right" size={16} color="#94A3B8" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMethod}>
                  <Icon name="bank" size={20} color="#6366F1" />
                  <Text style={styles.methodText}>Bank Transfer</Text>
                  <Icon name="chevron-right" size={16} color="#94A3B8" />
                </TouchableOpacity>
              </View>
            </ScrollView>

            <View style={styles.paymentFooter}>
              <TouchableOpacity
                style={styles.payButton}
                onPress={processPayment}
              >
                <Icon name="lock" size={16} color="white" />
                <Text style={styles.payButtonText}>
                  Pay LKR {paymentDetails.discountedAmount.toLocaleString()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderBookingCard = ({ item }) => (
    <Animated.View style={[styles.bookingCard, { opacity: fadeAnim }]}>
      <View style={styles.bookingHeader}>
        <View style={styles.bookingRoute}>
          <Icon name="map-marker" size={14} color="#10B981" />
          <Text style={styles.bookingRouteText}>
            {item.route.startLocation}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteBooking(item.id)}
        >
          <Icon name="trash" size={14} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Icon name="clock-o" size={12} color="#666" />
          <Text style={styles.bookingScheduleText}>
            {item.startTime} - {item.endTime}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="tag" size={12} color="#666" />
          <Text style={styles.detailText}>{item.type || 'Standard'}</Text>
        </View>

        {item.dates && item.dates.length > 0 && (
          <View style={styles.detailRow}>
            <Icon name="calendar" size={12} color="#666" />
            <Text style={styles.detailText}>Next: {item.dates[0].date}</Text>
          </View>
        )}

        <View style={styles.detailRow}>
          <Icon name="users" size={12} color="#666" />
          <Text style={styles.detailText}>
            {item.dates
              ? item.dates.reduce(
                  (sum, date) => sum + (date.seats ? date.seats.length : 1),
                  0,
                )
              : 1}{' '}
            seat(s) ({item.dates ? item.dates.length : 0} date
            {item.dates && item.dates.length > 1 ? 's' : ''})
          </Text>
        </View>

        {item.busInfo && (
          <View style={styles.detailRow}>
            <Icon name="bus" size={12} color="#666" />
            <Text style={styles.detailText}>Bus: {item.busInfo.number}</Text>
          </View>
        )}

        {/* Fare Information */}
        <View style={styles.fareSection}>
          <View style={styles.detailRow}>
            <Icon name="money" size={12} color="#10B981" />
            <Text style={styles.fareText}>
              Amount: LKR{' '}
              {item.fareDetails
                ? item.fareDetails.totalAmount.toLocaleString()
                : (
                    (item.dates
                      ? item.dates.reduce(
                          (sum, date) =>
                            sum + (date.seats ? date.seats.length : 1),
                          0,
                        )
                      : 1) * 2000
                  ).toLocaleString()}
            </Text>
          </View>

          {(() => {
            const totalAmount = item.fareDetails
              ? item.fareDetails.totalAmount
              : (item.dates
                  ? item.dates.reduce(
                      (sum, date) => sum + (date.seats ? date.seats.length : 1),
                      0,
                    )
                  : 1) * 2000;
            const discountDetails = calculateDiscountedAmount(totalAmount);
            return (
              <View style={styles.discountSection}>
                <Text style={styles.discountText}>
                  With {DISCOUNT_PERCENTAGE}% discount: LKR{' '}
                  {discountDetails.discountedAmount.toLocaleString()}
                </Text>
                <Text style={styles.savingsText}>
                  Save LKR {discountDetails.discount.toLocaleString()}
                </Text>
              </View>
            );
          })()}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.datesScroll}
      >
        {item.dates &&
          item.dates.map((dateItem, index) => (
            <View key={index} style={styles.dateBookingCard}>
              <Text style={styles.dateText}>{dateItem.date}</Text>
              <Text style={styles.seatText}>
                Seats: {dateItem.seats ? dateItem.seats.join(', ') : 'N/A'}
              </Text>
              {dateItem.totalAmount && (
                <Text style={styles.dateAmountText}>
                  LKR {dateItem.totalAmount.toLocaleString()}
                </Text>
              )}
            </View>
          ))}
      </ScrollView>

      <View style={styles.bookingActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => viewBookingDetails(item)}
        >
          <Icon name="eye" size={14} color="#6366F1" />
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.payNowButton}
          onPress={() => initiatePayment(item)}
        >
          <Icon name="credit-card" size={14} color="white" />
          <Text style={styles.payNowButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bookingFooter}>
        <Text style={styles.totalDatesText}>
          {item.dates ? item.dates.length : 0} dates booked
        </Text>
        <Text style={styles.bookingTimeText}>
          Booked: {new Date(item.bookingDate).toLocaleDateString()}
        </Text>
      </View>
    </Animated.View>
  );

  const renderRoute = ({ item }) => (
    <Animated.View style={[styles.routeContainer, { opacity: fadeAnim }]}>
      <View style={styles.routeTitleContainer}>
        <Text style={styles.routeTitle}>{item.start}</Text>
        <Icon
          name="arrow-right"
          size={18}
          color="#6366F1"
          style={styles.arrowIcon}
        />
        <Text style={styles.routeTitle}>{item.end}</Text>
      </View>

      <View style={styles.schedulesContainer}>
        {item.schedules.map(schedule => (
          <TouchableOpacity
            key={schedule.id}
            style={styles.scheduleCard}
            onPress={() => selectRoute(schedule, item)}
            activeOpacity={0.8}
          >
            <View style={styles.scheduleHeader}>
              <View style={styles.scheduleTypeContainer}>
                <Icon
                  name={schedule.type === 'Morning' ? 'sun-o' : 'moon-o'}
                  size={16}
                  color="#6366F1"
                />
                <Text style={styles.scheduleType}>{schedule.type}</Text>
              </View>
              <View style={styles.fareContainer}>
                <Icon name="money" size={12} color="#10B981" />
                <Text style={styles.farePrice}>
                  LKR {(schedule.fare || 2000).toLocaleString()}
                </Text>
              </View>
            </View>

            <View style={styles.timeContainer}>
              <View style={styles.timeSection}>
                <Text style={styles.timeLabel}>Departure</Text>
                <Text style={styles.timeValue}>{schedule.startTime}</Text>
              </View>

              <View style={styles.journeyLine}>
                <View style={styles.journeyDot} />
                <View style={styles.journeyTrack} />
                <View style={styles.journeyDot} />
              </View>

              <View style={styles.timeSection}>
                <Text style={styles.timeLabel}>Arrival</Text>
                <Text style={styles.timeValue}>{schedule.endTime}</Text>
              </View>
            </View>

            <View style={styles.routeActions}>
              <TouchableOpacity style={styles.bookRouteButton}>
                <Icon name="plus-circle" size={16} color="white" />
                <Text style={styles.bookRouteButtonText}>Book This Route</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );

  const renderEmptyBookings = () => (
    <Animated.View style={[styles.emptyState, { opacity: fadeAnim }]}>
      <Icon name="calendar" size={48} color="#CBD5E1" />
      <Text style={styles.emptyStateTitle}>No Bookings Yet</Text>
      <Text style={styles.emptyStateText}>
        Start by selecting a route below to make your first booking
      </Text>
    </Animated.View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading routes...</Text>
    </View>
  );

  const renderEmptyRoutes = () => (
    <View style={styles.emptyRoutesContainer}>
      <Icon name="road" size={48} color="#CBD5E1" />
      <Text style={styles.emptyRoutesTitle}>No Routes Available</Text>
      <Text style={styles.emptyRoutesText}>
        No routes found for this bus. Please check back later.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4F46E5" barStyle="light-content" />

      {/* Enhanced Header with Gradient */}
      <LinearGradient
        colors={['#4F46E5', '#6366F1', '#8B5CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={handleBackClick} style={styles.backButton}>
          <View style={styles.backButtonCircle}>
            <Icon name="arrow-left" size={20} color="#4F46E5" />
          </View>
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{busInfo.busNumber}</Text>
          <Text style={styles.headerSubtitle}>Bus Schedule</Text>
        </View>

        <TouchableOpacity style={styles.menuButton}>
          <Icon name="ellipsis-v" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Enhanced Bus Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <View style={styles.busIconContainer}>
              <Icon name="bus" size={24} color="#6366F1" />
            </View>
            <Text style={styles.infoCardTitle}>Bus Information</Text>
          </View>

          <View style={styles.infoContent}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Icon name="id-card-o" size={16} color="#64748B" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Bus Number</Text>
                <Text style={styles.infoValue}>{busInfo.busNumber}</Text>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Icon name="phone" size={16} color="#64748B" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Contact Number</Text>
                <View style={styles.contactRow}>
                  <Text style={styles.infoValue}>
                    {ownerData ? ownerData.phone : '0785236546'}
                  </Text>
                  <Text style={styles.flag}>🇱🇰</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* My Bookings Section */}
        {savedBookings.length > 0 ? (
          <View style={styles.bookingsSection}>
            <View style={styles.sectionHeader}>
              <Icon name="check-circle" size={20} color="#10B981" />
              <Text style={styles.sectionTitle}>My Bookings</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{savedBookings.length}</Text>
              </View>
            </View>
            <FlatList
              data={savedBookings}
              renderItem={renderBookingCard}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <View style={styles.bookingsSection}>
            <View style={styles.sectionHeader}>
              <Icon name="check-circle" size={20} color="#10B981" />
              <Text style={styles.sectionTitle}>My Bookings</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>0</Text>
              </View>
            </View>
            {renderEmptyBookings()}
          </View>
        )}

        {/* Routes Section */}
        <View style={styles.routesSection}>
          <View style={styles.sectionHeader}>
            <Icon name="plus-circle" size={20} color="#6366F1" />
            <Text style={styles.sectionTitle}>Book New Route</Text>
          </View>
          {loading ? (
            renderLoadingState()
          ) : dailyRoutes.length > 0 ? (
            <FlatList
              data={dailyRoutes}
              renderItem={renderRoute}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            renderEmptyRoutes()
          )}
        </View>

        {/* Commented out Seats Info - as requested */}
        {/*
        <View style={styles.seatsCard}>
          <View style={styles.seatsHeader}>
            <Icon name="users" size={10} color="#10B981" />
            <Text style={styles.seatsTitle}>Seat Availability</Text>
          </View>
          <View style={styles.seatsContent}>
            <Text style={styles.availableSeats}>{calculateAvailableSeats()}</Text>
            <Text style={styles.seatsLabel}>seats remaining</Text>
          </View>
          <View style={styles.seatsProgress}>
            <View style={styles.seatsProgressFilled} />
          </View>
        </View>
        */}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Payment Modal */}
      {renderPaymentModal()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  backButton: {
    marginRight: 15,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
  },
  headerSubtitle: {
    color: '#E0E7FF',
    fontSize: 14,
    fontWeight: '500',
  },
  menuButton: {
    width: 40,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 15,
  },
  busIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  infoContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 16,
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 8,
    flex: 1,
  },
  badge: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  bookingsSection: {
    marginTop: 30,
  },
  routesSection: {
    marginTop: 30,
  },
  loadingContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  emptyRoutesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyRoutesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyRoutesText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  routeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  routeTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  arrowIcon: {
    marginHorizontal: 12,
  },
  schedulesContainer: {
    gap: 12,
  },
  scheduleCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scheduleTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
    marginLeft: 6,
  },
  fareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  farePrice: {
    fontSize: 12,
    color: '#15803D',
    fontWeight: '700',
    marginLeft: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeSection: {
    alignItems: 'center',
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 18,
    color: '#1E293B',
    fontWeight: '700',
  },
  journeyLine: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    paddingHorizontal: 20,
  },
  journeyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366F1',
  },
  journeyTrack: {
    flex: 1,
    height: 2,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 8,
  },
  routeActions: {
    marginTop: 8,
  },
  bookRouteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  bookRouteButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '##64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingRoute: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingRouteText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 8,
  },
  bookingScheduleText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
  },
  bookingDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    fontWeight: '500',
  },
  fareSection: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  fareText: {
    fontSize: 14,
    color: '#15803D',
    fontWeight: '600',
    marginLeft: 8,
  },
  discountSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#BBF7D0',
  },
  discountText: {
    fontSize: 13,
    color: '#16A34A',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  savingsText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '700',
    textAlign: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
  },
  datesScroll: {
    marginBottom: 12,
  },
  dateBookingCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#15803D',
  },
  seatText: {
    fontSize: 12,
    color: '#166534',
    marginTop: 2,
  },
  dateAmountText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '700',
    marginTop: 4,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366F1',
    marginLeft: 6,
  },
  payNowButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#10B981',
  },
  payNowButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    marginLeft: 6,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  totalDatesText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  bookingTimeText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  seatsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  seatsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  seatsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 10,
  },
  seatsContent: {
    alignItems: 'center',
    marginBottom: 15,
  },
  availableSeats: {
    fontSize: 32,
    fontWeight: '800',
    color: '#10B981',
    marginBottom: 4,
  },
  seatsLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  seatsProgress: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  seatsProgressFilled: {
    height: '100%',
    width: '33%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  // Payment Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  paymentModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.85,
    paddingBottom: 30,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  paymentContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bookingSummary: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  paymentBreakdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  breakdownValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#FEF3C7',
    padding: 8,
    borderRadius: 8,
  },
  discountLabel: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '600',
  },
  discountValue: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '700',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  totalLabel: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 18,
    color: '#10B981',
    fontWeight: '800',
  },
  savingsRow: {
    alignItems: 'center',
    marginTop: 8,
    padding: 8,
    backgroundColor: '#ECFDF5',
    borderRadius: 8,
  },
  paymentMethods: {
    marginBottom: 20,
  },
  methodsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  methodText: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
    marginLeft: 12,
  },
  paymentFooter: {
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomSpacing: {
    height: 100,
  },
});
