// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
//   Alert,
//   ScrollView,
//   Dimensions,
//   Animated,
//   Platform,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width, height } = Dimensions.get('window');

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

// // Fallback icon components (simple text-based icons)
// const SimpleIcon = ({ name, size = 20, color = 'white', style }) => {
//   const iconMap = {
//     'arrow-back': '←',
//     'checkmark-circle': '✓',
//     'information-circle-outline': 'ℹ',
//     calendar: '📅',
//     time: '⏰',
//   };

//   return (
//     <Text style={[{ fontSize: size, color, textAlign: 'center' }, style]}>
//       {iconMap[name] || '•'}
//     </Text>
//   );
// };

// const BookingScreen = ({ navigation }) => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [calendarDays, setCalendarDays] = useState([]);
//   const [currentMonth, setCurrentMonth] = useState('January 2025');
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [slideAnim] = useState(new Animated.Value(-50));

//   const animateIn = useCallback(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [fadeAnim, slideAnim]);

//   useEffect(() => {
//     generateCalendar();
//     animateIn();
//   }, [animateIn]);

//   const generateCalendar = () => {
//     const today = new Date();
//     const currentMonth = today.getMonth();
//     const currentYear = today.getFullYear();
//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//     const days = [];
//     for (let i = 1; i <= daysInMonth; i++) {
//       const date = new Date(currentYear, currentMonth, i);
//       const isWeekend = date.getDay() === 0 || date.getDay() === 6;
//       const isPast = i < today.getDate() && currentMonth === today.getMonth();

//       days.push({
//         day: i,
//         isWeekend,
//         isPast,
//         isToday: i === today.getDate() && currentMonth === today.getMonth(),
//       });
//     }
//     setCalendarDays(days);
//   };

//   const selectDate = dayObj => {
//     if (dayObj.isPast) {
//       Alert.alert('Invalid Date', 'Cannot select past dates!');
//       return;
//     }

//     // Simple scale animation without complex animations
//     setSelectedDate(dayObj.day);
//   };

//   const selectTime = time => {
//     setSelectedTime(time);
//   };

//   const bookAppointment = () => {
//     if (!selectedDate || !selectedTime) {
//       Alert.alert(
//         '⚠️ Selection Required',
//         'Please select both date and time before booking!',
//         [{ text: 'OK', style: 'default' }],
//       );
//       return;
//     }

//     Alert.alert(
//       '✅ Booking Confirmed',
//       `Your appointment has been booked successfully!\n\n📅 Date: ${selectedDate} ${currentMonth}\n⏰ Time: ${selectedTime.label}\n\n📧 Confirmation email will be sent shortly.`,
//       [
//         {
//           text: 'OK',
//           onPress: () => {
//             setSelectedDate(null);
//             setSelectedTime(null);
//             setTimeout(() => navigation.goBack(), 500);
//           },
//         },
//       ],
//     );
//   };

//   const goBack = () => {
//     Alert.alert(
//       'Confirm Navigation',
//       'Are you sure you want to go back? Any unsaved selections will be lost.',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Yes, Go Back',
//           style: 'destructive',
//           onPress: () => navigation.goBack(),
//         },
//       ],
//     );
//   };

//   const renderCalendarGrid = () => {
//     return (
//       <Animated.View
//         style={[
//           styles.calendar,
//           { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
//         ]}
//       >
//         {/* Calendar Header */}
//         <View style={styles.calendarHeader}>
//           <Text style={styles.monthText}>{currentMonth}</Text>
//           <View style={styles.weekDays}>
//             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//               <Text key={day} style={styles.weekDayText}>
//                 {day}
//               </Text>
//             ))}
//           </View>
//         </View>

//         {/* Calendar Days */}
//         <View style={styles.daysGrid}>
//           {calendarDays.map(dayObj => (
//             <TouchableOpacity
//               key={dayObj.day}
//               style={[
//                 styles.dateCell,
//                 dayObj.isToday && styles.todayCell,
//                 selectedDate === dayObj.day && styles.selectedDateCell,
//                 dayObj.isPast && styles.pastDateCell,
//                 dayObj.isWeekend && styles.weekendCell,
//               ]}
//               onPress={() => selectDate(dayObj)}
//               activeOpacity={dayObj.isPast ? 1 : 0.7}
//               disabled={dayObj.isPast}
//             >
//               <Text
//                 style={[
//                   styles.dateCellText,
//                   dayObj.isToday && styles.todayText,
//                   selectedDate === dayObj.day && styles.selectedDateText,
//                   dayObj.isPast && styles.pastDateText,
//                   dayObj.isWeekend && styles.weekendText,
//                 ]}
//               >
//                 {dayObj.day}
//               </Text>
//               {dayObj.isToday && <View style={styles.todayDot} />}
//               {selectedDate === dayObj.day && (
//                 <View style={styles.selectedIndicator}>
//                   <Text style={styles.selectedCheckmark}>✓</Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           ))}
//         </View>
//       </Animated.View>
//     );
//   };

//   async function getLocalDataTime() {
//     try {
//       const data = await AsyncStorage.getItem('selectedRoute');
//       if (data !== null) {
//         return JSON.parse(data);
//       }
//       return null;
//     } catch (error) {
//       console.log('Error reading route:', error);
//     }
//   }

//   const renderTimeButtons = () => {
//     const timeOptions = getLocalDataTime();
//     return (
//       <Animated.View style={[styles.timeButtons, { opacity: fadeAnim }]}>
//         {timeOptions.map((time, index) => (
//           <TouchableOpacity
//             key={time.key}
//             style={[
//               styles.timeBtn,
//               {
//                 backgroundColor:
//                   selectedTime?.key === time.key ? '#2c3e50' : time.color,
//               },
//               selectedTime?.key === time.key && styles.selectedTimeBtn,
//             ]}
//             onPress={() => selectTime(time)}
//             activeOpacity={0.8}
//           >
//             <View style={styles.timeBtnContent}>
//               <Text
//                 style={[
//                   styles.timeBtnText,
//                   selectedTime?.key === time.key && styles.selectedTimeBtnText,
//                 ]}
//               >
//                 {time.label}
//               </Text>
//               <Text style={styles.timeSubText}>{time.time}</Text>
//               {selectedTime?.key === time.key && (
//                 <View style={styles.timeSelectedIndicator}>
//                   <Text style={styles.timeSelectedCheck}>✓</Text>
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>
//         ))}
//       </Animated.View>
//     );
//   };

//   const renderSelectedInfo = () => {
//     if (!selectedDate && !selectedTime) return null;

//     return (
//       <Animated.View
//         style={[
//           styles.selectedInfo,
//           { opacity: fadeAnim, transform: [{ scale: fadeAnim }] },
//         ]}
//       >
//         <View style={styles.selectedInfoHeader}>
//           <SimpleIcon name="checkmark-circle" size={20} color="#4ECDC4" />
//           <Text style={styles.selectedInfoTitle}>Your Selection</Text>
//         </View>

//         <View style={styles.selectedInfoContent}>
//           <View style={styles.selectedInfoRow}>
//             <View style={styles.infoItem}>
//               <SimpleIcon name="calendar" size={16} color="#666" />
//               <Text style={styles.selectedInfoLabel}>Date</Text>
//             </View>
//             <Text style={styles.selectedInfoValue}>
//               {selectedDate
//                 ? `${selectedDate} ${currentMonth}`
//                 : 'Not selected'}
//             </Text>
//           </View>

//           <View style={styles.selectedInfoRow}>
//             <View style={styles.infoItem}>
//               <SimpleIcon name="time" size={16} color="#666" />
//               <Text style={styles.selectedInfoLabel}>Time</Text>
//             </View>
//             <Text style={styles.selectedInfoValue}>
//               {/* {selectedTime
//                 ? selectedTime.label.replace(/[🌅☀️🌙]/g, '').trim()
//                 : 'Not selected'} */}
//               {getLocalDataTime()}
//             </Text>
//           </View>
//         </View>
//       </Animated.View>
//     );
//   };

//   const renderBookButton = () => {
//     const isBookingReady = selectedDate && selectedTime;

//     return (
//       <Animated.View style={{ opacity: fadeAnim }}>
//         <TouchableOpacity
//           style={[styles.bookBtn, !isBookingReady && styles.bookBtnDisabled]}
//           onPress={bookAppointment}
//           activeOpacity={0.9}
//           disabled={!isBookingReady}
//         >
//           <View style={styles.bookBtnContent}>
//             <SimpleIcon
//               name="checkmark-circle"
//               size={20}
//               color="white"
//               style={styles.bookBtnIcon}
//             />
//             <Text style={styles.bookBtnText}>
//               {isBookingReady ? 'Confirm Booking' : 'Select Date & Time'}
//             </Text>
//           </View>
//           {isBookingReady && <View style={styles.bookingReadyGlow} />}
//         </TouchableOpacity>
//       </Animated.View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#4ECDC4" />

//       {/* Enhanced Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={goBack}>
//           <SimpleIcon name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//         <View style={styles.headerContent}>
//           <Text style={styles.headerTitle}>Book Appointment</Text>
//           <Text style={styles.headerSubtitle}>ACD-01_DB</Text>
//         </View>
//         <TouchableOpacity style={styles.infoBtn}>
//           <SimpleIcon
//             name="information-circle-outline"
//             size={24}
//             color="white"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Enhanced Content */}
//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         bounces={true}
//       >
//         {/* Date Section */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <SimpleIcon name="calendar" size={20} color="#4ECDC4" />
//             <Text style={styles.sectionTitle}>Select Date</Text>
//           </View>
//           {renderCalendarGrid()}
//         </View>

//         {/* Selected Info */}
//         {renderSelectedInfo()}

//         {/* Time Section */}
//         {/* <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <SimpleIcon name="time" size={20} color="#4ECDC4" />
//             <Text style={styles.sectionTitle}>Select Time</Text>
//           </View>
//           {renderTimeButtons()}
//         </View> */}

//         {/* Enhanced Book Button */}
//         {renderBookButton()}

