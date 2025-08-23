// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   StatusBar,
//   SafeAreaView,
//   Linking,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFS from 'react-native-fs';

// const { width, height } = Dimensions.get('window');

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

// const BookingDetailsScreen = ({ navigation, route }) => {
//   const { bookingId } = route.params;
//   const busId = route?.params?.busId || 'ACD-01-DB';

//   // Sample booking data - you can replace this with actual data fetching
//   const [bookingData, setbookingData] = useState({
//     busNumber: 'ACD-01-DB',
//     name: 'ACD-01-DB',
//     contacts: '070 435 4463',
//     dailyDetails: [
//       { id: 1, date: '2025-01-20-Morning', isSelected: false },
//       { id: 2, date: '2025-01-20-Morning', isSelected: true },
//       { id: 3, date: '2025-01-20-Morning', isSelected: false },
//     ],
//     bookings: [
//       { id: 1, date: '2025-01-20-Morning', isSelected: false },
//       { id: 2, date: '2025-01-20-Morning', isSelected: true },
//       { id: 3, date: '2025-01-20-Morning', isSelected: false },
//       { id: 4, date: '2025-01-20-Morning', isSelected: false },
//       { id: 5, date: '2025-01-20-Morning', isSelected: false },
//       { id: 6, date: '2025-01-20-Morning', isSelected: false },
//       { id: 7, date: '2025-01-20-Morning', isSelected: false },
//     ],
//   });

//   const handleBackPress = () => {
//     navigation.goBack();
//   };

//   const handleCallPress = () => {
//     Linking.openURL(`tel:${bookingData.contacts}`);
//   };

//   const handleDailyDetailPress = itemId => {
//     console.log(`Daily detail ${itemId} pressed`);
//     // Add navigation or action logic here
//   };

//   const handleBookingPress = itemId => {
//     console.log(`Booking ${itemId} pressed`);
//     // Add navigation or action logic here
//   };

//   const DetailItem = ({ item, onPress, section }) => (
//     <TouchableOpacity
//       style={[
//         styles.detailItem,
//         { backgroundColor: item.isSelected ? '#4F46E5' : '#E5E7EB' },
//       ]}
//       onPress={() => onPress(item.id)}
//       activeOpacity={0.7}
//     >
//       <Text
//         style={[
//           styles.detailText,
//           { color: item.isSelected ? 'white' : '#374151' },
//         ]}
//       >
//         {item.date}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#14B8A6" />

//       {/* Header */}
//       <View style={styles.header}>
//         {/* Navigation Header */}
//         <View style={styles.navigationHeader}>
//           <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
//             <Text style={styles.backArrow}>←</Text>
//           </TouchableOpacity>

//           <Text style={styles.headerTitle}>{bookingData.busNumber}</Text>

//           <View style={styles.placeholder} />
//         </View>
//       </View>

//       {/* Content */}
//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         bounces={true}
//       >
//         {/* Bus Information Card */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Name</Text>
//             <Text style={styles.infoSeparator}>:</Text>
//             <Text style={styles.infoValue}>{bookingData.name}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Contacts</Text>
//             <Text style={styles.infoSeparator}>:</Text>
//             <TouchableOpacity onPress={handleCallPress}>
//               <Text style={[styles.infoValue, styles.phoneNumber]}>
//                 {bookingData.contacts}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.phoneIcon}
//               onPress={handleCallPress}
//             >
//               <Text style={styles.phoneEmoji}>📞</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Daily Details Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Daily Details</Text>
//           <View style={styles.detailsList}>
//             {bookingData.dailyDetails.map(item => (
//               <DetailItem
//                 key={item.id}
//                 item={item}
//                 onPress={handleDailyDetailPress}
//                 section="daily"
//               />
//             ))}
//           </View>
//         </View>

//         {/* Bookings Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Bookings</Text>
//           <View style={styles.detailsList}>
//             {bookingData.bookings.map(item => (
//               <DetailItem
//                 key={item.id}
//                 item={item}
//                 onPress={handleBookingPress}
//                 section="bookings"
//               />
//             ))}
//           </View>
//         </View>

