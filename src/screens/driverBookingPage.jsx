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
// import { useNavigation, useRoute } from '@react-navigation/native';
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

// const DriverBookingDataScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();

//   // Get booking data from navigation params or use default
//   const bookingData = route.params?.bookingData || {
//     name: 'James Carter',
//     date: 'Sun-02-02',
//   };

//   const [selectedBooking, setSelectedBooking] = useState(1); // Index 1 is selected by default
//   const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

//   // Sample booking slots data
//   const bookingSlots = [
//     { id: 0, date: '2025-01-20-Morning', isSelected: false },
//     { id: 1, date: '2025-01-20-Morning', isSelected: true },
//     { id: 2, date: '2025-01-20-Morning', isSelected: false },
//     { id: 3, date: '2025-01-20-Morning', isSelected: false },
//     { id: 4, date: '2025-01-20-Morning', isSelected: false },
//     { id: 5, date: '2025-01-20-Morning', isSelected: false },
//     { id: 6, date: '2025-01-20-Mornin', isSelected: false },
//   ];

//   const handleBackPress = () => {
//     navigation.goBack();
//   };

//   const handleMenuPress = () => {
//     setIsSideMenuVisible(true);
//   };

//   const handleBookingSlotPress = slotId => {
//     setSelectedBooking(slotId);
//   };

//   const handleCloseSideMenu = () => {
//     setIsSideMenuVisible(false);
//   };

//   const handleCompletePress = () => {
//     const selectedSlot = bookingSlots.find(slot => slot.id === selectedBooking);
//     console.log('Completing booking:', selectedSlot);
//     // Add your completion logic here
//     // navigation.navigate('CompletedBooking', { selectedSlot });
//   };

//   const BookingSlot = ({ slot, isSelected, onPress }) => (
//     <TouchableOpacity
//       style={[styles.bookingSlot, isSelected && styles.selectedBookingSlot]}
//       onPress={() => onPress(slot.id)}
//       activeOpacity={0.7}
//     >
//       <Text
//         style={[
//           styles.bookingSlotText,
//           isSelected && styles.selectedBookingSlotText,
//         ]}
//       >
//         {slot.date}
//       </Text>
//     </TouchableOpacity>
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

//         <Text style={styles.headerTitle}>{bookingData.name}</Text>

//         <TouchableOpacity
//           style={styles.headerButton}
//           onPress={handleMenuPress}
//           activeOpacity={0.7}
//         >
//           <MenuIcon size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       {/* Content */}
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Driver Info Card */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Name</Text>
//             <Text style={styles.infoColon}>:</Text>
//             <Text style={styles.infoValue}>{bookingData.name}</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Contacts</Text>
//             <Text style={styles.infoColon}>:</Text>
//             <Text style={styles.infoValue}>070 435 3463</Text>
//           </View>
//         </View>

//         {/* Bookings Section */}
//         <View style={styles.bookingsSection}>
//           <Text style={styles.bookingsTitle}>Bookings</Text>

//           <View style={styles.bookingSlots}>
//             {bookingSlots.map(slot => (
//               <BookingSlot
//                 key={slot.id}
//                 slot={slot}
//                 isSelected={selectedBooking === slot.id}
//                 onPress={handleBookingSlotPress}
//               />
//             ))}
//           </View>
//         </View>
//       </ScrollView>

//       {/* Complete Button */}
//       <View style={styles.bottomSection}>
//         <TouchableOpacity
//           style={styles.completeButton}
//           onPress={handleCompletePress}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.completeButtonText}>Complete</Text>
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
//   },

//   // Info Card Styles
//   infoCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 20,
//     marginTop: 20,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   infoLabel: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//     width: 80,
//   },
//   infoColon: {
//     fontSize: 16,
//     color: '#333',
//     marginHorizontal: 8,
//   },
//   infoValue: {
//     fontSize: 16,
//     color: '#333',
//     flex: 1,
//   },