//         {/* Extra spacing for better UX */}
//         <View style={{ height: 20 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#4ECDC4',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#4ECDC4',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   backBtn: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     minWidth: 40,
//     alignItems: 'center',
//   },
//   headerContent: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: 'white',
//   },
//   headerSubtitle: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.8)',
//     marginTop: 2,
//   },
//   infoBtn: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     minWidth: 40,
//     alignItems: 'center',
//   },
//   content: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingTop: 30,
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2c3e50',
//     marginLeft: 8,
//   },
//   calendarHeader: {
//     marginBottom: 15,
//   },
//   monthText: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#2c3e50',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   weekDays: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//   },
//   weekDayText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#666',
//     textAlign: 'center',
//     width: (width - 90) / 7,
//   },
//   calendar: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 15,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   daysGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//   },
//   dateCell: {
//     width: (width - 90) / 7,
//     aspectRatio: 1,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 8,
//     borderWidth: 2,
//     borderColor: 'transparent',
//     position: 'relative',
//   },
//   todayCell: {
//     borderColor: '#4ECDC4',
//     backgroundColor: 'rgba(78, 205, 196, 0.1)',
//   },
//   selectedDateCell: {
//     backgroundColor: '#4ECDC4',
//     transform: [{ scale: 1.05 }],
//     ...Platform.select({
//       ios: {
//         shadowColor: '#4ECDC4',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   pastDateCell: {
//     backgroundColor: '#e9ecef',
//     opacity: 0.5,
//   },
//   weekendCell: {
//     backgroundColor: 'rgba(255, 107, 107, 0.1)',
//   },
//   dateCellText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#2c3e50',
//   },
//   todayText: {
//     color: '#4ECDC4',
//     fontWeight: '700',
//   },
//   selectedDateText: {
//     color: 'white',
//     fontWeight: '700',
//   },
//   pastDateText: {
//     color: '#adb5bd',
//   },
//   weekendText: {
//     color: '#FF6B6B',
//   },
//   todayDot: {
//     position: 'absolute',
//     bottom: 4,
//     width: 4,
//     height: 4,
//     borderRadius: 2,
//     backgroundColor: '#4ECDC4',
//   },
//   selectedIndicator: {
//     position: 'absolute',
//     top: 2,
//     right: 2,
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   selectedCheckmark: {
//     color: '#4ECDC4',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   selectedInfo: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 20,
//     marginBottom: 20,
//     borderLeftWidth: 5,
//     borderLeftColor: '#4ECDC4',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   selectedInfoHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   selectedInfoTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#2c3e50',
//     marginLeft: 8,
//   },
//   selectedInfoContent: {
//     gap: 12,
//   },
//   selectedInfoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   infoItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   selectedInfoLabel: {
//     color: '#666',
//     fontWeight: '600',
//     marginLeft: 8,
//   },
//   selectedInfoValue: {
//     color: '#2c3e50',
//     fontWeight: '700',
//     fontSize: 16,
//   },
//   timeButtons: {
//     gap: 15,
//   },
//   timeBtn: {
//     paddingVertical: 20,
//     paddingHorizontal: 25,
//     borderRadius: 20,
//     position: 'relative',
//     overflow: 'hidden',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.15,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   selectedTimeBtn: {
//     transform: [{ scale: 1.02 }],
//   },
//   timeBtnContent: {
//     alignItems: 'center',
//     position: 'relative',
//   },
//   timeBtnText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '700',
//     textAlign: 'center',
//     marginBottom: 5,
//   },
//   selectedTimeBtnText: {
//     color: 'white',
//   },
//   timeSubText: {
//     color: 'rgba(255,255,255,0.9)',
//     fontSize: 12,
//     textAlign: 'center',
//     fontWeight: '500',
//   },
//   timeSelectedIndicator: {
//     position: 'absolute',
//     top: -5,
//     right: -10,
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   timeSelectedCheck: {
//     color: '#2c3e50',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   bookBtn: {
//     backgroundColor: '#2c3e50',
//     paddingVertical: 20,
//     borderRadius: 20,
//     alignItems: 'center',
//     marginTop: 20,
//     position: 'relative',
//     overflow: 'hidden',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#2c3e50',
//         shadowOffset: { width: 0, height: 6 },
//         shadowOpacity: 0.3,
//         shadowRadius: 12,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   bookBtnDisabled: {
//     backgroundColor: '#adb5bd',
//     opacity: 0.7,
//   },
//   bookBtnContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   bookBtnIcon: {
//     marginRight: 10,
//   },
//   bookBtnText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
//   bookingReadyGlow: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     borderRadius: 20,
//   },
// });

// export default BookingScreen;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
//   Alert,
//   ScrollView,
//   Dimensions,
//   Animated,
//   Platform,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFS from 'react-native-fs';

// const { width, height } = Dimensions.get('window');

// // Bus seat configuration
// const BUS_CONFIG = {
//   leftSeats: 2,
//   rightSeats: 3,
//   totalRows: 15,
// };

// // Simple Icon Component
// const SimpleIcon = ({ name, size = 20, color = 'white', style }) => {
//   const iconMap = {
//     'arrow-back': '←',
//     'checkmark-circle': '✓',
//     'information-circle-outline': 'ℹ',
//     calendar: '📅',
//     time: '⏰',
//     save: '💾',
//     seat: '💺',
//     'check-circle': '✅',
//     'x-circle': '❌',
//   };

//   return (
//     <Text style={[{ fontSize: size, color, textAlign: 'center' }, style]}>
//       {iconMap[name] || '•'}
//     </Text>
//   );
// };

// const BoockingDate = ({ navigation }) => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [calendarDays, setCalendarDays] = useState([]);
//   const [currentMonth, setCurrentMonth] = useState('January 2025');
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [slideAnim] = useState(new Animated.Value(-50));
//   const [routeInfo, setRouteInfo] = useState({
//     startTime: '20:20',
//     EndTime: '23:00',
//     route: {
//       Start: 'Galle',
//       End: 'Makubura',
//     },
//   });
//   const [selectedDateBookings, setSelectedDateBookings] = useState([]);
//   const [bookedSeats, setBookedSeats] = useState([]);
//   const [allBookings, setAllBookings] = useState([]);
//   const [sessionBookings, setSessionBookings] = useState([]); // Current session bookings

//   const animateIn = useCallback(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [fadeAnim, slideAnim]);

//   useEffect(() => {
//     generateCalendar();
//     loadRouteInfo();
//     loadExistingBookings();
//     animateIn();
//   }, [animateIn]);

//   const loadRouteInfo = async () => {
//     try {
//       const data = await AsyncStorage.getItem('selectedRoute');
//       if (data) {
//         setRouteInfo(JSON.parse(data));
//       }
//     } catch (error) {
//       console.log('Error loading route info:', error);
//     }
//   };

//   const loadExistingBookings = async () => {
//     try {
//       const savedBookings = await AsyncStorage.getItem('busBookings');
//       if (savedBookings) {
//         setAllBookings(JSON.parse(savedBookings));
//       }
//     } catch (error) {
//       console.log('Error loading existing bookings:', error);
//     }
//   };

//   const generateCalendar = () => {
//     const today = new Date();
//     const currentMonth = today.getMonth();
//     const currentYear = today.getFullYear();
//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//     const days = [];
//     for (let i = 1; i <= daysInMonth; i++) {
//       const date = new Date(currentYear, currentMonth, i);
//       const isWeekend = date.getDay() === 0 || date.getDay() === 6;
//       const isPast = i < today.getDate() && currentMonth === today.getMonth();

//       days.push({
//         day: i,
//         isWeekend,
//         isPast,
//         isToday: i === today.getDate() && currentMonth === today.getMonth(),
//       });
//     }
//     setCalendarDays(days);
//   };

//   const generateSeatLayout = () => {
//     const seats = [];

//     for (let row = 1; row <= BUS_CONFIG.totalRows; row++) {
//       // Left side seats
//       for (let leftSeat = 1; leftSeat <= BUS_CONFIG.leftSeats; leftSeat++) {
//         const seatNumber = `${row}${String.fromCharCode(64 + leftSeat)}`; // 1A, 1B, etc.
//         seats.push({
//           id: seatNumber,
//           row,
//           position: 'left',
//           seatIndex: leftSeat,
//         });
//       }

//       // Right side seats
//       for (let rightSeat = 1; rightSeat <= BUS_CONFIG.rightSeats; rightSeat++) {
//         const seatNumber = `${row}${String.fromCharCode(
//           64 + BUS_CONFIG.leftSeats + rightSeat,
//         )}`; // 1C, 1D, etc.
//         seats.push({
//           id: seatNumber,
//           row,
//           position: 'right',
//           seatIndex: rightSeat,
//         });
//       }
//     }

//     return seats;
//   };

//   const selectDate = dayObj => {
//     if (dayObj.isPast) {
//       Alert.alert('Invalid Date', 'Cannot select past dates!');
//       return;
//     }

//     const dateString = `${dayObj.day} ${currentMonth}`;
//     setSelectedDate(dateString);

//     // Load existing bookings for this date and route
//     loadBookingsForDate(dateString);
//   };

//   const loadBookingsForDate = dateString => {
//     if (!routeInfo) return;

//     // Find bookings for this specific date, route, and time
//     const dateBookings = allBookings.filter(
//       booking =>
//         booking.startTime === routeInfo.startTime &&
//         booking.route.start === routeInfo.route.Start &&
//         booking.route.end === routeInfo.route.End &&
//         booking.dates.some(d => d.date === dateString),
//     );

//     // Get all booked seats for this date
//     const bookedSeatsForDate = [];
//     dateBookings.forEach(booking => {
//       const dateInfo = booking.dates.find(d => d.date === dateString);
//       if (dateInfo) {
//         bookedSeatsForDate.push(...dateInfo.seats);
//       }
//     });

//     setBookedSeats(bookedSeatsForDate);

//     // Check if current session has bookings for this date
//     const currentSessionBooking = sessionBookings.find(
//       booking => booking.date === dateString,
//     );
//     if (currentSessionBooking) {
//       setSelectedSeats(currentSessionBooking.seats);
//     } else {
//       setSelectedSeats([]);
//     }
//   };

//   const toggleSeat = seatId => {
//     if (bookedSeats.includes(seatId)) {
//       Alert.alert(
//         'Seat Unavailable',
//         'This seat is already booked for the selected date.',
//       );
//       return;
//     }

//     setSelectedSeats(prevSeats => {
//       if (prevSeats.includes(seatId)) {
//         return prevSeats.filter(seat => seat !== seatId);
//       } else {
//         return [...prevSeats, seatId];
//       }
//     });
//   };

//   const saveDateBooking = () => {
//     if (!selectedDate || selectedSeats.length === 0) {
//       Alert.alert(
//         'Selection Required',
//         'Please select date and at least one seat!',
//       );
//       return;
//     }

//     const existingBookingIndex = sessionBookings.findIndex(
//       booking => booking.date === selectedDate,
//     );

//     const newBooking = {
//       date: selectedDate,
//       seats: [...selectedSeats],
//     };

//     if (existingBookingIndex >= 0) {
//       // Update existing booking for this date
//       const updatedBookings = [...sessionBookings];
//       updatedBookings[existingBookingIndex] = newBooking;
//       setSessionBookings(updatedBookings);
//     } else {
//       // Add new booking for this date
//       setSessionBookings(prev => [...prev, newBooking]);
//     }

//     Alert.alert(
//       'Success',
//       `Seats saved for ${selectedDate}!\nSelected seats: ${selectedSeats.join(
//         ', ',
//       )}`,
//     );
//     setSelectedSeats([]);
//     setSelectedDate(null);
//   };

//   const finalizeBooking = async () => {
//     if (sessionBookings.length === 0) {
//       Alert.alert(
//         'No Bookings',
//         'Please select dates and seats before finalizing!',
//       );
//       return;
//     }

//     if (!routeInfo) {
//       Alert.alert('Error', 'Route information not found!');
//       return;
//     }

//     try {
//       const newBooking = {
//         id: Date.now().toString(),
//         startTime: routeInfo.startTime,
//         endTime: routeInfo.EndTime,
//         type: routeInfo.type,
//         route: routeInfo.route,
//         busInfo: routeInfo.busInfo,
//         dates: sessionBookings,
//         bookingDate: new Date().toISOString(),
//       };

//       const existingBookings = await AsyncStorage.getItem('busBookings');
//       const bookings = existingBookings ? JSON.parse(existingBookings) : [];
//       bookings.push(newBooking);

//       ////////////////////////////////////////////////////////////////////////////////////////////////
//       await AsyncStorage.setItem('busBookings', JSON.stringify(bookings));

//       Alert.alert(
//         'Booking Confirmed!',
//         `Your booking has been saved successfully!\n\nTotal dates: ${
//           sessionBookings.length
//         }\nTotal seats: ${sessionBookings.reduce(
//           (sum, booking) => sum + booking.seats.length,
//           0,
//         )}`,
//         [
//           {
//             text: 'OK',
//             onPress: () => {
//               setSessionBookings([]);
//               navigation.goBack();
//             },
//           },
//         ],
//       );
//     } catch (error) {
//       console.log('Error saving booking:', error);
//       Alert.alert('Error', 'Failed to save booking. Please try again.');
//     }
//   };

//   const removeSessionBooking = date => {
//     setSessionBookings(prev => prev.filter(booking => booking.date !== date));
//   };

//   const goBack = () => {
//     if (sessionBookings.length > 0) {
//       Alert.alert(
//         'Unsaved Bookings',
//         'You have unsaved bookings. Are you sure you want to go back?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           {
//             text: 'Discard',
//             style: 'destructive',
//             onPress: () => navigation.goBack(),
//           },
//         ],
//       );
//     } else {
//       navigation.goBack();
//     }
//   };

//   const renderCalendarGrid = () => {
//     return (
//       <Animated.View
//         style={[
//           styles.calendar,
//           { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
//         ]}
//       >
//         {/* Calendar Header */}
//         <View style={styles.calendarHeader}>
//           <Text style={styles.monthText}>{currentMonth}</Text>
//           <View style={styles.weekDays}>
//             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//               <Text key={day} style={styles.weekDayText}>
//                 {day}
//               </Text>
//             ))}
//           </View>
//         </View>

//         {/* Calendar Days */}
//         <View style={styles.daysGrid}>
//           {calendarDays.map(dayObj => {
//             const dateString = `${dayObj.day} ${currentMonth}`;
//             const hasBooking = sessionBookings.some(
//               booking => booking.date === dateString,
//             );

//             return (
//               <TouchableOpacity
//                 key={dayObj.day}
//                 style={[
//                   styles.dateCell,
//                   dayObj.isToday && styles.todayCell,
//                   selectedDate === dateString && styles.selectedDateCell,
//                   dayObj.isPast && styles.pastDateCell,
//                   dayObj.isWeekend && styles.weekendCell,
//                   hasBooking && styles.hasBookingCell,
//                 ]}
//                 onPress={() => selectDate(dayObj)}
//                 activeOpacity={dayObj.isPast ? 1 : 0.7}
//                 disabled={dayObj.isPast}
//               >
//                 <Text
//                   style={[
//                     styles.dateCellText,
//                     dayObj.isToday && styles.todayText,
//                     selectedDate === dateString && styles.selectedDateText,
//                     dayObj.isPast && styles.pastDateText,
//                     dayObj.isWeekend && styles.weekendText,
//                     hasBooking && styles.hasBookingText,
//                   ]}
//                 >
//                   {dayObj.day}
//                 </Text>
//                 {dayObj.isToday && <View style={styles.todayDot} />}
//                 {hasBooking && (
//                   <View style={styles.bookingIndicator}>
//                     <SimpleIcon name="check-circle" size={10} color="#10B981" />
//                   </View>
//                 )}
//                 {selectedDate === dateString && (
//                   <View style={styles.selectedIndicator}>
//                     <Text style={styles.selectedCheckmark}>✓</Text>
//                   </View>
//                 )}
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </Animated.View>
//     );
//   };

//   const renderSeatLayout = () => {
//     if (!selectedDate) return null;

//     const seats = generateSeatLayout();
//     const rows = [];

//     for (let row = 1; row <= BUS_CONFIG.totalRows; row++) {
//       const rowSeats = seats.filter(seat => seat.row === row);
//       const leftSeats = rowSeats.filter(seat => seat.position === 'left');
//       const rightSeats = rowSeats.filter(seat => seat.position === 'right');

//       rows.push(
//         <View key={row} style={styles.seatRow}>
//           <Text style={styles.rowNumber}>{row}</Text>

//           {/* Left seats */}
//           <View style={styles.seatGroup}>
//             {leftSeats.map(seat => (
//               <TouchableOpacity
//                 key={seat.id}
//                 style={[
//                   styles.seat,
//                   selectedSeats.includes(seat.id) && styles.selectedSeat,
//                   bookedSeats.includes(seat.id) && styles.bookedSeat,
//                 ]}
//                 onPress={() => toggleSeat(seat.id)}
//                 disabled={bookedSeats.includes(seat.id)}
//                 activeOpacity={0.7}
//               >
//                 <Text
//                   style={[
//                     styles.seatText,
//                     selectedSeats.includes(seat.id) && styles.selectedSeatText,
//                     bookedSeats.includes(seat.id) && styles.bookedSeatText,
//                   ]}
//                 >
//                   {seat.id}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* Aisle */}
//           <View style={styles.aisle} />

//           {/* Right seats */}
//           <View style={styles.seatGroup}>
//             {rightSeats.map(seat => (
//               <TouchableOpacity
//                 key={seat.id}
//                 style={[
//                   styles.seat,
//                   selectedSeats.includes(seat.id) && styles.selectedSeat,
//                   bookedSeats.includes(seat.id) && styles.bookedSeat,
//                 ]}
//                 onPress={() => toggleSeat(seat.id)}
//                 disabled={bookedSeats.includes(seat.id)}
//                 activeOpacity={0.7}
//               >
//                 <Text
//                   style={[
//                     styles.seatText,
//                     selectedSeats.includes(seat.id) && styles.selectedSeatText,
//                     bookedSeats.includes(seat.id) && styles.bookedSeatText,
//                   ]}
//                 >
//                   {seat.id}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>,
//       );
//     }

//     return (
//       <View style={styles.seatMapContainer}>
//         <View style={styles.seatMapHeader}>
//           <Text style={styles.seatMapTitle}>
//             Select Seats for {selectedDate}
//           </Text>
//           <View style={styles.seatLegend}>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendSeat, styles.availableSeat]} />
//               <Text style={styles.legendText}>Available</Text>
//             </View>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendSeat, styles.selectedSeat]} />
//               <Text style={styles.legendText}>Selected</Text>
//             </View>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendSeat, styles.bookedSeat]} />
//               <Text style={styles.legendText}>Booked</Text>
//             </View>
//           </View>
//         </View>

//         <ScrollView style={styles.seatMap} showsVerticalScrollIndicator={false}>
//           <View style={styles.busHeader}>
//             <Text style={styles.busHeaderText}>FRONT</Text>
//           </View>
//           {rows}
//         </ScrollView>

//         {selectedSeats.length > 0 && (
//           <View style={styles.selectedSeatsInfo}>
//             <Text style={styles.selectedSeatsText}>
//               Selected: {selectedSeats.join(', ')} ({selectedSeats.length} seat
//               {selectedSeats.length > 1 ? 's' : ''})
//             </Text>
//             <TouchableOpacity
//               style={styles.saveDateButton}
//               onPress={saveDateBooking}
//             >
//               <SimpleIcon name="save" size={16} color="white" />
//               <Text style={styles.saveDateButtonText}>
//                 Save for {selectedDate}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     );
//   };

//   const renderSessionBookings = () => {
//     if (sessionBookings.length === 0) return null;

//     return (
//       <View style={styles.sessionBookingsContainer}>
//         <Text style={styles.sessionBookingsTitle}>Current Booking Session</Text>
//         {sessionBookings.map((booking, index) => (
//           <View key={index} style={styles.sessionBookingCard}>
//             <View style={styles.sessionBookingInfo}>
//               <Text style={styles.sessionBookingDate}>{booking.date}</Text>
//               <Text style={styles.sessionBookingSeats}>
//                 Seats: {booking.seats.join(', ')} ({booking.seats.length} seat
//                 {booking.seats.length > 1 ? 's' : ''})
//               </Text>
//             </View>
//             <TouchableOpacity
//               style={styles.removeBookingButton}
//               onPress={() => removeSessionBooking(booking.date)}
//             >
//               <SimpleIcon name="x-circle" size={20} color="#FF6B6B" />
//             </TouchableOpacity>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#4ECDC4" />

//       {/* Enhanced Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={goBack}>
//           <SimpleIcon name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//         <View style={styles.headerContent}>
//           <Text style={styles.headerTitle}>Book Seats</Text>
//           <Text style={styles.headerSubtitle}>
//             {routeInfo
//               ? `${routeInfo.route.Start} → ${routeInfo.route.End}`
//               : 'Loading...'}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.infoBtn}>
//           <SimpleIcon
//             name="information-circle-outline"
//             size={24}
//             color="white"
//           />
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Date Section */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <SimpleIcon name="calendar" size={20} color="#4ECDC4" />
//             <Text style={styles.sectionTitle}>Select Date</Text>
//           </View>
//           {renderCalendarGrid()}
//         </View>

//         {/* Seat Layout */}
//         {renderSeatLayout()}

//         {/* Session Bookings */}
//         {renderSessionBookings()}

//         {/* Finalize Booking Button */}
//         {sessionBookings.length > 0 && (
//           <TouchableOpacity
//             style={styles.finalizeButton}
//             onPress={finalizeBooking}
//           >
//             <SimpleIcon name="checkmark-circle" size={20} color="white" />
//             <Text style={styles.finalizeButtonText}>
//               Finalize Booking ({sessionBookings.length} date
//               {sessionBookings.length > 1 ? 's' : ''})
//             </Text>
//           </TouchableOpacity>
//         )}

//         <View style={{ height: 20 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#4ECDC4',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#4ECDC4',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   backBtn: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     minWidth: 40,
//     alignItems: 'center',
//   },
//   headerContent: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: 'white',
//   },
//   headerSubtitle: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.8)',
//     marginTop: 2,
//   },
//   infoBtn: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     minWidth: 40,
//     alignItems: 'center',
//   },
//   content: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingTop: 30,
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2c3e50',
//     marginLeft: 8,
//   },
//   calendarHeader: {
//     marginBottom: 15,
//   },
//   monthText: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#2c3e50',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   weekDays: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//   },
//   weekDayText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#666',
//     textAlign: 'center',
//     width: (width - 90) / 7,
//   },
//   calendar: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 15,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   daysGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//   },
//   dateCell: {
//     width: (width - 90) / 7,
//     aspectRatio: 1,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 8,
//     borderWidth: 2,
//     borderColor: 'transparent',
//     position: 'relative',
//   },
//   todayCell: {
//     borderColor: '#4ECDC4',
//     backgroundColor: 'rgba(78, 205, 196, 0.1)',
//   },
//   selectedDateCell: {
//     backgroundColor: '#4ECDC4',
//     transform: [{ scale: 1.05 }],
//     ...Platform.select({
//       ios: {
//         shadowColor: '#4ECDC4',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   pastDateCell: {
//     backgroundColor: '#e9ecef',
//     opacity: 0.5,
//   },
//   weekendCell: {
//     backgroundColor: 'rgba(255, 107, 107, 0.1)',
//   },
//   hasBookingCell: {
//     backgroundColor: 'rgba(16, 185, 129, 0.1)',
//     borderColor: '#10B981',
//   },
//   dateCellText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#2c3e50',
//   },
//   todayText: {
//     color: '#4ECDC4',
//     fontWeight: '700',
//   },
//   selectedDateText: {
//     color: 'white',
//     fontWeight: '700',
//   },
//   pastDateText: {
//     color: '#adb5bd',
//   },
//   weekendText: {
//     color: '#FF6B6B',
//   },
//   hasBookingText: {
//     color: '#10B981',
//     fontWeight: '700',
//   },
//   todayDot: {
//     position: 'absolute',
//     bottom: 4,
//     width: 4,
//     height: 4,
//     borderRadius: 2,
//     backgroundColor: '#4ECDC4',
//   },
//   bookingIndicator: {
//     position: 'absolute',
//     top: 2,
//     left: 2,
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: 'rgba(16, 185, 129, 0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   selectedIndicator: {
//     position: 'absolute',
//     top: 2,
//     right: 2,
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   selectedCheckmark: {
//     color: '#4ECDC4',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   seatMapContainer: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 15,
//     marginBottom: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   seatMapHeader: {
//     marginBottom: 20,
//   },
//   seatMapTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2c3e50',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   seatLegend: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 20,
//   },
//   legendItem: {
//     alignItems: 'center',
//     gap: 5,
//   },
//   legendSeat: {
//     width: 20,
//     height: 20,
//     borderRadius: 4,
//   },
//   legendText: {
//     fontSize: 10,
//     color: '#666',
//     fontWeight: '500',
//   },
//   availableSeat: {
//     backgroundColor: '#f8f9fa',
//     borderWidth: 1,
//     borderColor: '#dee2e6',
//   },
//   seatMap: {
//     maxHeight: 300,
//   },
//   busHeader: {
//     backgroundColor: '#4ECDC4',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   busHeaderText: {
//     color: 'white',
//     fontWeight: '700',
//     textAlign: 'center',
//     fontSize: 12,
//     letterSpacing: 1,
//   },
//   seatRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     paddingHorizontal: 10,
//   },
//   rowNumber: {
//     width: 25,
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#666',
//     textAlign: 'center',
//   },
//   seatGroup: {
//     flexDirection: 'row',
//     gap: 6,
//   },
//   aisle: {
//     width: 40,
//   },
//   seat: {
//     width: 35,
//     height: 35,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#dee2e6',
//   },
//   selectedSeat: {
//     backgroundColor: '#4ECDC4',
//     borderColor: '#4ECDC4',
//   },
//   bookedSeat: {
//     backgroundColor: '#FF6B6B',
//     borderColor: '#FF6B6B',
//   },
//   seatText: {
//     fontSize: 10,
//     fontWeight: '600',
//     color: '#2c3e50',
//   },
//   selectedSeatText: {
//     color: 'white',
//     fontWeight: '700',
//   },
//   bookedSeatText: {
//     color: 'white',
//     fontWeight: '600',
//   },
//   selectedSeatsInfo: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#e9ecef',
//   },
//   selectedSeatsText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#2c3e50',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   saveDateButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#4ECDC4',
//     padding: 12,
//     borderRadius: 10,
//     gap: 8,
//   },
//   saveDateButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   sessionBookingsContainer: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 15,
//     marginBottom: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   sessionBookingsTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2c3e50',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   sessionBookingCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#f8f9fa',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   sessionBookingInfo: {
//     flex: 1,
//   },
//   sessionBookingDate: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#2c3e50',
//     marginBottom: 4,
//   },
//   sessionBookingSeats: {
//     fontSize: 12,
//     color: '#666',
//   },
//   removeBookingButton: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 107, 107, 0.1)',
//   },
//   finalizeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#10B981',
//     padding: 16,
//     borderRadius: 15,
//     gap: 10,
//     marginBottom: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#10B981',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   finalizeButtonText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// });
// export default BoockingDate;
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
//   Alert,
//   ScrollView,
//   Dimensions,
//   Animated,
//   Platform,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFS from 'react-native-fs';

// const { width, height } = Dimensions.get('window');

// // Bus seat configuration
// const BUS_CONFIG = {
//   leftSeats: 2,
//   rightSeats: 3,
//   totalRows: 15,
// };

// // Simple Icon Component
// const SimpleIcon = ({ name, size = 20, color = 'white', style }) => {
//   const iconMap = {
//     'arrow-back': '←',
//     'checkmark-circle': '✓',
//     'information-circle-outline': 'ℹ',
//     calendar: '📅',
//     time: '⏰',
//     save: '💾',
//     seat: '💺',
//     'check-circle': '✅',
//     'x-circle': '❌',
//   };

//   return (
//     <Text style={[{ fontSize: size, color, textAlign: 'center' }, style]}>
//       {iconMap[name] || '•'}
//     </Text>
//   );
// };

// const BoockingDate = ({ navigation, route }) => {
//   // Correctly extract parameters from route
//   const busId = route?.params?.busId || 'ACD-01-';
//   const busNumber = route?.params?.busNumber || 'ACD-01-';

//   // Create busInfo object from the parameters
//   const busInfo = {
//     busId: busId,
//     busNumber: busNumber,
//   };
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [calendarDays, setCalendarDays] = useState([]);
//   const [currentMonth, setCurrentMonth] = useState('January 2025');
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [slideAnim] = useState(new Animated.Value(-50));
//   const [routeInfo, setRouteInfo] = useState({
//     startTime: '20:20',
//     EndTime: '23:00',
//     route: {
//       Start: 'Galle',
//       End: 'Makubura',
//     },
//   });
//   const [selectedDateBookings, setSelectedDateBookings] = useState([]);
//   const [bookedSeats, setBookedSeats] = useState([]);
//   const [allBookings, setAllBookings] = useState([]);
//   const [sessionBookings, setSessionBookings] = useState([]); // Current session bookings

//   const animateIn = useCallback(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [fadeAnim, slideAnim]);

//   useEffect(() => {
//     generateCalendar();
//     loadRouteInfo();
//     loadExistingBookings();
//     animateIn();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [animateIn]);

//   const loadRouteInfo = async () => {
//     try {
//       const data = await AsyncStorage.getItem('selectedRoute');
//       if (data) {
//         setRouteInfo(JSON.parse(data));
//       }
//     } catch (error) {
//       console.log('Error loading route info:', error);
//     }
//   };

//   // Get current user's bookings
//   const getUserBookings = async () => {
//     try {
//       const currentUserData = await AsyncStorage.getItem('currentUser');
//       if (!currentUserData) return [];

//       const currentUser = JSON.parse(currentUserData);
//       console.log(currentUser);
//       return currentUser.bus?.bookings || [];
//     } catch (error) {
//       console.log('Error getting user bookings:', error);
//       return [];
//     }
//   };

//   // Check if seat is booked by current user
//   const isUserBookedSeat = (seatId, date) => {
//     const userBookings = getUserBookings();
//     return userBookings.some(booking =>
//       booking.dates.some(
//         dateBooking =>
//           dateBooking.date === date && dateBooking.seats.includes(seatId),
//       ),
//     );
//   };

//   // Load existing bookings including user's own bookings
//   const loadExistingBookings = async () => {
//     try {
//       // Load all bookings from busBookings (for other users)
//       const savedBookings = await AsyncStorage.getItem('busBookings');
//       const allBookings = savedBookings ? JSON.parse(savedBookings) : [];

//       // Load current user's bookings
//       const userBookings = await getUserBookings();

//       // Combine both arrays (avoid duplicates by checking booking IDs)
//       const combinedBookings = [...allBookings];
//       userBookings.forEach(userBooking => {
//         if (!combinedBookings.find(booking => booking.id === userBooking.id)) {
//           combinedBookings.push(userBooking);
//         }
//       });

//       setAllBookings(combinedBookings);
//     } catch (error) {
//       console.log('Error loading existing bookings:', error);
//     }
//   };

//   // Get booking statistics for user
//   const getBookingStats = async () => {
//     try {
//       const userBookings = await getUserBookings();
//       const totalBookings = userBookings.length;
//       const totalSeats = userBookings.reduce(
//         (sum, booking) =>
//           sum +
//           booking.dates.reduce(
//             (dateSum, date) => dateSum + date.seats.length,
//             0,
//           ),
//         0,
//       );
//       const upcomingBookings = userBookings.filter(booking => {
//         const bookingDate = new Date(booking.dates[0].date);
//         return bookingDate >= new Date();
//       }).length;

//       return {
//         totalBookings,
//         totalSeats,
//         upcomingBookings,
//         pastBookings: totalBookings - upcomingBookings,
//       };
//     } catch (error) {
//       console.log('Error getting booking stats:', error);
//       return {
//         totalBookings: 0,
//         totalSeats: 0,
//         upcomingBookings: 0,
//         pastBookings: 0,
//       };
//     }
//   };

//   const generateCalendar = () => {
//     const today = new Date();
//     const currentMonth = today.getMonth();
//     const currentYear = today.getFullYear();
//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//     const days = [];
//     for (let i = 1; i <= daysInMonth; i++) {
//       const date = new Date(currentYear, currentMonth, i);
//       const isWeekend = date.getDay() === 0 || date.getDay() === 6;
//       const isPast = i < today.getDate() && currentMonth === today.getMonth();

//       days.push({
//         day: i,
//         isWeekend,
//         isPast,
//         isToday: i === today.getDate() && currentMonth === today.getMonth(),
//       });
//     }
//     setCalendarDays(days);
//   };

//   const generateSeatLayout = () => {
//     const seats = [];

//     for (let row = 1; row <= BUS_CONFIG.totalRows; row++) {
//       // Left side seats
//       for (let leftSeat = 1; leftSeat <= BUS_CONFIG.leftSeats; leftSeat++) {
//         const seatNumber = `${row}${String.fromCharCode(64 + leftSeat)}`; // 1A, 1B, etc.
//         seats.push({
//           id: seatNumber,
//           row,
//           position: 'left',
//           seatIndex: leftSeat,
//         });
//       }

//       // Right side seats
//       for (let rightSeat = 1; rightSeat <= BUS_CONFIG.rightSeats; rightSeat++) {
//         const seatNumber = `${row}${String.fromCharCode(
//           64 + BUS_CONFIG.leftSeats + rightSeat,
//         )}`; // 1C, 1D, etc.
//         seats.push({
//           id: seatNumber,
//           row,
//           position: 'right',
//           seatIndex: rightSeat,
//         });
//       }
//     }

//     return seats;
//   };

//   const selectDate = dayObj => {
//     if (dayObj.isPast) {
//       Alert.alert('Invalid Date', 'Cannot select past dates!');
//       return;
//     }

//     const dateString = `${dayObj.day} ${currentMonth}`;
//     setSelectedDate(dateString);

//     // Load existing bookings for this date and route
//     loadBookingsForDate(dateString);
//   };

//   const loadBookingsForDate = dateString => {
//     if (!routeInfo) return;

//     // Find bookings for this specific date, route, and time
//     const dateBookings = allBookings.filter(
//       booking =>
//         booking.startTime === routeInfo.startTime &&
//         booking.route.Start === routeInfo.route.Start &&
//         booking.route.End === routeInfo.route.End &&
//         booking.dates.some(d => d.date === dateString),
//     );

//     // Get all booked seats for this date
//     const bookedSeatsForDate = [];
//     dateBookings.forEach(booking => {
//       const dateInfo = booking.dates.find(d => d.date === dateString);
//       if (dateInfo) {
//         bookedSeatsForDate.push(...dateInfo.seats);
//       }
//     });

//     setBookedSeats(bookedSeatsForDate);

//     // Check if current session has bookings for this date
//     const currentSessionBooking = sessionBookings.find(
//       booking => booking.date === dateString,
//     );
//     if (currentSessionBooking) {
//       setSelectedSeats(currentSessionBooking.seats);
//     } else {
//       setSelectedSeats([]);
//     }
//   };

//   const toggleSeat = seatId => {
//     if (bookedSeats.includes(seatId)) {
//       Alert.alert(
//         'Seat Unavailable',
//         'This seat is already booked for the selected date.',
//       );
//       return;
//     }

//     setSelectedSeats(prevSeats => {
//       if (prevSeats.includes(seatId)) {
//         return prevSeats.filter(seat => seat !== seatId);
//       } else {
//         return [...prevSeats, seatId];
//       }
//     });
//   };

//   const saveDateBooking = () => {
//     if (!selectedDate || selectedSeats.length === 0) {
//       Alert.alert(
//         'Selection Required',
//         'Please select date and at least one seat!',
//       );
//       return;
//     }

//     const existingBookingIndex = sessionBookings.findIndex(
//       booking => booking.date === selectedDate,
//     );

//     const newBooking = {
//       date: selectedDate,
//       seats: [...selectedSeats],
//     };

//     if (existingBookingIndex >= 0) {
//       // Update existing booking for this date
//       const updatedBookings = [...sessionBookings];
//       updatedBookings[existingBookingIndex] = newBooking;
//       setSessionBookings(updatedBookings);
//     } else {
//       // Add new booking for this date
//       setSessionBookings(prev => [...prev, newBooking]);
//     }

//     Alert.alert(
//       'Success',
//       `Seats saved for ${selectedDate}!\nSelected seats: ${selectedSeats.join(
//         ', ',
//       )}`,
//     );
//     setSelectedSeats([]);
//     setSelectedDate(null);
//   };

//   const finalizeBooking = async () => {
//     if (sessionBookings.length === 0) {
//       Alert.alert(
//         'No Bookings',
//         'Please select dates and seats before finalizing!',
//       );
//       return;
//     }

//     if (!routeInfo) {
//       Alert.alert('Error', 'Route information not found!');
//       return;
//     }

//     const currentUserData = await AsyncStorage.getItem('currentUser');
//     console.log(JSON.parse(currentUserData));
//     const d = JSON.parse(currentUserData);
//     console.log(d.email);
//     try {
//       const newBooking = {
//         id: Date.now().toString(),
//         startTime: routeInfo.startTime,
//         endTime: routeInfo.EndTime,
//         type: routeInfo.type,
//         route: routeInfo.route,
//         busInfo: routeInfo.busInfo,
//         dates: sessionBookings,
//         bus: busInfo.busId,
//         user: d.email,
//         bookingDate: new Date().toISOString(),
//       };

//       // Get current user data
//       /////////////////////////////////////////////////////////////////////////////////////
//       if (!currentUserData) {
//         Alert.alert('Error', 'User not logged in. Please login first.');
//         return;
//       }

//       const currentUser = JSON.parse(currentUserData);

//       // Get all users data
//       const usersData = await AsyncStorage.getItem('usersArray');
//       const users = usersData ? JSON.parse(usersData) : [];

//       // Find the current user in the users array
//       const userIndex = users.findIndex(
//         user => user.role === 'Owner' && user.bus[0].id === busInfo.busId,
//       );
//       // const userIndex = users.findIndex(
//       //   user =>
//       //     user.role === 'Owner' &&
//       //     user.bus[0] &&
//       //     Array.isArray(user.bus[0]) &&
//       //     user.bus[0].some(bus => bus.busId === busInfo.busId),
//       // );
//       console.log(users);
//       console.log(busInfo.busId);
//       console.log(userIndex);
//       if (userIndex === -1) {
//         Alert.alert('Error', 'User not found in database.');
//         return;
//       }

//       // Initialize bus object if it doesn't exist
//       if (!users[userIndex].bus) {
//         users[userIndex].bus[0] = {
//           bookings: [],
//         };
//       }

//       // Initialize bookings array if it doesn't exist
//       if (!users[userIndex].bus[0].bookings) {
//         users[userIndex].bus[0].bookings = [];
//       }

//       // Add the new booking to user's bus bookings
//       users[userIndex].bus[0].bookings.push(newBooking);

//       // Update the user's updatedAt timestamp
//       // users[userIndex].updatedAt = new Date().toISOString();

//       // Save updated users data back to AsyncStorage
//       await AsyncStorage.setItem('usersArray', JSON.stringify(users));

//       //Update current user data in AsyncStorage as well
//       await AsyncStorage.setItem(
//         'currentUser',
//         JSON.stringify(users[userIndex]),
//       );

//       // Also keep the existing busBookings for backward compatibility
//       const existingBookings = await AsyncStorage.getItem('busBookings');
//       const allBookings = existingBookings ? JSON.parse(existingBookings) : [];
//       allBookings.push(newBooking);
//       await AsyncStorage.setItem('busBookings', JSON.stringify(allBookings));

//       const totalSeats = sessionBookings.reduce(
//         (sum, booking) => sum + booking.seats.length,
//         0,
//       );
//       console.log(users);

//       Alert.alert(
//         'Booking Confirmed!',
//         `Your booking has been saved successfully!\n\nBooking Details:\n` +
//           `📅 Total dates: ${sessionBookings.length}\n` +
//           `💺 Total seats: ${totalSeats}\n` +
//           `🚌 Route: ${routeInfo.route.Start} → ${routeInfo.route.End}\n` +
//           `⏰ Time: ${routeInfo.startTime} - ${routeInfo.EndTime}`,
//         [
//           {
//             text: 'View My Bookings',
//             onPress: () => {
//               setSessionBookings([]);
//               navigation.goBack();
//             },
//           },
//           {
//             text: 'OK',
//             onPress: () => {
//               setSessionBookings([]);
//               navigation.goBack();
//             },
//             style: 'default',
//           },
//         ],
//       );
//     } catch (error) {
//       console.log('Error saving booking:', error);
//       Alert.alert(
//         'Booking Failed',
//         'Failed to save booking. Please check your internet connection and try again.',
//         [
//           { text: 'Retry', onPress: () => finalizeBooking() },
//           { text: 'Cancel', style: 'cancel' },
//         ],
//       );
//     }
//   };

//   const removeSessionBooking = date => {
//     setSessionBookings(prev => prev.filter(booking => booking.date !== date));
//   };

//   const goBack = () => {
//     if (sessionBookings.length > 0) {
//       Alert.alert(
//         'Unsaved Bookings',
//         'You have unsaved bookings. Are you sure you want to go back?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           {
//             text: 'Discard',
//             style: 'destructive',
//             onPress: () => navigation.goBack(),
//           },
//         ],
//       );
//     } else {
//       navigation.goBack();
//     }
//   };

//   const renderCalendarGrid = () => {
//     return (
//       <Animated.View
//         style={[
//           styles.calendar,
//           { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
//         ]}
//       >
//         {/* Calendar Header */}
//         <View style={styles.calendarHeader}>
//           <Text style={styles.monthText}>{currentMonth}</Text>
//           <View style={styles.weekDays}>
//             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//               <Text key={day} style={styles.weekDayText}>
//                 {day}
//               </Text>
//             ))}
//           </View>
//         </View>

//         {/* Calendar Days */}
//         <View style={styles.daysGrid}>
//           {calendarDays.map(dayObj => {
//             const dateString = `${dayObj.day} ${currentMonth}`;
//             const hasBooking = sessionBookings.some(
//               booking => booking.date === dateString,
//             );

//             return (
//               <TouchableOpacity
//                 key={dayObj.day}
//                 style={[
//                   styles.dateCell,
//                   dayObj.isToday && styles.todayCell,
//                   selectedDate === dateString && styles.selectedDateCell,
//                   dayObj.isPast && styles.pastDateCell,
//                   dayObj.isWeekend && styles.weekendCell,
//                   hasBooking && styles.hasBookingCell,
//                 ]}
//                 onPress={() => selectDate(dayObj)}
//                 activeOpacity={dayObj.isPast ? 1 : 0.7}
//                 disabled={dayObj.isPast}
//               >
//                 <Text
//                   style={[
//                     styles.dateCellText,
//                     dayObj.isToday && styles.todayText,
//                     selectedDate === dateString && styles.selectedDateText,
//                     dayObj.isPast && styles.pastDateText,
//                     dayObj.isWeekend && styles.weekendText,
//                     hasBooking && styles.hasBookingText,
//                   ]}
//                 >
//                   {dayObj.day}
//                 </Text>
//                 {dayObj.isToday && <View style={styles.todayDot} />}
//                 {hasBooking && (
//                   <View style={styles.bookingIndicator}>
//                     <SimpleIcon name="check-circle" size={10} color="#10B981" />
//                   </View>
//                 )}
//                 {selectedDate === dateString && (
//                   <View style={styles.selectedIndicator}>
//                     <Text style={styles.selectedCheckmark}>✓</Text>
//                   </View>
//                 )}
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </Animated.View>
//     );
//   };

//   const renderSeatLayout = () => {
//     if (!selectedDate) return null;

//     const seats = generateSeatLayout();
//     const rows = [];

//     for (let row = 1; row <= BUS_CONFIG.totalRows; row++) {
//       const rowSeats = seats.filter(seat => seat.row === row);
//       const leftSeats = rowSeats.filter(seat => seat.position === 'left');
//       const rightSeats = rowSeats.filter(seat => seat.position === 'right');

//       rows.push(
//         <View key={row} style={styles.seatRow}>
//           <Text style={styles.rowNumber}>{row}</Text>

//           {/* Left seats */}
//           <View style={styles.seatGroup}>
//             {leftSeats.map(seat => (
//               <TouchableOpacity
//                 key={seat.id}
//                 style={[
//                   styles.seat,
//                   selectedSeats.includes(seat.id) && styles.selectedSeat,
//                   bookedSeats.includes(seat.id) && styles.bookedSeat,
//                 ]}
//                 onPress={() => toggleSeat(seat.id)}
//                 disabled={bookedSeats.includes(seat.id)}
//                 activeOpacity={0.7}
//               >
//                 <Text
//                   style={[
//                     styles.seatText,
//                     selectedSeats.includes(seat.id) && styles.selectedSeatText,
//                     bookedSeats.includes(seat.id) && styles.bookedSeatText,
//                   ]}
//                 >
//                   {seat.id}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* Aisle */}
//           <View style={styles.aisle} />

//           {/* Right seats */}
//           <View style={styles.seatGroup}>
//             {rightSeats.map(seat => (
//               <TouchableOpacity
//                 key={seat.id}
//                 style={[
//                   styles.seat,
//                   selectedSeats.includes(seat.id) && styles.selectedSeat,
//                   bookedSeats.includes(seat.id) && styles.bookedSeat,
//                 ]}
//                 onPress={() => toggleSeat(seat.id)}
//                 disabled={bookedSeats.includes(seat.id)}
//                 activeOpacity={0.7}
//               >
//                 <Text
//                   style={[
//                     styles.seatText,
//                     selectedSeats.includes(seat.id) && styles.selectedSeatText,
//                     bookedSeats.includes(seat.id) && styles.bookedSeatText,
//                   ]}
//                 >
//                   {seat.id}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>,
//       );
//     }

//     return (
//       <View style={styles.seatMapContainer}>
//         <View style={styles.seatMapHeader}>
//           <Text style={styles.seatMapTitle}>
//             Select Seats for {selectedDate}
//           </Text>
//           <View style={styles.seatLegend}>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendSeat, styles.availableSeat]} />
//               <Text style={styles.legendText}>Available</Text>
//             </View>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendSeat, styles.selectedSeat]} />
//               <Text style={styles.legendText}>Selected</Text>
//             </View>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendSeat, styles.bookedSeat]} />
//               <Text style={styles.legendText}>Booked</Text>
//             </View>
//           </View>
//         </View>

//         <ScrollView style={styles.seatMap} showsVerticalScrollIndicator={false}>
//           <View style={styles.busHeader}>
//             <Text style={styles.busHeaderText}>FRONT</Text>
//           </View>
//           {rows}
//         </ScrollView>

//         {selectedSeats.length > 0 && (
//           <View style={styles.selectedSeatsInfo}>
//             <Text style={styles.selectedSeatsText}>
//               Selected: {selectedSeats.join(', ')} ({selectedSeats.length} seat
//               {selectedSeats.length > 1 ? 's' : ''})
//             </Text>
//             <TouchableOpacity
//               style={styles.saveDateButton}
//               onPress={saveDateBooking}
//             >
//               <SimpleIcon name="save" size={16} color="white" />
//               <Text style={styles.saveDateButtonText}>
//                 Save for {selectedDate}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     );
//   };

//   const renderSessionBookings = () => {
//     if (sessionBookings.length === 0) return null;

//     return (
//       <View style={styles.sessionBookingsContainer}>
//         <Text style={styles.sessionBookingsTitle}>Current Booking Session</Text>
//         {sessionBookings.map((booking, index) => (
//           <View key={index} style={styles.sessionBookingCard}>
//             <View style={styles.sessionBookingInfo}>
//               <Text style={styles.sessionBookingDate}>{booking.date}</Text>
//               <Text style={styles.sessionBookingSeats}>
//                 Seats: {booking.seats.join(', ')} ({booking.seats.length} seat
//                 {booking.seats.length > 1 ? 's' : ''})
//               </Text>
//             </View>
//             <TouchableOpacity
//               style={styles.removeBookingButton}
//               onPress={() => removeSessionBooking(booking.date)}
//             >
//               <SimpleIcon name="x-circle" size={20} color="#FF6B6B" />
//             </TouchableOpacity>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#4ECDC4" />

//       {/* Enhanced Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={goBack}>
//           <SimpleIcon name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//         <View style={styles.headerContent}>
//           <Text style={styles.headerTitle}>Book Seats</Text>
//           <Text style={styles.headerSubtitle}>
//             {routeInfo
//               ? `${routeInfo.route.Start} → ${routeInfo.route.End}`
//               : 'Loading...'}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.infoBtn}>
//           <SimpleIcon
//             name="information-circle-outline"
//             size={24}
//             color="white"
//           />
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Date Section */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <SimpleIcon name="calendar" size={20} color="#4ECDC4" />
//             <Text style={styles.sectionTitle}>Select Date</Text>
//           </View>
//           {renderCalendarGrid()}
//         </View>

//         {/* Seat Layout */}
//         {renderSeatLayout()}

//         {/* Session Bookings */}
//         {renderSessionBookings()}

//         {/* Finalize Booking Button */}
//         {sessionBookings.length > 0 && (
//           <TouchableOpacity
//             style={styles.finalizeButton}
//             onPress={finalizeBooking}
//           >
//             <SimpleIcon name="checkmark-circle" size={20} color="white" />
//             <Text style={styles.finalizeButtonText}>
//               Finalize Booking ({sessionBookings.length} date
//               {sessionBookings.length > 1 ? 's' : ''})
//             </Text>
//           </TouchableOpacity>
//         )}

//         <View style={{ height: 20 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#4ECDC4',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#4ECDC4',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   backBtn: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     minWidth: 40,
//     alignItems: 'center',
//   },
//   headerContent: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: 'white',
//   },
//   headerSubtitle: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.8)',
//     marginTop: 2,
//   },
//   infoBtn: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     minWidth: 40,
//     alignItems: 'center',
//   },
//   content: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingTop: 30,
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2c3e50',
//     marginLeft: 8,
//   },
//   calendarHeader: {
//     marginBottom: 15,
//   },
//   monthText: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#2c3e50',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   weekDays: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//   },
//   weekDayText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#666',
//     textAlign: 'center',
//     width: (width - 90) / 7,
//   },
//   calendar: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 15,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   daysGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//   },
//   dateCell: {
//     width: (width - 90) / 7,
//     aspectRatio: 1,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 8,
//     borderWidth: 2,
//     borderColor: 'transparent',
//     position: 'relative',
//   },
//   todayCell: {
//     borderColor: '#4ECDC4',
//     backgroundColor: 'rgba(78, 205, 196, 0.1)',
//   },
//   selectedDateCell: {
//     backgroundColor: '#4ECDC4',
//     transform: [{ scale: 1.05 }],
//     ...Platform.select({
//       ios: {
//         shadowColor: '#4ECDC4',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   pastDateCell: {
//     backgroundColor: '#e9ecef',
//     opacity: 0.5,
//   },
//   weekendCell: {
//     backgroundColor: 'rgba(255, 107, 107, 0.1)',
//   },
//   hasBookingCell: {
//     backgroundColor: 'rgba(16, 185, 129, 0.1)',
//     borderColor: '#10B981',
//   },
//   dateCellText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#2c3e50',
//   },
//   todayText: {
//     color: '#4ECDC4',
//     fontWeight: '700',
//   },
//   selectedDateText: {
//     color: 'white',
//     fontWeight: '700',
//   },
//   pastDateText: {
//     color: '#adb5bd',
//   },
//   weekendText: {
//     color: '#FF6B6B',
//   },
//   hasBookingText: {
//     color: '#10B981',
//     fontWeight: '700',
//   },
//   todayDot: {
//     position: 'absolute',
//     bottom: 4,
//     width: 4,
//     height: 4,
//     borderRadius: 2,
//     backgroundColor: '#4ECDC4',
//   },
//   bookingIndicator: {
//     position: 'absolute',
//     top: 2,
//     left: 2,
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: 'rgba(16, 185, 129, 0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   selectedIndicator: {
//     position: 'absolute',
//     top: 2,
//     right: 2,
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   selectedCheckmark: {
//     color: '#4ECDC4',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   seatMapContainer: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 15,
//     marginBottom: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   seatMapHeader: {
//     marginBottom: 20,
//   },
//   seatMapTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2c3e50',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   seatLegend: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 20,
//   },
//   legendItem: {
//     alignItems: 'center',
//     gap: 5,
//   },
//   legendSeat: {
//     width: 20,
//     height: 20,
//     borderRadius: 4,
//   },
//   legendText: {
//     fontSize: 10,
//     color: '#666',
//     fontWeight: '500',
//   },
//   availableSeat: {
//     backgroundColor: '#f8f9fa',
//     borderWidth: 1,
//     borderColor: '#dee2e6',
//   },
//   seatMap: {
//     maxHeight: 300,
//   },
//   busHeader: {
//     backgroundColor: '#4ECDC4',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   busHeaderText: {
//     color: 'white',
//     fontWeight: '700',
//     textAlign: 'center',
//     fontSize: 12,
//     letterSpacing: 1,
//   },
//   seatRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     paddingHorizontal: 10,
//   },
//   rowNumber: {
//     width: 25,
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#666',
//     textAlign: 'center',
//   },
//   seatGroup: {
//     flexDirection: 'row',
//     gap: 6,
//   },
//   aisle: {
//     width: 40,
//   },
//   seat: {
//     width: 35,
//     height: 35,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#dee2e6',
//   },
//   selectedSeat: {
//     backgroundColor: '#4ECDC4',
//     borderColor: '#4ECDC4',
//   },
//   bookedSeat: {
//     backgroundColor: '#FF6B6B',
//     borderColor: '#FF6B6B',
//   },
//   seatText: {
//     fontSize: 10,
//     fontWeight: '600',
//     color: '#2c3e50',
//   },
//   selectedSeatText: {
//     color: 'white',
//     fontWeight: '700',
//   },
//   bookedSeatText: {
//     color: 'white',
//     fontWeight: '600',
//   },
//   selectedSeatsInfo: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#e9ecef',
//   },
//   selectedSeatsText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#2c3e50',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   saveDateButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#4ECDC4',
//     padding: 12,
//     borderRadius: 10,
//     gap: 8,
//   },
//   saveDateButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   sessionBookingsContainer: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 15,
//     marginBottom: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   sessionBookingsTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2c3e50',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   sessionBookingCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#f8f9fa',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   sessionBookingInfo: {
//     flex: 1,
//   },
//   sessionBookingDate: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#2c3e50',
//     marginBottom: 4,
//   },
//   sessionBookingSeats: {
//     fontSize: 12,
//     color: '#666',
//   },
//   removeBookingButton: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 107, 107, 0.1)',
//   },
//   finalizeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#10B981',
//     padding: 16,
//     borderRadius: 15,
//     gap: 10,
//     marginBottom: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#10B981',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   finalizeButtonText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// });

// export default BoockingDate;//////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
//   Alert,
//   ScrollView,
//   Dimensions,
//   Animated,
//   Platform,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFS from 'react-native-fs';

// const { width, height } = Dimensions.get('window');

// // Bus seat configuration
// const BUS_CONFIG = {
//   leftSeats: 2,
//   rightSeats: 3,
//   totalRows: 15,
// };

// // Simple Icon Component
// const SimpleIcon = ({ name, size = 20, color = 'white', style }) => {
//   const iconMap = {
//     'arrow-back': '←',
//     'checkmark-circle': '✓',
//     'information-circle-outline': 'ℹ',
//     calendar: '📅',
//     time: '⏰',
//     save: '💾',
//     seat: '💺',
//     'check-circle': '✅',
//     'x-circle': '❌',
//     cash: '💰',
//   };

//   return (
//     <Text style={[{ fontSize: size, color, textAlign: 'center' }, style]}>
//       {iconMap[name] || '•'}
//     </Text>
//   );
// };

// const BoockingDate = ({ navigation, route }) => {
//   // Correctly extract parameters from route
//   const busId = route?.params?.busId || 'ACD-01-';
//   const busNumber = route?.params?.busNumber || 'ACD-01-';

//   // Create busInfo object from the parameters
//   const busInfo = {
//     busId: busId,
//     busNumber: busNumber,
//   };
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [calendarDays, setCalendarDays] = useState([]);
//   const [currentMonth, setCurrentMonth] = useState('January 2025');
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [slideAnim] = useState(new Animated.Value(-50));
//   const [routeInfo, setRouteInfo] = useState({
//     startTime: '20:20',
//     EndTime: '23:00',
//     route: {
//       Start: 'Galle',
//       End: 'Makubura',
//     },
//     fare: 2000, // Default fare
//   });
//   const [selectedDateBookings, setSelectedDateBookings] = useState([]);
//   const [bookedSeats, setBookedSeats] = useState([]);
//   const [allBookings, setAllBookings] = useState([]);
//   const [sessionBookings, setSessionBookings] = useState([]); // Current session bookings

//   const animateIn = useCallback(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [fadeAnim, slideAnim]);

//   useEffect(() => {
//     generateCalendar();
//     loadRouteInfo();
//     loadExistingBookings();
//     animateIn();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [animateIn]);

//   const loadRouteInfo = async () => {
//     try {
//       const data = await AsyncStorage.getItem('selectedRoute');
//       if (data) {
//         const parsedRoute = JSON.parse(data);
//         setRouteInfo({
//           ...parsedRoute,
//           fare: parsedRoute.fare || 2000, // Use fare from route or default
//         });
//       }
//     } catch (error) {
//       console.log('Error loading route info:', error);
//     }
//   };

//   // Get current user's bookings
//   const getUserBookings = async () => {
//     try {
//       const currentUserData = await AsyncStorage.getItem('currentUser');
//       if (!currentUserData) return [];

//       const currentUser = JSON.parse(currentUserData);
//       console.log(currentUser);
//       return currentUser.bus?.bookings || [];
//     } catch (error) {
//       console.log('Error getting user bookings:', error);
//       return [];
//     }
//   };

//   // Check if seat is booked by current user
//   const isUserBookedSeat = (seatId, date) => {
//     const userBookings = getUserBookings();
//     return userBookings.some(booking =>
//       booking.dates.some(
//         dateBooking =>
//           dateBooking.date === date && dateBooking.seats.includes(seatId),
//       ),
//     );
//   };

//   // Load existing bookings including user's own bookings
//   const loadExistingBookings = async () => {
//     try {
//       // Load all bookings from busBookings (for other users)
//       const savedBookings = await AsyncStorage.getItem('busBookings');
//       const allBookings = savedBookings ? JSON.parse(savedBookings) : [];

//       // Load current user's bookings
//       const userBookings = await getUserBookings();

//       // Combine both arrays (avoid duplicates by checking booking IDs)
//       const combinedBookings = [...allBookings];
//       userBookings.forEach(userBooking => {
//         if (!combinedBookings.find(booking => booking.id === userBooking.id)) {
//           combinedBookings.push(userBooking);
//         }
//       });

//       setAllBookings(combinedBookings);
//     } catch (error) {
//       console.log('Error loading existing bookings:', error);
//     }
//   };

//   // Calculate total fare for session bookings
//   const calculateTotalFare = () => {
//     const totalSeats = sessionBookings.reduce(
//       (sum, booking) => sum + booking.seats.length,
//       0,
//     );
//     const baseFare = routeInfo.fare || 2000;
//     const totalAmount = totalSeats * baseFare;
//     return {
//       totalSeats,
//       baseFare,
//       totalAmount,
//       perSeat: baseFare,
//     };
//   };

//   // Get booking statistics for user
//   const getBookingStats = async () => {
//     try {
//       const userBookings = await getUserBookings();
//       const totalBookings = userBookings.length;
//       const totalSeats = userBookings.reduce(
//         (sum, booking) =>
//           sum +
//           booking.dates.reduce(
//             (dateSum, date) => dateSum + date.seats.length,
//             0,
//           ),
//         0,
//       );
//       const upcomingBookings = userBookings.filter(booking => {
//         const bookingDate = new Date(booking.dates[0].date);
//         return bookingDate >= new Date();
//       }).length;

//       return {
//         totalBookings,
//         totalSeats,
//         upcomingBookings,
//         pastBookings: totalBookings - upcomingBookings,
//       };
//     } catch (error) {
//       console.log('Error getting booking stats:', error);
//       return {
//         totalBookings: 0,
//         totalSeats: 0,
//         upcomingBookings: 0,
//         pastBookings: 0,
//       };
//     }
//   };

//   const generateCalendar = () => {
//     const today = new Date();
//     const currentMonth = today.getMonth();
//     const currentYear = today.getFullYear();
//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//     const days = [];
//     for (let i = 1; i <= daysInMonth; i++) {
//       const date = new Date(currentYear, currentMonth, i);
//       const isWeekend = date.getDay() === 0 || date.getDay() === 6;
//       const isPast = i < today.getDate() && currentMonth === today.getMonth();

//       days.push({
//         day: i,
//         isWeekend,
//         isPast,
//         isToday: i === today.getDate() && currentMonth === today.getMonth(),
//       });
//     }
//     setCalendarDays(days);
//   };

//   const generateSeatLayout = () => {
//     const seats = [];

//     for (let row = 1; row <= BUS_CONFIG.totalRows; row++) {
//       // Left side seats
//       for (let leftSeat = 1; leftSeat <= BUS_CONFIG.leftSeats; leftSeat++) {
//         const seatNumber = `${row}${String.fromCharCode(64 + leftSeat)}`; // 1A, 1B, etc.
//         seats.push({
//           id: seatNumber,
//           row,
//           position: 'left',
//           seatIndex: leftSeat,
//         });
//       }

//       // Right side seats
//       for (let rightSeat = 1; rightSeat <= BUS_CONFIG.rightSeats; rightSeat++) {
//         const seatNumber = `${row}${String.fromCharCode(
//           64 + BUS_CONFIG.leftSeats + rightSeat,
//         )}`; // 1C, 1D, etc.
//         seats.push({
//           id: seatNumber,
//           row,
//           position: 'right',
//           seatIndex: rightSeat,
//         });
//       }
//     }

//     return seats;
//   };

//   const selectDate = dayObj => {
//     if (dayObj.isPast) {
//       Alert.alert('Invalid Date', 'Cannot select past dates!');
//       return;
//     }

//     const dateString = `${dayObj.day} ${currentMonth}`;
//     setSelectedDate(dateString);

//     // Load existing bookings for this date and route
//     loadBookingsForDate(dateString);
//   };

//   const loadBookingsForDate = dateString => {
//     if (!routeInfo) return;

//     // Find bookings for this specific date, route, and time
//     const dateBookings = allBookings.filter(
//       booking =>
//         booking.startTime === routeInfo.startTime &&
//         booking.route.Start === routeInfo.route.Start &&
//         booking.route.End === routeInfo.route.End &&
//         booking.dates.some(d => d.date === dateString),
//     );

//     // Get all booked seats for this date
//     const bookedSeatsForDate = [];
//     dateBookings.forEach(booking => {
//       const dateInfo = booking.dates.find(d => d.date === dateString);
//       if (dateInfo) {
//         bookedSeatsForDate.push(...dateInfo.seats);
//       }
//     });

//     setBookedSeats(bookedSeatsForDate);

//     // Check if current session has bookings for this date
//     const currentSessionBooking = sessionBookings.find(
//       booking => booking.date === dateString,
//     );
//     if (currentSessionBooking) {
//       setSelectedSeats(currentSessionBooking.seats);
//     } else {
//       setSelectedSeats([]);
//     }
//   };

//   const toggleSeat = seatId => {
//     if (bookedSeats.includes(seatId)) {
//       Alert.alert(
//         'Seat Unavailable',
//         'This seat is already booked for the selected date.',
//       );
//       return;
//     }

//     setSelectedSeats(prevSeats => {
//       if (prevSeats.includes(seatId)) {
//         return prevSeats.filter(seat => seat !== seatId);
//       } else {
//         return [...prevSeats, seatId];
//       }
//     });
//   };

//   const saveDateBooking = () => {
//     if (!selectedDate || selectedSeats.length === 0) {
//       Alert.alert(
//         'Selection Required',
//         'Please select date and at least one seat!',
//       );
//       return;
//     }

//     const existingBookingIndex = sessionBookings.findIndex(
//       booking => booking.date === selectedDate,
//     );

//     const newBooking = {
//       date: selectedDate,
//       seats: [...selectedSeats],
//       fare: routeInfo.fare || 2000,
//       seatCount: selectedSeats.length,
//       totalAmount: selectedSeats.length * (routeInfo.fare || 2000),
//     };

//     if (existingBookingIndex >= 0) {
//       // Update existing booking for this date
//       const updatedBookings = [...sessionBookings];
//       updatedBookings[existingBookingIndex] = newBooking;
//       setSessionBookings(updatedBookings);
//     } else {
//       // Add new booking for this date
//       setSessionBookings(prev => [...prev, newBooking]);
//     }

//     const totalAmount = selectedSeats.length * (routeInfo.fare || 2000);

//     Alert.alert(
//       'Success',
//       `Seats saved for ${selectedDate}!\nSelected seats: ${selectedSeats.join(
//         ', ',
//       )}\nAmount: LKR ${totalAmount.toLocaleString()}`,
//     );
//     setSelectedSeats([]);
//     setSelectedDate(null);
//   };

//   const finalizeBooking = async () => {
//     if (sessionBookings.length === 0) {
//       Alert.alert(
//         'No Bookings',
//         'Please select dates and seats before finalizing!',
//       );
//       return;
//     }

//     if (!routeInfo) {
//       Alert.alert('Error', 'Route information not found!');
//       return;
//     }

//     const fareCalculation = calculateTotalFare();

//     // Show confirmation with fare details
//     Alert.alert(
//       'Confirm Booking',
//       `Booking Summary:\n\n` +
//         `Route: ${routeInfo.route.Start} → ${routeInfo.route.End}\n` +
//         `Time: ${routeInfo.startTime} - ${routeInfo.EndTime}\n` +
//         `Total Dates: ${sessionBookings.length}\n` +
//         `Total Seats: ${fareCalculation.totalSeats}\n` +
//         `Fare per Seat: LKR ${fareCalculation.perSeat.toLocaleString()}\n` +
//         `Total Amount: LKR ${fareCalculation.totalAmount.toLocaleString()}\n\n` +
//         `Do you want to proceed to payment?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Proceed to Payment', onPress: () => proceedToPayment() },
//       ],
//     );
//   };

//   const proceedToPayment = async () => {
//     const currentUserData = await AsyncStorage.getItem('currentUser');
//     const fareCalculation = calculateTotalFare();

//     try {
//       const newBooking = {
//         id: Date.now().toString(),
//         startTime: routeInfo.startTime,
//         endTime: routeInfo.EndTime,
//         type: routeInfo.type,
//         route: routeInfo.route,
//         busInfo: routeInfo.busInfo,
//         dates: sessionBookings,
//         bus: busInfo.busId,
//         user: JSON.parse(currentUserData).email,
//         bookingDate: new Date().toISOString(),
//         fareDetails: fareCalculation,
//         totalAmount: fareCalculation.totalAmount,
//       };

//       if (!currentUserData) {
//         Alert.alert('Error', 'User not logged in. Please login first.');
//         return;
//       }

//       const currentUser = JSON.parse(currentUserData);

//       // Get all users data
//       const usersData = await AsyncStorage.getItem('usersArray');
//       const users = usersData ? JSON.parse(usersData) : [];

//       // Find the current user in the users array
//       const userIndex = users.findIndex(
//         user => user.role === 'Owner' && user.bus[0].id === busInfo.busId,
//       );

//       if (userIndex === -1) {
//         Alert.alert('Error', 'User not found in database.');
//         return;
//       }

//       // Initialize bus object if it doesn't exist
//       if (!users[userIndex].bus) {
//         users[userIndex].bus[0] = {
//           bookings: [],
//         };
//       }

//       // Initialize bookings array if it doesn't exist
//       if (!users[userIndex].bus[0].bookings) {
//         users[userIndex].bus[0].bookings = [];
//       }

//       // Add the new booking to user's bus bookings
//       users[userIndex].bus[0].bookings.push(newBooking);

//       // Save updated users data back to AsyncStorage
//       await AsyncStorage.setItem('usersArray', JSON.stringify(users));

//       //Update current user data in AsyncStorage as well
//       await AsyncStorage.setItem(
//         'currentUser',
//         JSON.stringify(users[userIndex]),
//       );

//       // Also keep the existing busBookings for backward compatibility
//       const existingBookings = await AsyncStorage.getItem('busBookings');
//       const allBookings = existingBookings ? JSON.parse(existingBookings) : [];
//       allBookings.push(newBooking);
//       await AsyncStorage.setItem('busBookings', JSON.stringify(allBookings));

//       Alert.alert(
//         'Booking Confirmed!',
//         `Your booking has been saved successfully!\n\n` +
//           `Booking Details:\n` +
//           `📅 Total dates: ${sessionBookings.length}\n` +
//           `💺 Total seats: ${fareCalculation.totalSeats}\n` +
//           `🚌 Route: ${routeInfo.route.Start} → ${routeInfo.route.End}\n` +
//           `⏰ Time: ${routeInfo.startTime} - ${routeInfo.EndTime}\n` +
//           `💰 Total Amount: LKR ${fareCalculation.totalAmount.toLocaleString()}`,
//         [
//           {
//             text: 'View My Bookings',
//             onPress: () => {
//               setSessionBookings([]);
//               navigation.goBack();
//             },
//           },
//           {
//             text: 'OK',
//             onPress: () => {
//               setSessionBookings([]);
//               navigation.goBack();
//             },
//             style: 'default',
//           },
//         ],
//       );
//     } catch (error) {
//       console.log('Error saving booking:', error);
//       Alert.alert(
//         'Booking Failed',
//         'Failed to save booking. Please check your internet connection and try again.',
//         [
//           { text: 'Retry', onPress: () => finalizeBooking() },
//           { text: 'Cancel', style: 'cancel' },
//         ],
//       );
//     }
//   };

//   const removeSessionBooking = date => {
//     setSessionBookings(prev => prev.filter(booking => booking.date !== date));
//   };

//   const goBack = () => {
//     if (sessionBookings.length > 0) {
//       Alert.alert(
//         'Unsaved Bookings',
//         'You have unsaved bookings. Are you sure you want to go back?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           {
//             text: 'Discard',
//             style: 'destructive',
//             onPress: () => navigation.goBack(),
//           },
//         ],
//       );
//     } else {
//       navigation.goBack();
//     }
//   };

//   const renderCalendarGrid = () => {
//     return (
//       <Animated.View
//         style={[
//           styles.calendar,
//           { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
//         ]}
//       >
//         {/* Calendar Header */}
//         <View style={styles.calendarHeader}>
//           <Text style={styles.monthText}>{currentMonth}</Text>
//           <View style={styles.weekDays}>
//             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//               <Text key={day} style={styles.weekDayText}>
//                 {day}
//               </Text>
//             ))}
//           </View>
//         </View>

//         {/* Calendar Days */}
//         <View style={styles.daysGrid}>
//           {calendarDays.map(dayObj => {
//             const dateString = `${dayObj.day} ${currentMonth}`;
//             const hasBooking = sessionBookings.some(
//               booking => booking.date === dateString,
//             );

//             return (
//               <TouchableOpacity
//                 key={dayObj.day}
//                 style={[
//                   styles.dateCell,
//                   dayObj.isToday && styles.todayCell,
//                   selectedDate === dateString && styles.selectedDateCell,
//                   dayObj.isPast && styles.pastDateCell,
//                   dayObj.isWeekend && styles.weekendCell,
//                   hasBooking && styles.hasBookingCell,
//                 ]}
//                 onPress={() => selectDate(dayObj)}
//                 activeOpacity={dayObj.isPast ? 1 : 0.7}
//                 disabled={dayObj.isPast}
//               >
//                 <Text
//                   style={[
//                     styles.dateCellText,
//                     dayObj.isToday && styles.todayText,
//                     selectedDate === dateString && styles.selectedDateText,
//                     dayObj.isPast && styles.pastDateText,
//                     dayObj.isWeekend && styles.weekendText,
//                     hasBooking && styles.hasBookingText,
//                   ]}
//                 >
//                   {dayObj.day}
//                 </Text>
//                 {dayObj.isToday && <View style={styles.todayDot} />}
//                 {hasBooking && (
//                   <View style={styles.bookingIndicator}>
//                     <SimpleIcon name="check-circle" size={10} color="#10B981" />
//                   </View>
//                 )}
//                 {selectedDate === dateString && (
//                   <View style={styles.selectedIndicator}>
//                     <Text style={styles.selectedCheckmark}>✓</Text>
//                   </View>
//                 )}
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </Animated.View>
//     );
//   };

//   const renderSeatLayout = () => {
//     if (!selectedDate) return null;

//     const seats = generateSeatLayout();
//     const rows = [];

//     for (let row = 1; row <= BUS_CONFIG.totalRows; row++) {
//       const rowSeats = seats.filter(seat => seat.row === row);
//       const leftSeats = rowSeats.filter(seat => seat.position === 'left');
//       const rightSeats = rowSeats.filter(seat => seat.position === 'right');

//       rows.push(
//         <View key={row} style={styles.seatRow}>
//           <Text style={styles.rowNumber}>{row}</Text>

//           {/* Left seats */}
//           <View style={styles.seatGroup}>
//             {leftSeats.map(seat => (
//               <TouchableOpacity
//                 key={seat.id}
//                 style={[
//                   styles.seat,
//                   selectedSeats.includes(seat.id) && styles.selectedSeat,
//                   bookedSeats.includes(seat.id) && styles.bookedSeat,
//                 ]}
//                 onPress={() => toggleSeat(seat.id)}
//                 disabled={bookedSeats.includes(seat.id)}
//                 activeOpacity={0.7}
//               >
//                 <Text
//                   style={[
//                     styles.seatText,
//                     selectedSeats.includes(seat.id) && styles.selectedSeatText,
//                     bookedSeats.includes(seat.id) && styles.bookedSeatText,
//                   ]}
//                 >
//                   {seat.id}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* Aisle */}
//           <View style={styles.aisle} />

//           {/* Right seats */}
//           <View style={styles.seatGroup}>
//             {rightSeats.map(seat => (
//               <TouchableOpacity
//                 key={seat.id}
//                 style={[
//                   styles.seat,
//                   selectedSeats.includes(seat.id) && styles.selectedSeat,
//                   bookedSeats.includes(seat.id) && styles.bookedSeat,
//                 ]}
//                 onPress={() => toggleSeat(seat.id)}
//                 disabled={bookedSeats.includes(seat.id)}
//                 activeOpacity={0.7}
//               >
//                 <Text
//                   style={[
//                     styles.seatText,
//                     selectedSeats.includes(seat.id) && styles.selectedSeatText,
//                     bookedSeats.includes(seat.id) && styles.bookedSeatText,
//                   ]}
//                 >
//                   {seat.id}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>,
//       );
//     }

//     return (
//       <View style={styles.seatMapContainer}>
//         <View style={styles.seatMapHeader}>
//           <Text style={styles.seatMapTitle}>
//             Select Seats for {selectedDate}
//           </Text>
//           <View style={styles.seatLegend}>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendSeat, styles.availableSeat]} />
//               <Text style={styles.legendText}>Available</Text>
//             </View>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendSeat, styles.selectedSeat]} />
//               <Text style={styles.legendText}>Selected</Text>
//             </View>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendSeat, styles.bookedSeat]} />
//               <Text style={styles.legendText}>Booked</Text>
//             </View>
//           </View>
//         </View>

//         <ScrollView style={styles.seatMap} showsVerticalScrollIndicator={false}>
//           <View style={styles.busHeader}>
//             <Text style={styles.busHeaderText}>FRONT</Text>
//           </View>
//           {rows}
//         </ScrollView>

//         {selectedSeats.length > 0 && (
//           <View style={styles.selectedSeatsInfo}>
//             <Text style={styles.selectedSeatsText}>
//               Selected: {selectedSeats.join(', ')} ({selectedSeats.length} seat
//               {selectedSeats.length > 1 ? 's' : ''})
//             </Text>
//             <Text style={styles.fareText}>
//               Fare: LKR{' '}
//               {(
//                 (routeInfo.fare || 2000) * selectedSeats.length
//               ).toLocaleString()}
//             </Text>
//             <TouchableOpacity
//               style={styles.saveDateButton}
//               onPress={saveDateBooking}
//             >
//               <SimpleIcon name="save" size={16} color="white" />
//               <Text style={styles.saveDateButtonText}>
//                 Save for {selectedDate}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     );
//   };

//   const renderSessionBookings = () => {
//     if (sessionBookings.length === 0) return null;

//     const fareCalculation = calculateTotalFare();

//     return (
//       <View style={styles.sessionBookingsContainer}>
//         <Text style={styles.sessionBookingsTitle}>Current Booking Session</Text>

//         {/* Fare Summary */}
//         <View style={styles.fareSummaryCard}>
//           <View style={styles.fareSummaryHeader}>
//             <SimpleIcon name="cash" size={20} color="#10B981" />
//             <Text style={styles.fareSummaryTitle}>Fare Summary</Text>
//           </View>
//           <View style={styles.fareSummaryContent}>
//             <View style={styles.fareRow}>
//               <Text style={styles.fareLabel}>Total Seats:</Text>
//               <Text style={styles.fareValue}>{fareCalculation.totalSeats}</Text>
//             </View>
//             <View style={styles.fareRow}>
//               <Text style={styles.fareLabel}>Per Seat:</Text>
//               <Text style={styles.fareValue}>
//                 LKR {fareCalculation.perSeat.toLocaleString()}
//               </Text>
//             </View>
//             <View style={styles.fareRow}>
//               <Text style={styles.fareLabel}>Total Dates:</Text>
//               <Text style={styles.fareValue}>{sessionBookings.length}</Text>
//             </View>
//             <View style={[styles.fareRow, styles.totalFareRow]}>
//               <Text style={styles.totalFareLabel}>Total Amount:</Text>
//               <Text style={styles.totalFareValue}>
//                 LKR {fareCalculation.totalAmount.toLocaleString()}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {sessionBookings.map((booking, index) => (
//           <View key={index} style={styles.sessionBookingCard}>
//             <View style={styles.sessionBookingInfo}>
//               <Text style={styles.sessionBookingDate}>{booking.date}</Text>
//               <Text style={styles.sessionBookingSeats}>
//                 Seats: {booking.seats.join(', ')} ({booking.seats.length} seat
//                 {booking.seats.length > 1 ? 's' : ''})
//               </Text>
//               <Text style={styles.sessionBookingAmount}>
//                 Amount: LKR {booking.totalAmount.toLocaleString()}
//               </Text>
//             </View>
//             <TouchableOpacity
//               style={styles.removeBookingButton}
//               onPress={() => removeSessionBooking(booking.date)}
//             >
//               <SimpleIcon name="x-circle" size={20} color="#FF6B6B" />
//             </TouchableOpacity>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#4ECDC4" />

//       {/* Enhanced Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={goBack}>
//           <SimpleIcon name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//         <View style={styles.headerContent}>
//           <Text style={styles.headerTitle}>Book Seats</Text>
//           <Text style={styles.headerSubtitle}>
//             {routeInfo
//               ? `${routeInfo.route.Start} → ${routeInfo.route.End}`
//               : 'Loading...'}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.infoBtn}>
//           <SimpleIcon
//             name="information-circle-outline"
//             size={24}
//             color="white"
//           />
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Date Section */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <SimpleIcon name="calendar" size={20} color="#4ECDC4" />
//             <Text style={styles.sectionTitle}>Select Date</Text>
//           </View>
//           {renderCalendarGrid()}
//         </View>

//         {/* Seat Layout */}
//         {renderSeatLayout()}

//         {/* Session Bookings */}
//         {renderSessionBookings()}

//         {/* Finalize Booking Button */}
//         {sessionBookings.length > 0 && (
//           <TouchableOpacity
//             style={styles.finalizeButton}
//             onPress={finalizeBooking}
//           >
//             <SimpleIcon name="checkmark-circle" size={20} color="white" />
//             <Text style={styles.finalizeButtonText}>
//               Proceed to Payment (LKR{' '}
//               {calculateTotalFare().totalAmount.toLocaleString()})
//             </Text>
//           </TouchableOpacity>
//         )}

//         <View style={{ height: 20 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#4ECDC4',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#4ECDC4',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   backBtn: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     minWidth: 40,
//     alignItems: 'center',
//   },
//   headerContent: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: 'white',
//   },
//   headerSubtitle: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.8)',
//     marginTop: 2,
//   },
//   infoBtn: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     minWidth: 40,
//     alignItems: 'center',
//   },
//   content: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingTop: 30,
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2c3e50',
//     marginLeft: 8,
//   },
//   calendarHeader: {
//     marginBottom: 15,
//   },
//   monthText: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#2c3e50',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   weekDays: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//   },
//   weekDayText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#666',
//     textAlign: 'center',
//     width: (width - 90) / 7,
//   },
//   calendar: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 15,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   daysGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//   },
//   dateCell: {
//     width: (width - 90) / 7,
//     aspectRatio: 1,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 8,
//     borderWidth: 2,
//     borderColor: 'transparent',
//     position: 'relative',
//   },
//   todayCell: {
//     borderColor: '#4ECDC4',
//     backgroundColor: 'rgba(78, 205, 196, 0.1)',
//   },
//   selectedDateCell: {
//     backgroundColor: '#4ECDC4',
//     transform: [{ scale: 1.05 }],
//     ...Platform.select({
//       ios: {
//         shadowColor: '#4ECDC4',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   pastDateCell: {
//     backgroundColor: '#e9ecef',
//     opacity: 0.5,
//   },
//   weekendCell: {
//     backgroundColor: 'rgba(255, 107, 107, 0.1)',
//   },
//   hasBookingCell: {
//     backgroundColor: 'rgba(16, 185, 129, 0.1)',
//     borderColor: '#10B981',
//   },
//   dateCellText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#2c3e50',
//   },
//   todayText: {
//     color: '#4ECDC4',
//     fontWeight: '700',
//   },
//   selectedDateText: {
//     color: 'white',
//     fontWeight: '700',
//   },
//   pastDateText: {
//     color: '#adb5bd',
//   },
//   weekendText: {
//     color: '#FF6B6B',
//   },
//   hasBookingText: {
//     color: '#10B981',
//     fontWeight: '700',
//   },
//   todayDot: {
//     position: 'absolute',
//     bottom: 4,
//     width: 4,
//     height: 4,
//     borderRadius: 2,
//     backgroundColor: '#4ECDC4',
//   },
//   bookingIndicator: {
//     position: 'absolute',
//     top: 2,
//     left: 2,
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: 'rgba(16, 185, 129, 0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   selectedIndicator: {
//     position: 'absolute',
//     top: 2,
//     right: 2,
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   selectedCheckmark: {
//     color: '#4ECDC4',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   seatMapContainer: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 15,
//     marginBottom: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   seatMapHeader: {
//     marginBottom: 20,
//   },
//   seatMapTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2c3e50',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   seatLegend: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 20,
//   },
//   legendItem: {
//     alignItems: 'center',
//     gap: 5,
//   },
//   legendSeat: {
//     width: 20,
//     height: 20,
//     borderRadius: 4,
//   },
//   legendText: {
//     fontSize: 10,
//     color: '#666',
//     fontWeight: '500',
//   },
//   availableSeat: {
//     backgroundColor: '#f8f9fa',
//     borderWidth: 1,
//     borderColor: '#dee2e6',
//   },
//   seatMap: {
//     maxHeight: 300,
//   },
//   busHeader: {
//     backgroundColor: '#4ECDC4',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   busHeaderText: {
//     color: 'white',
//     fontWeight: '700',
//     textAlign: 'center',
//     fontSize: 12,
//     letterSpacing: 1,
//   },
//   seatRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     paddingHorizontal: 10,
//   },
//   rowNumber: {
//     width: 25,
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#666',
//     textAlign: 'center',
//   },
//   seatGroup: {
//     flexDirection: 'row',
//     gap: 6,
//   },
//   aisle: {
//     width: 40,
//   },
//   seat: {
//     width: 35,
//     height: 35,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#dee2e6',
//   },
//   selectedSeat: {
//     backgroundColor: '#4ECDC4',
//     borderColor: '#4ECDC4',
//   },
//   bookedSeat: {
//     backgroundColor: '#FF6B6B',
//     borderColor: '#FF6B6B',
//   },
//   seatText: {
//     fontSize: 10,
//     fontWeight: '600',
//     color: '#2c3e50',
//   },
//   selectedSeatText: {
//     color: 'white',
//     fontWeight: '700',
//   },
//   bookedSeatText: {
//     color: 'white',
//     fontWeight: '600',
//   },
//   selectedSeatsInfo: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#e9ecef',
//   },
//   selectedSeatsText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#2c3e50',
//     marginBottom: 5,
//     textAlign: 'center',
//   },
//   fareText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#10B981',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   saveDateButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#4ECDC4',
//     padding: 12,
//     borderRadius: 10,
//     gap: 8,
//   },
//   saveDateButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   sessionBookingsContainer: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 15,
//     marginBottom: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   sessionBookingsTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2c3e50',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   fareSummaryCard: {
//     backgroundColor: '#f0fdf4',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#bbf7d0',
//   },
//   fareSummaryHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   fareSummaryTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#166534',
//     marginLeft: 8,
//   },
//   fareSummaryContent: {
//     gap: 8,
//   },
//   fareRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   fareLabel: {
//     fontSize: 14,
//     color: '#166534',
//     fontWeight: '500',
//   },
//   fareValue: {
//     fontSize: 14,
//     color: '#166534',
//     fontWeight: '600',
//   },
//   totalFareRow: {
//     borderTopWidth: 1,
//     borderTopColor: '#bbf7d0',
//     paddingTop: 8,
//     marginTop: 8,
//   },
//   totalFareLabel: {
//     fontSize: 16,
//     color: '#15803d',
//     fontWeight: '700',
//   },
//   totalFareValue: {
//     fontSize: 18,
//     color: '#15803d',
//     fontWeight: '800',
//   },
//   sessionBookingCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#f8f9fa',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   sessionBookingInfo: {
//     flex: 1,
//   },
//   sessionBookingDate: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#2c3e50',
//     marginBottom: 4,
//   },
//   sessionBookingSeats: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 2,
//   },
//   sessionBookingAmount: {
//     fontSize: 14,
//     color: '#10B981',
//     fontWeight: '700',
//   },
//   removeBookingButton: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 107, 107, 0.1)',
//   },
//   finalizeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#10B981',
//     padding: 16,
//     borderRadius: 15,
//     gap: 10,
//     marginBottom: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#10B981',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   finalizeButtonText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// });

// export default BoockingDate;//////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Alert,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

const { width, height } = Dimensions.get('window');

// Bus seat configuration
const BUS_CONFIG = {
  leftSeats: 2,
  rightSeats: 3,
  totalRows: 15,
};

// Simple Icon Component
const SimpleIcon = ({ name, size = 20, color = 'white', style }) => {
  const iconMap = {
    'arrow-back': '←',
    'checkmark-circle': '✓',
    'information-circle-outline': 'ℹ',
    calendar: '📅',
    time: '⏰',
    save: '💾',
    seat: '💺',
    'check-circle': '✅',
    'x-circle': '❌',
    cash: '💰',
  };

  return (
    <Text style={[{ fontSize: size, color, textAlign: 'center' }, style]}>
      {iconMap[name] || '•'}
    </Text>
  );
};

const BoockingDate = ({ navigation, route }) => {
  // Correctly extract parameters from route
  const busId = route?.params?.busId || 'ACD-01-';
  const busNumber = route?.params?.busNumber || 'ACD-01-';

  // Create busInfo object from the parameters
  const busInfo = {
    busId: busId,
    busNumber: busNumber,
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('January 2025');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-50));
  const [routeInfo, setRouteInfo] = useState({
    startTime: '20:20',
    EndTime: '23:00',
    route: {
      Start: 'Galle',
      End: 'Makubura',
    },
    fare: 2000, // Default fare
  });
  const [selectedDateBookings, setSelectedDateBookings] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [sessionBookings, setSessionBookings] = useState([]); // Current session bookings

  const animateIn = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  useEffect(() => {
    generateCalendar();
    loadRouteInfo();
    loadExistingBookings();
    animateIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateIn]);

  const loadRouteInfo = async () => {
    try {
      const data = await AsyncStorage.getItem('selectedRoute');
      if (data) {
        const parsedRoute = JSON.parse(data);
        setRouteInfo({
          ...parsedRoute,
          fare: parsedRoute.fare || 2000, // Use fare from route or default
        });
      }
    } catch (error) {
      console.log('Error loading route info:', error);
    }
  };

  // Get current user's bookings
  const getUserBookings = async () => {
    try {
      const currentUserData = await AsyncStorage.getItem('currentUser');
      if (!currentUserData) return [];

      const currentUser = JSON.parse(currentUserData);
      console.log(currentUser);
      return currentUser.bus?.bookings || [];
    } catch (error) {
      console.log('Error getting user bookings:', error);
      return [];
    }
  };

  // Check if seat is booked by current user
  const isUserBookedSeat = (seatId, date) => {
    const userBookings = getUserBookings();
    return userBookings.some(booking =>
      booking.dates.some(
        dateBooking =>
          dateBooking.date === date && dateBooking.seats.includes(seatId),
      ),
    );
  };

  // Load existing bookings including user's own bookings
  const loadExistingBookings = async () => {
    try {
      // Load all bookings from busBookings (for other users)
      const savedBookings = await AsyncStorage.getItem('busBookings');
      const allBookings = savedBookings ? JSON.parse(savedBookings) : [];

      // Load current user's bookings
      const userBookings = await getUserBookings();

      // Combine both arrays (avoid duplicates by checking booking IDs)
      const combinedBookings = [...allBookings];
      userBookings.forEach(userBooking => {
        if (!combinedBookings.find(booking => booking.id === userBooking.id)) {
          combinedBookings.push(userBooking);
        }
      });

      setAllBookings(combinedBookings);
    } catch (error) {
      console.log('Error loading existing bookings:', error);
    }
  };

  // Calculate total fare for session bookings
  const calculateTotalFare = () => {
    const totalSeats = sessionBookings.reduce(
      (sum, booking) => sum + booking.seats.length,
      0,
    );
    const baseFare = routeInfo.fare || 2000;
    const totalAmount = totalSeats * baseFare;
    return {
      totalSeats,
      baseFare,
      totalAmount,
      perSeat: baseFare,
    };
  };

  // Get booking statistics for user
  const getBookingStats = async () => {
    try {
      const userBookings = await getUserBookings();
      const totalBookings = userBookings.length;
      const totalSeats = userBookings.reduce(
        (sum, booking) =>
          sum +
          booking.dates.reduce(
            (dateSum, date) => dateSum + date.seats.length,
            0,
          ),
        0,
      );
      const upcomingBookings = userBookings.filter(booking => {
        const bookingDate = new Date(booking.dates[0].date);
        return bookingDate >= new Date();
      }).length;

      return {
        totalBookings,
        totalSeats,
        upcomingBookings,
        pastBookings: totalBookings - upcomingBookings,
      };
    } catch (error) {
      console.log('Error getting booking stats:', error);
      return {
        totalBookings: 0,
        totalSeats: 0,
        upcomingBookings: 0,
        pastBookings: 0,
      };
    }
  };

  const generateCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isPast = i < today.getDate() && currentMonth === today.getMonth();

      days.push({
        day: i,
        isWeekend,
        isPast,
        isToday: i === today.getDate() && currentMonth === today.getMonth(),
      });
    }
    setCalendarDays(days);
  };

  const generateSeatLayout = () => {
    const seats = [];

    for (let row = 1; row <= BUS_CONFIG.totalRows; row++) {
      // Left side seats
      for (let leftSeat = 1; leftSeat <= BUS_CONFIG.leftSeats; leftSeat++) {
        const seatNumber = `${row}${String.fromCharCode(64 + leftSeat)}`; // 1A, 1B, etc.
        seats.push({
          id: seatNumber,
          row,
          position: 'left',
          seatIndex: leftSeat,
        });
      }

      // Right side seats
      for (let rightSeat = 1; rightSeat <= BUS_CONFIG.rightSeats; rightSeat++) {
        const seatNumber = `${row}${String.fromCharCode(
          64 + BUS_CONFIG.leftSeats + rightSeat,
        )}`; // 1C, 1D, etc.
        seats.push({
          id: seatNumber,
          row,
          position: 'right',
          seatIndex: rightSeat,
        });
      }
    }

    return seats;
  };

  const selectDate = dayObj => {
    if (dayObj.isPast) {
      Alert.alert('Invalid Date', 'Cannot select past dates!');
      return;
    }

    const dateString = `${dayObj.day} ${currentMonth}`;
    setSelectedDate(dateString);

    // Load existing bookings for this date and route
    loadBookingsForDate(dateString);
  };

  const loadBookingsForDate = dateString => {
    if (!routeInfo) return;

    // Find bookings for this specific date, route, and time
    const dateBookings = allBookings.filter(
      booking =>
        booking.startTime === routeInfo.startTime &&
        booking.route.Start === routeInfo.route.Start &&
        booking.route.End === routeInfo.route.End &&
        booking.dates.some(d => d.date === dateString),
    );

    // Get all booked seats for this date
    const bookedSeatsForDate = [];
    dateBookings.forEach(booking => {
      const dateInfo = booking.dates.find(d => d.date === dateString);
      if (dateInfo) {
        bookedSeatsForDate.push(...dateInfo.seats);
      }
    });

    setBookedSeats(bookedSeatsForDate);

    // Check if current session has bookings for this date
    const currentSessionBooking = sessionBookings.find(
      booking => booking.date === dateString,
    );
    if (currentSessionBooking) {
      setSelectedSeats(currentSessionBooking.seats);
    } else {
      setSelectedSeats([]);
    }
  };

  const toggleSeat = seatId => {
    if (bookedSeats.includes(seatId)) {
      Alert.alert(
        'Seat Unavailable',
        'This seat is already booked for the selected date.',
      );
      return;
    }

    setSelectedSeats(prevSeats => {
      if (prevSeats.includes(seatId)) {
        return prevSeats.filter(seat => seat !== seatId);
      } else {
        return [...prevSeats, seatId];
      }
    });
  };

  const saveDateBooking = () => {
    if (!selectedDate || selectedSeats.length === 0) {
      Alert.alert(
        'Selection Required',
        'Please select date and at least one seat!',
      );
      return;
    }

    const existingBookingIndex = sessionBookings.findIndex(
      booking => booking.date === selectedDate,
    );

    const newBooking = {
      date: selectedDate,
      seats: [...selectedSeats],
      fare: routeInfo.fare || 2000,
      seatCount: selectedSeats.length,
      totalAmount: selectedSeats.length * (routeInfo.fare || 2000),
    };

    if (existingBookingIndex >= 0) {
      // Update existing booking for this date
      const updatedBookings = [...sessionBookings];
      updatedBookings[existingBookingIndex] = newBooking;
      setSessionBookings(updatedBookings);
    } else {
      // Add new booking for this date
      setSessionBookings(prev => [...prev, newBooking]);
    }

    const totalAmount = selectedSeats.length * (routeInfo.fare || 2000);

    Alert.alert(
      'Success',
      `Seats saved for ${selectedDate}!\nSelected seats: ${selectedSeats.join(
        ', ',
      )}\nAmount: LKR ${totalAmount.toLocaleString()}`,
    );
    setSelectedSeats([]);
    setSelectedDate(null);
  };

  const finalizeBooking = async () => {
    if (sessionBookings.length === 0) {
      Alert.alert(
        'No Bookings',
        'Please select dates and seats before finalizing!',
      );
      return;
    }

    if (!routeInfo) {
      Alert.alert('Error', 'Route information not found!');
      return;
    }

    const fareCalculation = calculateTotalFare();

    // Show confirmation with fare details
    Alert.alert(
      'Confirm Booking',
      `Booking Summary:\n\n` +
        `Route: ${routeInfo.route.Start} → ${routeInfo.route.End}\n` +
        `Time: ${routeInfo.startTime} - ${routeInfo.EndTime}\n` +
        `Total Dates: ${sessionBookings.length}\n` +
        `Total Seats: ${fareCalculation.totalSeats}\n` +
        `Fare per Seat: LKR ${fareCalculation.perSeat.toLocaleString()}\n` +
        `Total Amount: LKR ${fareCalculation.totalAmount.toLocaleString()}\n\n` +
        `Do you want to proceed to payment?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Proceed to Payment', onPress: () => proceedToPayment() },
      ],
    );
  };

  const proceedToPayment = async () => {
    const currentUserData = await AsyncStorage.getItem('currentUser');
    const fareCalculation = calculateTotalFare();

    try {
      const newBooking = {
        id: Date.now().toString(),
        startTime: routeInfo.startTime,
        endTime: routeInfo.EndTime,
        type: routeInfo.type,
        route: routeInfo.route,
        busInfo: routeInfo.busInfo,
        dates: sessionBookings,
        bus: busInfo.busId,
        user: JSON.parse(currentUserData).email,
        bookingDate: new Date().toISOString(),
        fareDetails: fareCalculation,
        totalAmount: fareCalculation.totalAmount,
      };

      if (!currentUserData) {
        Alert.alert('Error', 'User not logged in. Please login first.');
        return;
      }

      const currentUser = JSON.parse(currentUserData);

      // Get all users data
      const usersData = await AsyncStorage.getItem('usersArray');
      const users = usersData ? JSON.parse(usersData) : [];

      // Find the current user in the users array
      const userIndex = users.findIndex(
        user => user.role === 'Owner' && user.bus[0].id === busInfo.busId,
      );

      if (userIndex === -1) {
        Alert.alert('Error', 'User not found in database.');
        return;
      }

      // Initialize bus object if it doesn't exist
      if (!users[userIndex].bus) {
        users[userIndex].bus[0] = {
          bookings: [],
        };
      }

      // Initialize bookings array if it doesn't exist
      if (!users[userIndex].bus[0].bookings) {
        users[userIndex].bus[0].bookings = [];
      }

      // Add the new booking to user's bus bookings
      users[userIndex].bus[0].bookings.push(newBooking);

      // Save updated users data back to AsyncStorage
      await AsyncStorage.setItem('usersArray', JSON.stringify(users));

      //Update current user data in AsyncStorage as well
      await AsyncStorage.setItem(
        'currentUser',
        JSON.stringify(users[userIndex]),
      );

      // Also keep the existing busBookings for backward compatibility
      const existingBookings = await AsyncStorage.getItem('busBookings');
      const allBookings = existingBookings ? JSON.parse(existingBookings) : [];
      allBookings.push(newBooking);
      await AsyncStorage.setItem('busBookings', JSON.stringify(allBookings));

      Alert.alert(
        'Booking Confirmed!',
        `Your booking has been saved successfully!\n\n` +
          `Booking Details:\n` +
          `📅 Total dates: ${sessionBookings.length}\n` +
          `💺 Total seats: ${fareCalculation.totalSeats}\n` +
          `🚌 Route: ${routeInfo.route.Start} → ${routeInfo.route.End}\n` +
          `⏰ Time: ${routeInfo.startTime} - ${routeInfo.EndTime}\n` +
          `💰 Total Amount: LKR ${fareCalculation.totalAmount.toLocaleString()}`,
        [
          {
            text: 'View My Bookings',
            onPress: () => {
              setSessionBookings([]);
              navigation.goBack();
            },
          },
          {
            text: 'OK',
            onPress: () => {
              setSessionBookings([]);
              navigation.goBack();
            },
            style: 'default',
          },
        ],
      );
    } catch (error) {
      console.log('Error saving booking:', error);
      Alert.alert(
        'Booking Failed',
        'Failed to save booking. Please check your internet connection and try again.',
        [
          { text: 'Retry', onPress: () => finalizeBooking() },
          { text: 'Cancel', style: 'cancel' },
        ],
      );
    }
  };

  const removeSessionBooking = date => {
    setSessionBookings(prev => prev.filter(booking => booking.date !== date));
  };

  const goBack = () => {
    if (sessionBookings.length > 0) {
      Alert.alert(
        'Unsaved Bookings',
        'You have unsaved bookings. Are you sure you want to go back?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } else {
      navigation.goBack();
    }
  };

  const renderCalendarGrid = () => {
    return (
      <Animated.View
        style={[
          styles.calendar,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Calendar Header */}
        <View style={styles.calendarHeader}>
          <Text style={styles.monthText}>{currentMonth}</Text>
          <View style={styles.weekDays}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <Text key={day} style={styles.weekDayText}>
                {day}
              </Text>
            ))}
          </View>
        </View>

        {/* Calendar Days */}
        <View style={styles.daysGrid}>
          {calendarDays.map(dayObj => {
            const dateString = `${dayObj.day} ${currentMonth}`;
            const hasBooking = sessionBookings.some(
              booking => booking.date === dateString,
            );

            return (
              <TouchableOpacity
                key={dayObj.day}
                style={[
                  styles.dateCell,
                  dayObj.isToday && styles.todayCell,
                  selectedDate === dateString && styles.selectedDateCell,
                  dayObj.isPast && styles.pastDateCell,
                  dayObj.isWeekend && styles.weekendCell,
                  hasBooking && styles.hasBookingCell,
                ]}
                onPress={() => selectDate(dayObj)}
                activeOpacity={dayObj.isPast ? 1 : 0.7}
                disabled={dayObj.isPast}
              >
                <Text
                  style={[
                    styles.dateCellText,
                    dayObj.isToday && styles.todayText,
                    selectedDate === dateString && styles.selectedDateText,
                    dayObj.isPast && styles.pastDateText,
                    dayObj.isWeekend && styles.weekendText,
                    hasBooking && styles.hasBookingText,
                  ]}
                >
                  {dayObj.day}
                </Text>
                {dayObj.isToday && <View style={styles.todayDot} />}
                {hasBooking && (
                  <View style={styles.bookingIndicator}>
                    <SimpleIcon name="check-circle" size={10} color="#10B981" />
                  </View>
                )}
                {selectedDate === dateString && (
                  <View style={styles.selectedIndicator}>
                    <Text style={styles.selectedCheckmark}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    );
  };

  const renderSeatLayout = () => {
    if (!selectedDate) return null;

    const seats = generateSeatLayout();
    const rows = [];

    for (let row = 1; row <= BUS_CONFIG.totalRows; row++) {
      const rowSeats = seats.filter(seat => seat.row === row);
      const leftSeats = rowSeats.filter(seat => seat.position === 'left');
      const rightSeats = rowSeats.filter(seat => seat.position === 'right');

      rows.push(
        <View key={row} style={styles.seatRow}>
          <Text style={styles.rowNumber}>{row}</Text>

          {/* Left seats */}
          <View style={styles.seatGroup}>
            {leftSeats.map(seat => (
              <TouchableOpacity
                key={seat.id}
                style={[
                  styles.seat,
                  selectedSeats.includes(seat.id) && styles.selectedSeat,
                  bookedSeats.includes(seat.id) && styles.bookedSeat,
                ]}
                onPress={() => toggleSeat(seat.id)}
                disabled={bookedSeats.includes(seat.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.seatText,
                    selectedSeats.includes(seat.id) && styles.selectedSeatText,
                    bookedSeats.includes(seat.id) && styles.bookedSeatText,
                  ]}
                >
                  {seat.id}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Aisle */}
          <View style={styles.aisle} />

          {/* Right seats */}
          <View style={styles.seatGroup}>
            {rightSeats.map(seat => (
              <TouchableOpacity
                key={seat.id}
                style={[
                  styles.seat,
                  selectedSeats.includes(seat.id) && styles.selectedSeat,
                  bookedSeats.includes(seat.id) && styles.bookedSeat,
                ]}
                onPress={() => toggleSeat(seat.id)}
                disabled={bookedSeats.includes(seat.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.seatText,
                    selectedSeats.includes(seat.id) && styles.selectedSeatText,
                    bookedSeats.includes(seat.id) && styles.bookedSeatText,
                  ]}
                >
                  {seat.id}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>,
      );
    }

    return (
      <View style={styles.seatMapContainer}>
        <View style={styles.seatMapHeader}>
          <Text style={styles.seatMapTitle}>
            Select Seats for {selectedDate}
          </Text>
          <View style={styles.seatLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendSeat, styles.availableSeat]} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendSeat, styles.selectedSeat]} />
              <Text style={styles.legendText}>Selected</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendSeat, styles.bookedSeat]} />
              <Text style={styles.legendText}>Booked</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.seatMap} showsVerticalScrollIndicator={false}>
          <View style={styles.busHeader}>
            <Text style={styles.busHeaderText}>FRONT</Text>
          </View>
          {rows}
        </ScrollView>

        {selectedSeats.length > 0 && (
          <View style={styles.selectedSeatsInfo}>
            <Text style={styles.selectedSeatsText}>
              Selected: {selectedSeats.join(', ')} ({selectedSeats.length} seat
              {selectedSeats.length > 1 ? 's' : ''})
            </Text>
            <Text style={styles.fareText}>
              Fare: LKR{' '}
              {(
                (routeInfo.fare || 2000) * selectedSeats.length
              ).toLocaleString()}
            </Text>
            <TouchableOpacity
              style={styles.saveDateButton}
              onPress={saveDateBooking}
            >
              <SimpleIcon name="save" size={16} color="white" />
              <Text style={styles.saveDateButtonText}>
                Save for {selectedDate}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderSessionBookings = () => {
    if (sessionBookings.length === 0) return null;

    const fareCalculation = calculateTotalFare();

    return (
      <View style={styles.sessionBookingsContainer}>
        <Text style={styles.sessionBookingsTitle}>Current Booking Session</Text>

        {/* Fare Summary */}
        <View style={styles.fareSummaryCard}>
          <View style={styles.fareSummaryHeader}>
            <SimpleIcon name="cash" size={20} color="#10B981" />
            <Text style={styles.fareSummaryTitle}>Fare Summary</Text>
          </View>
          <View style={styles.fareSummaryContent}>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Total Seats:</Text>
              <Text style={styles.fareValue}>{fareCalculation.totalSeats}</Text>
            </View>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Per Seat:</Text>
              <Text style={styles.fareValue}>
                LKR {fareCalculation.perSeat.toLocaleString()}
              </Text>
            </View>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Total Dates:</Text>
              <Text style={styles.fareValue}>{sessionBookings.length}</Text>
            </View>
            <View style={[styles.fareRow, styles.totalFareRow]}>
              <Text style={styles.totalFareLabel}>Total Amount:</Text>
              <Text style={styles.totalFareValue}>
                LKR {fareCalculation.totalAmount.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {sessionBookings.map((booking, index) => (
          <View key={index} style={styles.sessionBookingCard}>
            <View style={styles.sessionBookingInfo}>
              <Text style={styles.sessionBookingDate}>{booking.date}</Text>
              <Text style={styles.sessionBookingSeats}>
                Seats: {booking.seats.join(', ')} ({booking.seats.length} seat
                {booking.seats.length > 1 ? 's' : ''})
              </Text>
              <Text style={styles.sessionBookingAmount}>
                Amount: LKR {booking.totalAmount.toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.removeBookingButton}
              onPress={() => removeSessionBooking(booking.date)}
            >
              <SimpleIcon name="x-circle" size={20} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4ECDC4" />

      {/* Enhanced Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <SimpleIcon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Book Seats</Text>
          <Text style={styles.headerSubtitle}>
            {routeInfo
              ? `${routeInfo.route.Start} → ${routeInfo.route.End}`
              : 'Loading...'}
          </Text>
        </View>
        <TouchableOpacity style={styles.infoBtn}>
          <SimpleIcon
            name="information-circle-outline"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Date Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <SimpleIcon name="calendar" size={20} color="#4ECDC4" />
            <Text style={styles.sectionTitle}>Select Date</Text>
          </View>
          {renderCalendarGrid()}
        </View>

        {/* Seat Layout */}
        {renderSeatLayout()}

        {/* Session Bookings */}
        {renderSessionBookings()}

        {/* Finalize Booking Button */}
        {sessionBookings.length > 0 && (
          <TouchableOpacity
            style={styles.finalizeButton}
            onPress={finalizeBooking}
          >
            <SimpleIcon name="checkmark-circle" size={20} color="white" />
            <Text style={styles.finalizeButtonText}>
              Proceed to Payment (LKR{' '}
              {calculateTotalFare().totalAmount.toLocaleString()})
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4ECDC4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#4ECDC4',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    minWidth: 40,
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  infoBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    minWidth: 40,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginLeft: 8,
  },
  calendarHeader: {
    marginBottom: 15,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 15,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    width: (width - 90) / 7,
  },
  calendar: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dateCell: {
    width: (width - 90) / 7,
    aspectRatio: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  todayCell: {
    borderColor: '#4ECDC4',
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
  },
  selectedDateCell: {
    backgroundColor: '#4ECDC4',
    transform: [{ scale: 1.05 }],
    ...Platform.select({
      ios: {
        shadowColor: '#4ECDC4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  pastDateCell: {
    backgroundColor: '#e9ecef',
    opacity: 0.5,
  },
  weekendCell: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  hasBookingCell: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: '#10B981',
  },
  dateCellText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  todayText: {
    color: '#4ECDC4',
    fontWeight: '700',
  },
  selectedDateText: {
    color: 'white',
    fontWeight: '700',
  },
  pastDateText: {
    color: '#adb5bd',
  },
  weekendText: {
    color: '#FF6B6B',
  },
  hasBookingText: {
    color: '#10B981',
    fontWeight: '700',
  },
  todayDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4ECDC4',
  },
  bookingIndicator: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCheckmark: {
    color: '#4ECDC4',
    fontSize: 10,
    fontWeight: 'bold',
  },
  seatMapContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  seatMapHeader: {
    marginBottom: 20,
  },
  seatMapTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 15,
  },
  seatLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  legendItem: {
    alignItems: 'center',
    gap: 5,
  },
  legendSeat: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  availableSeat: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  seatMap: {
    maxHeight: 300,
  },
  busHeader: {
    backgroundColor: '#4ECDC4',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  busHeaderText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 12,
    letterSpacing: 1,
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  rowNumber: {
    width: 25,
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  seatGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  aisle: {
    width: 40,
  },
  seat: {
    width: 35,
    height: 35,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  selectedSeat: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  bookedSeat: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  seatText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2c3e50',
  },
  selectedSeatText: {
    color: 'white',
    fontWeight: '700',
  },
  bookedSeatText: {
    color: 'white',
    fontWeight: '600',
  },
  selectedSeatsInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedSeatsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
    textAlign: 'center',
  },
  fareText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 10,
    textAlign: 'center',
  },
  saveDateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ECDC4',
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  saveDateButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  sessionBookingsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  sessionBookingsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  fareSummaryCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  fareSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fareSummaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#166534',
    marginLeft: 8,
  },
  fareSummaryContent: {
    gap: 8,
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fareLabel: {
    fontSize: 14,
    color: '#166534',
    fontWeight: '500',
  },
  fareValue: {
    fontSize: 14,
    color: '#166534',
    fontWeight: '600',
  },
  totalFareRow: {
    borderTopWidth: 1,
    borderTopColor: '#bbf7d0',
    paddingTop: 8,
    marginTop: 8,
  },
  totalFareLabel: {
    fontSize: 16,
    color: '#15803d',
    fontWeight: '700',
  },
  totalFareValue: {
    fontSize: 18,
    color: '#15803d',
    fontWeight: '800',
  },
  sessionBookingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  sessionBookingInfo: {
    flex: 1,
  },
  sessionBookingDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  sessionBookingSeats: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  sessionBookingAmount: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '700',
  },
  removeBookingButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  finalizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 15,
    gap: 10,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  finalizeButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default BoockingDate;