//         {/* Bottom padding */}
//         <View style={{ height: 30 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   header: {
//     backgroundColor: '#14B8A6',
//     borderBottomLeftRadius: 25,
//     borderBottomRightRadius: 25,
//     paddingBottom: 20,
//   },
//   navigationHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   backButton: {
//     width: 35,
//     height: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backArrow: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: '600',
//     flex: 1,
//     marginLeft: 15,
//   },
//   placeholder: {
//     width: 35,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   infoCard: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 25,
//     elevation: 2,
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
//     color: '#1F2937',
//     width: 80,
//   },
//   infoSeparator: {
//     fontSize: 16,
//     color: '#1F2937',
//     marginHorizontal: 10,
//   },
//   infoValue: {
//     fontSize: 16,
//     color: '#1F2937',
//     flex: 1,
//   },
//   phoneNumber: {
//     color: '#14B8A6',
//     fontWeight: '500',
//   },
//   phoneIcon: {
//     marginLeft: 10,
//     padding: 5,
//   },
//   phoneEmoji: {
//     fontSize: 18,
//   },
//   section: {
//     marginBottom: 25,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1F2937',
//     marginBottom: 15,
//   },
//   detailsList: {
//     gap: 8,
//   },
//   detailItem: {
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//   },
//   detailText: {
//     fontSize: 15,
//     fontWeight: '500',
//   },
// });