//   // Bookings Section Styles
//   bookingsSection: {
//     marginTop: 20,
//     marginBottom: 100, // Space for bottom button
//   },
//   bookingsTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#4A9BB8',
//     marginBottom: 16,
//   },
//   bookingSlots: {
//     gap: 8,
//   },
//   bookingSlot: {
//     backgroundColor: '#E8E8E8',
//     borderRadius: 8,
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//   },
//   selectedBookingSlot: {
//     backgroundColor: '#6B4E99',
//   },
//   bookingSlotText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//     textAlign: 'left',
//   },
//   selectedBookingSlotText: {
//     color: 'white',
//   },

//   // Bottom Section Styles
//   bottomSection: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#f5f5f5',
//     paddingHorizontal: 16,
//     paddingVertical: 20,
//     paddingBottom: 30,
//   },
//   completeButton: {
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
//   completeButtonText: {
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

// export default DriverBookingDataScreen;

import React, { useState, useEffect } from 'react';
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
  RefreshControl,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import SideMenu from './components/SideMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Enhanced data loading functions
async function getCurrentUser() {
  try {
    const userData = await AsyncStorage.getItem('currentUser');
    if (userData !== null) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.log('Error reading current user:', error);
    return null;
  }
}

async function getAllUsers() {
  try {
    const usersData = await AsyncStorage.getItem('usersArray');
    if (usersData !== null) {
      return JSON.parse(usersData);
    }
    return [];
  } catch (error) {
    console.log('Error reading users data:', error);
    return [];
  }
}

async function getBookingsByDriver(driverEmail) {
  try {
    const users = await getAllUsers();
    const bookings = [];

    // Find all buses where this driver is assigned
    users.forEach(user => {
      if (user.role === 'Owner' && user.bus && user.bus.length > 0) {
        user.bus.forEach(bus => {
          if (bus.driver && bus.driver.name === driverEmail) {
            // Add bus info to each booking
            if (bus.bookings && bus.bookings.length > 0) {
              bus.bookings.forEach(booking => {
                bookings.push({
                  ...booking,
                  busInfo: {
                    id: bus.id,
                    name: bus.name,
                    owner: user.name,
                    ownerPhone: user.phone,
                  },
                });
              });
            }
          }
        });
      }
    });

    return bookings;
  } catch (error) {
    console.log('Error getting bookings:', error);
    return [];
  }
}

async function getBookingsByOwner(ownerId) {
  try {
    const users = await getAllUsers();
    const owner = users.find(
      user => user.id === ownerId && user.role === 'Owner',
    );

    if (!owner || !owner.bus) {
      return [];
    }

    const bookings = [];
    owner.bus.forEach(bus => {
      if (bus.bookings && bus.bookings.length > 0) {
        bus.bookings.forEach(booking => {
          bookings.push({
            ...booking,
            busInfo: {
              id: bus.id,
              name: bus.name,
              driver: bus.driver,
              schedules: bus.schedules,
            },
          });
        });
      }
    });

    return bookings;
  } catch (error) {
    console.log('Error getting owner bookings:', error);
    return [];
  }
}

// Enhanced connection function
async function connection(url, method, data = null) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: '', // Add your auth token here
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Connection error:', error);
    Alert.alert('Error', 'Failed to connect to server');
    throw error;
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

const RefreshIcon = ({ size = 20, color = '#4A9BB8' }) => (
  <View style={[styles.icon, { width: size, height: size }]}>
    <View style={[styles.refreshArrow, { borderColor: color }]} />
  </View>
);

const DriverBookingDataScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // State management
  const [currentUser, setCurrentUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userStats, setUserStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
  });

  // Load data on component mount and focus
  useFocusEffect(
    React.useCallback(() => {
      loadUserData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const loadUserData = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();

      if (!user) {
        Alert.alert('Error', 'No user logged in');
        navigation.goBack();
        return;
      }

      setCurrentUser(user);
      await loadBookingsData(user);
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const loadBookingsData = async user => {
    try {
      let userBookings = [];

      if (user.role === 'Driver') {
        userBookings = await getBookingsByDriver(user.email);
      } else if (user.role === 'Owner') {
        userBookings = await getBookingsByOwner(user.id);
      }

      setBookings(userBookings);

      // Calculate stats
      const stats = {
        totalBookings: userBookings.length,
        pendingBookings: userBookings.filter(
          b => b.status === 'pending' || !b.status,
        ).length,
        completedBookings: userBookings.filter(b => b.status === 'completed')
          .length,
      };
      setUserStats(stats);

      // Set first booking as selected if available
      if (userBookings.length > 0 && !selectedBooking) {
        setSelectedBooking(userBookings[0]);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      Alert.alert('Error', 'Failed to load bookings');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadUserData();
    setRefreshing(false);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuPress = () => {
    setIsSideMenuVisible(true);
  };

  const handleBookingPress = booking => {
    setSelectedBooking(booking);
  };

  const handleCloseSideMenu = () => {
    setIsSideMenuVisible(false);
  };

  const handleCompletePress = async () => {
    if (!selectedBooking) {
      Alert.alert('Error', 'Please select a booking first');
      return;
    }

    Alert.alert(
      'Complete Booking',
      `Are you sure you want to mark this booking as completed?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete',
          onPress: async () => {
            try {
              // Update booking status in local storage
              await updateBookingStatus(selectedBooking.id, 'completed');
              await loadUserData();
              Alert.alert('Success', 'Booking completed successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to complete booking');
            }
          },
        },
      ],
    );
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const users = await getAllUsers();
      let updated = false;

      const updatedUsers = users.map(user => {
        if (user.role === 'Owner' && user.bus) {
          const updatedBuses = user.bus.map(bus => {
            if (bus.bookings) {
              const updatedBookings = bus.bookings.map(booking => {
                if (booking.id === bookingId) {
                  updated = true;
                  return {
                    ...booking,
                    status,
                    completedAt: new Date().toISOString(),
                  };
                }
                return booking;
              });
              return { ...bus, bookings: updatedBookings };
            }
            return bus;
          });
          return { ...user, bus: updatedBuses };
        }
        return user;
      });

      if (updated) {
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  };

  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = timeString => {
    if (!timeString) return 'N/A';
    return timeString;
  };

  const BookingCard = ({ booking, isSelected, onPress }) => (
    <TouchableOpacity
      style={[styles.bookingCard, isSelected && styles.selectedBookingCard]}
      onPress={() => onPress(booking)}
      activeOpacity={0.7}
    >
      <View style={styles.bookingHeader}>
        <Text style={[styles.bookingId, isSelected && styles.selectedText]}>
          {booking.id || `Booking #${booking.busInfo?.id}`}
        </Text>
        <View
          style={[
            styles.statusBadge,
            booking.status === 'completed'
              ? styles.completedBadge
              : styles.pendingBadge,
          ]}
        >
          <Text style={styles.statusText}>
            {booking.status === 'completed' ? 'Completed' : 'Pending'}
          </Text>
        </View>
      </View>

      <Text style={[styles.bookingBus, isSelected && styles.selectedText]}>
        {booking.busInfo?.name || 'Bus Info'}
      </Text>

      <View style={styles.bookingDetails}>
        <Text style={[styles.bookingRoute, isSelected && styles.selectedText]}>
          Route: {booking.route.startLocation || 'Not specified'}
        </Text>
        <Text style={[styles.bookingDate, isSelected && styles.selectedText]}>
          Date: {formatDate(booking.date || booking.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#4A9BB8" barStyle="light-content" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A9BB8" />
          <Text style={styles.loadingText}>Loading bookings...</Text>
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

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{currentUser?.name || 'User'}</Text>
          <Text style={styles.headerSubtitle}>{currentUser?.role || ''}</Text>
        </View>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleMenuPress}
          activeOpacity={0.7}
        >
          <MenuIcon size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userStats.totalBookings}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userStats.pendingBookings}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userStats.completedBookings}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* User Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoColon}>:</Text>
            <Text style={styles.infoValue}>{currentUser?.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoColon}>:</Text>
            <Text style={styles.infoValue}>{currentUser?.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoColon}>:</Text>
            <Text style={styles.infoValue}>{currentUser?.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoColon}>:</Text>
            <Text style={styles.infoValue}>{currentUser?.address}</Text>
          </View>
        </View>

        {/* Bookings Section */}
        <View style={styles.bookingsSection}>
          <View style={styles.bookingsSectionHeader}>
            <Text style={styles.bookingsTitle}>
              {currentUser?.role === 'Driver'
                ? 'Assigned Bookings'
                : 'Bus Bookings'}
            </Text>
            <TouchableOpacity
              onPress={handleRefresh}
              style={styles.refreshButton}
            >
              <RefreshIcon size={20} />
            </TouchableOpacity>
          </View>

          {bookings.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No bookings found</Text>
              <Text style={styles.emptyStateSubtext}>
                {currentUser?.role === 'Driver'
                  ? 'You have no assigned bookings yet'
                  : 'No bookings for your buses yet'}
              </Text>
            </View>
          ) : (
            <View style={styles.bookingsList}>
              {bookings.map((booking, index) => (
                <BookingCard
                  key={booking.id || index}
                  booking={booking}
                  isSelected={selectedBooking?.id === booking.id}
                  onPress={handleBookingPress}
                />
              ))}
            </View>
          )}
        </View>

        {/* Selected Booking Details */}
        {selectedBooking && (
          <View style={styles.selectedBookingDetails}>
            <Text style={styles.selectedBookingTitle}>Booking Details</Text>
            <View style={styles.detailsCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Bus</Text>
                <Text style={styles.infoColon}>:</Text>
                <Text style={styles.infoValue}>
                  {selectedBooking.busInfo?.name}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Route</Text>
                <Text style={styles.infoColon}>:</Text>
                <Text style={styles.infoValue}>
                  {selectedBooking.route.startLocation || 'Not specified'}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoColon}>:</Text>
                <Text style={styles.infoValue}>
                  {formatDate(selectedBooking.date)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Status</Text>
                <Text style={styles.infoColon}>:</Text>
                <Text
                  style={[
                    styles.infoValue,
                    selectedBooking.status === 'completed'
                      ? styles.completedStatus
                      : styles.pendingStatus,
                  ]}
                >
                  {selectedBooking.status === 'completed'
                    ? 'Completed'
                    : 'Pending'}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Complete Button */}
      {selectedBooking && selectedBooking.status !== 'completed' && (
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleCompletePress}
            activeOpacity={0.8}
          >
            <Text style={styles.completeButtonText}>Mark as Complete</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Side Menu */}
      <SideMenu isVisible={isSideMenuVisible} onClose={handleCloseSideMenu} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerCenter: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '400',
  },

  // Stats Container
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A9BB8',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },

  // Content Styles
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Info Card Styles
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    width: 80,
  },
  infoColon: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 8,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },

  // Bookings Section Styles
  bookingsSection: {
    marginBottom: 20,
  },
  bookingsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bookingsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A9BB8',
  },
  refreshButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(74, 155, 184, 0.1)',
  },

  // Booking Card Styles
  bookingsList: {
    gap: 12,
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#E8E8E8',
  },
  selectedBookingCard: {
    backgroundColor: '#6B4E99',
    borderLeftColor: '#FFD700',
    elevation: 4,
    shadowOpacity: 0.2,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookingId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bookingBus: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A9BB8',
    marginBottom: 8,
  },
  bookingDetails: {
    gap: 4,
  },
  bookingRoute: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedText: {
    color: 'white',
  },

  // Status Badge Styles
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pendingBadge: {
    backgroundColor: '#FFF3CD',
  },
  completedBadge: {
    backgroundColor: '#D1E7DD',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Selected Booking Details
  selectedBookingDetails: {
    marginBottom: 100,
  },
  selectedBookingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A9BB8',
    marginBottom: 12,
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  completedStatus: {
    color: '#198754',
    fontWeight: '600',
  },
  pendingStatus: {
    color: '#fd7e14',
    fontWeight: '600',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  // Bottom Section Styles
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  completeButton: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
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
  refreshArrow: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderRadius: 8,
    borderTopColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
});

export default DriverBookingDataScreen;