// export default BookingDetailsScreen;//////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const BookingDetailsScreen = ({ navigation, route }) => {
  const busNumber = route?.params?.busNumber || 'ACD-01-DB';

  // Create busInfo object from the parameters
  const busInfo = {
    busNumber: busNumber,
  };
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBusBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBusBookings = async () => {
    try {
      setLoading(true);

      // Get all users data
      const usersData = await AsyncStorage.getItem('usersArray');
      const users = usersData ? JSON.parse(usersData) : [];
      console.log(users);
      let foundBus = null;
      let busOwner = null;

      // Search for the bus by name across all users
      console.log('presed dddd ', busInfo.busNumber);
      for (const user of users) {
        if (user.bus && Array.isArray(user.bus)) {
          console.log();
          const bus =
            user.bus &&
            Array.isArray(user.bus) &&
            user.bus.length > 0 &&
            user.bus.find(b => b.name === busInfo.busNumber);
          if (bus) {
            foundBus = bus;
            busOwner = user;
            break;
          }
        }
      } /////////////////////////////////////////////////////////////////////////////
      const allBookings = users.flatMap(user =>
        user.bus && user.bus[0] ? user.bus[0].bookings || [] : [],
      );
      console.log(foundBus);

      if (!foundBus) {
        Alert.alert('Error', 'Bus not found');
        navigation.goBack();
        return;
      }

      // Format booking data for display
      const formattedBookings = foundBus.bookings || [];

      // Create daily details from bookings (unique dates)
      const uniqueDates = [
        ...new Set(
          formattedBookings.flatMap(booking =>
            booking.dates ? booking.dates.map(d => d.date) : [],
          ),
        ),
      ];

      const dailyDetails = uniqueDates.map((date, index) => ({
        id: index + 1,
        date: date,
        isSelected: index === 0, // Select first item by default
      }));

      // Format individual bookings
      const bookingItems = formattedBookings.map((booking, index) => ({
        id: booking.id || index + 1,
        date: `${booking.route?.Start || 'Unknown'} → ${
          booking.route?.End || 'Unknown'
        }`,
        time: `${booking.startTime || 'N/A'} - ${booking.endTime || 'N/A'}`,
        seats: booking.dates ? booking.dates.flatMap(d => d.seats) : [],
        totalSeats: booking.dates
          ? booking.dates.reduce((sum, d) => sum + (d.seats?.length || 0), 0)
          : 0,
        user: booking.user || 'Unknown',
        bookingDate: booking.bookingDate || 'N/A',
        isSelected: index === 0,
      }));

      setBookingData({
        busNumber: foundBus.id || foundBus.name,
        name: foundBus.name,
        contacts: busOwner?.phone || 'No contact available',
        ownerName: busOwner?.name || 'Unknown Owner',
        dailyDetails: dailyDetails,
        bookings: bookingItems,
        totalBookings: formattedBookings.length,
        seatCapacity: foundBus.seatDetails?.totalSeats || 75, // Default 75 seats
      });
    } catch (error) {
      console.log('Error loading bus bookings:', error); /////////////////////////////////////////////////////////////
      Alert.alert('Error', 'Failed to load bus data');
    } finally {
      setLoading(false);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCallPress = () => {
    if (
      bookingData?.contacts &&
      bookingData.contacts !== 'No contact available'
    ) {
      Linking.openURL(`tel:${bookingData.contacts}`);
    } else {
      Alert.alert('No Contact', 'No phone number available for this bus owner');
    }
  };

  const handleDailyDetailPress = itemId => {
    console.log(`Daily detail ${itemId} pressed`);
    // Update selection state
    setBookingData(prev => ({
      ...prev,
      dailyDetails: prev.dailyDetails.map(item => ({
        ...item,
        isSelected: item.id === itemId,
      })),
    }));
  };

  const handleBookingPress = itemId => {
    console.log(`Booking ${itemId} pressed`);
    // Update selection state
    setBookingData(prev => ({
      ...prev,
      bookings: prev.bookings.map(item => ({
        ...item,
        isSelected: item.id === itemId,
      })),
    }));

    // Show booking details
    const selectedBooking = bookingData.bookings.find(b => b.id === itemId);
    if (selectedBooking) {
      Alert.alert(
        'Booking Details',
        `Route: ${selectedBooking.date}\n` +
          `Time: ${selectedBooking.time}\n` +
          `Seats: ${selectedBooking.seats.join(', ')}\n` +
          `Total Seats: ${selectedBooking.totalSeats}\n` +
          `Customer: ${selectedBooking.user}\n` +
          `Booked: ${new Date(
            selectedBooking.bookingDate,
          ).toLocaleDateString()}`,
      );
    }
  };

  const DetailItem = (
    { item, onPress, section }, /////////////////////////////////////////////////////////////////////////////////
  ) => (
    <TouchableOpacity
      style={[
        styles.detailItem,
        { backgroundColor: item.isSelected ? '#4F46E5' : '#E5E7EB' },
      ]}
      onPress={() => onPress(item.id)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.detailText,
          { color: item.isSelected ? 'white' : '#374151' },
        ]}
      >
        {item.date}
      </Text>
      {section === 'bookings' && (
        <View style={styles.bookingDetails}>
          <Text
            style={[
              styles.bookingTime,
              { color: item.isSelected ? 'rgba(255,255,255,0.8)' : '#6B7280' },
            ]}
          >
            {item.time}
          </Text>
          <Text
            style={[
              styles.bookingSeats,
              { color: item.isSelected ? 'rgba(255,255,255,0.8)' : '#6B7280' },
            ]}
          >
            {item.seatCapacity} seats
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#14B8A6" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading bus data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!bookingData) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#14B8A6" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Bus data not found</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadBusBookings}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#14B8A6" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.navigationHeader}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{bookingData.busNumber}</Text>

          <View style={styles.placeholder} />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Bus Information Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Bus Name</Text>
            <Text style={styles.infoSeparator}>:</Text>
            <Text style={styles.infoValue}>{bookingData.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Owner</Text>
            <Text style={styles.infoSeparator}>:</Text>
            <Text style={styles.infoValue}>{bookingData.ownerName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Contacts</Text>
            <Text style={styles.infoSeparator}>:</Text>
            <TouchableOpacity onPress={handleCallPress}>
              <Text style={[styles.infoValue, styles.phoneNumber]}>
                {bookingData.contacts}
              </Text>
            </TouchableOpacity>
            {bookingData.contacts !== 'No contact available' && (
              <TouchableOpacity
                style={styles.phoneIcon}
                onPress={handleCallPress}
              >
                <Text style={styles.phoneEmoji}>📞</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Bookings</Text>
            <Text style={styles.infoSeparator}>:</Text>
            <Text style={styles.infoValue}>{bookingData.totalBookings}</Text>
          </View>
        </View>

        {/* Daily Details Section */}
        {bookingData.dailyDetails.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Booked Dates ({bookingData.dailyDetails.length})
            </Text>
            <View style={styles.detailsList}>
              {bookingData.dailyDetails.map(item => (
                <DetailItem
                  key={item.id}
                  item={item}
                  onPress={handleDailyDetailPress}
                  section="daily"
                />
              ))}
            </View>
          </View>
        )}

        {/* Bookings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            All Bookings ({bookingData.bookings.length})
          </Text>
          {bookingData.bookings.length > 0 ? (
            <View style={styles.detailsList}>
              {bookingData.bookings.map(item => (
                <DetailItem
                  key={item.id}
                  item={item}
                  onPress={handleBookingPress}
                  section="bookings"
                />
              ))}
            </View>
          ) : (
            <View style={styles.noBookingsContainer}>
              <Text style={styles.noBookingsText}>
                No bookings found for this bus
              </Text>
            </View>
          )}
        </View>

        {/* Bottom padding */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#14B8A6',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 20,
  },
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: StatusBar.currentHeight || 0,
  },
  backButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    marginLeft: 15,
  },
  placeholder: {
    width: 35,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#14B8A6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    width: 100,
  },
  infoSeparator: {
    fontSize: 16,
    color: '#1F2937',
    marginHorizontal: 10,
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  phoneNumber: {
    color: '#14B8A6',
    fontWeight: '500',
  },
  phoneIcon: {
    marginLeft: 10,
    padding: 5,
  },
  phoneEmoji: {
    fontSize: 18,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 15,
  },
  detailsList: {
    gap: 8,
  },
  detailItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  detailText: {
    fontSize: 15,
    fontWeight: '500',
  },
  bookingDetails: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingTime: {
    fontSize: 12,
    fontWeight: '400',
  },
  bookingSeats: {
    fontSize: 12,
    fontWeight: '500',
  },
  noBookingsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  noBookingsText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default BookingDetailsScreen;
