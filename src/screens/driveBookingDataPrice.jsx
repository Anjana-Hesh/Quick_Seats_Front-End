// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   StatusBar,
//   SafeAreaView,
//   Animated,
//   Dimensions,
//   TouchableWithoutFeedback,
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

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// const DRAWER_WIDTH = 280;

// const WithdrawScreen = ({ navigation }) => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

//   const historyData = [
//     { id: 1, date: '2025-01-20-Morning', isSelected: false },
//     { id: 2, date: '2025-01-20-Morning', isSelected: true },
//     { id: 3, date: '2025-01-20-Morning', isSelected: false },
//     { id: 4, date: '2025-01-20-Morning', isSelected: false },
//     { id: 5, date: '2025-01-20-Morning', isSelected: false },
//     { id: 6, date: '2025-01-20-Morning', isSelected: false },
//     { id: 7, date: '2025-01-20-Morning', isSelected: false },
//   ];

//   const paymentHistory = [
//     { id: 1, amount: 'Rs. 2000', date: '2025.05.05', isSelected: false },
//     { id: 2, amount: 'Rs. 2000', date: '2025.05.05', isSelected: true },
//     { id: 3, amount: 'Rs. 2000', date: '2025.05.05', isSelected: false },
//     { id: 4, amount: 'Rs. 2000', date: '2025.05.05', isSelected: false },
//     { id: 5, amount: 'Rs. 2000', date: '2025.05.05', isSelected: false },
//     { id: 6, amount: 'Rs. 2000', date: '2025.05.05', isSelected: false },
//   ];

//   const menuItems = [
//     { id: '1', title: 'Profile', icon: '👤' },
//     { id: '2', title: 'Settings', icon: '⚙️' },
//     { id: '3', title: 'Log out', icon: '🚪' },
//   ];

//   const handleBackPress = () => {
//     if (navigation && navigation.goBack) {
//       navigation.goBack();
//     }
//   };

//   const toggleDrawer = () => {
//     if (isDrawerOpen) {
//       // Close drawer
//       Animated.timing(slideAnim, {
//         toValue: -DRAWER_WIDTH,
//         duration: 300,
//         useNativeDriver: false,
//       }).start(() => {
//         setIsDrawerOpen(false);
//       });
//     } else {
//       // Open drawer
//       setIsDrawerOpen(true);
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: false,
//       }).start();
//     }
//   };

//   const closeDrawer = () => {
//     if (isDrawerOpen) {
//       Animated.timing(slideAnim, {
//         toValue: -DRAWER_WIDTH,
//         duration: 300,
//         useNativeDriver: false,
//       }).start(() => {
//         setIsDrawerOpen(false);
//       });
//     }
//   };

//   const handleMenuItemPress = item => {
//     closeDrawer();
//     // Handle menu item actions
//     switch (item.title) {
//       case 'Profile':
//         // Navigate to profile
//         console.log('Navigate to Profile');
//         break;
//       case 'Settings':
//         // Navigate to settings
//         console.log('Navigate to Settings');
//         navigation.navigate('OwnerSettings');
//         break;
//       case 'Log out':
//         // Handle logout
//         console.log('Log out');
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

//       {/* Overlay */}
//       {isDrawerOpen && (
//         <TouchableWithoutFeedback onPress={closeDrawer}>
//           <View style={styles.overlay} />
//         </TouchableWithoutFeedback>
//       )}

//       {/* Drawer */}
//       <Animated.View style={[styles.drawer, { right: slideAnim }]}>
//         <View style={styles.drawerContent}>
//           {menuItems.map(item => (
//             <TouchableOpacity
//               key={item.id}
//               style={styles.drawerItem}
//               onPress={() => handleMenuItemPress(item)}
//             >
//               <Text style={styles.drawerItemIcon}>{item.icon}</Text>
//               <Text style={styles.drawerItemText}>{item.title}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </Animated.View>

//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
//             <Text style={styles.backIcon}>←</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Withdraw</Text>
//           <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
//             <Text style={styles.menuIcon}>☰</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Amount Display */}
//         <View style={styles.amountContainer}>
//           <Text style={styles.amountText}>Rs. 10000.00</Text>
//         </View>

//         {/* History Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>History</Text>
//           <View style={styles.historyList}>
//             {historyData.map(item => (
//               <TouchableOpacity
//                 key={item.id}
//                 style={[
//                   styles.historyItem,
//                   item.isSelected && styles.selectedHistoryItem,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.historyItemText,
//                     item.isSelected && styles.selectedHistoryItemText,
//                   ]}
//                 >
//                   {item.date}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Withdraw Button */}
//         <TouchableOpacity style={styles.withdrawButton}>
//           <Text style={styles.withdrawButtonText}>Withdraw</Text>
//         </TouchableOpacity>

//         {/* Payment History Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Payment History</Text>
//           <View style={styles.historyList}>
//             {paymentHistory.map(item => (
//               <TouchableOpacity
//                 key={item.id}
//                 style={[
//                   styles.historyItem,
//                   item.isSelected && styles.selectedPaymentItem,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.paymentItemText,
//                     item.isSelected && styles.selectedPaymentItemText,
//                   ]}
//                 >
//                   {item.amount} - {item.date}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     zIndex: 998,
//   },
//   drawer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     width: DRAWER_WIDTH,
//     backgroundColor: '#4A90E2',
//     zIndex: 999,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: -2,
//       height: 0,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 5,
//   },
//   drawerContent: {
//     flex: 1,
//     paddingTop: 80,
//     paddingHorizontal: 20,
//   },
//   drawerItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     marginBottom: 2,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   drawerItemIcon: {
//     fontSize: 20,
//     marginRight: 15,
//   },
//   drawerItemText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//   },
//   header: {
//     backgroundColor: '#4A90E2',
//     paddingTop: 10,
//     paddingBottom: 20,
//     paddingHorizontal: 16,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
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
//   menuButton: {
//     padding: 8,
//   },
//   menuIcon: {
//     fontSize: 24,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   amountContainer: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 20,
//     marginTop: 20,
//     marginBottom: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   amountText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#4A90E2',
//     marginBottom: 12,
//   },
//   historyList: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   historyItem: {
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//     backgroundColor: '#f8f8f8',
//   },
//   selectedHistoryItem: {
//     backgroundColor: '#6B73FF',
//   },
//   selectedPaymentItem: {
//     backgroundColor: '#8B7CF6',
//   },
//   historyItemText: {
//     fontSize: 14,
//     color: '#333',
//     fontWeight: '500',
//   },
//   selectedHistoryItemText: {
//     color: 'white',
//   },
//   paymentItemText: {
//     fontSize: 14,
//     color: '#333',
//     fontWeight: '500',
//   },
//   selectedPaymentItemText: {
//     color: 'white',
//   },
//   withdrawButton: {
//     backgroundColor: '#2C3E50',
//     borderRadius: 8,
//     paddingVertical: 16,
//     marginBottom: 30,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 4,
//   },
//   withdrawButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default WithdrawScreen;

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = 280;

const WithdrawScreen = ({ navigation }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loggedUser, setLoggedUser] = useState(null);
  const [earningsBreakdown, setEarningsBreakdown] = useState([]);
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const historyData = [
    { id: 1, date: '2025-01-20', isSelected: false },
    { id: 2, date: '2025-01-20', isSelected: true },
    { id: 3, date: '2025-01-20', isSelected: false },
    { id: 4, date: '2025-01-20', isSelected: false },
    { id: 5, date: '2025-01-20', isSelected: false },
    { id: 6, date: '2025-01-20', isSelected: false },
    { id: 7, date: '2025-01-20', isSelected: false },
  ];

  const menuItems = [
    { id: '1', title: 'Profile', icon: '👤' },
    { id: '2', title: 'Settings', icon: '⚙️' },
    { id: '3', title: 'Log out', icon: '🚪' },
  ];

  // Function to calculate total earnings for the logged-in owner
  const calculateTotalEarnings = async () => {
    try {
      // Get logged user data from AsyncStorage
      const userData = await AsyncStorage.getItem('currentUser');
      if (!userData) {
        console.log('No logged user found');
        return;
      }

      const user = JSON.parse(userData);
      console.log('Nd', user);
      setLoggedUser(user);

      // Check if user is an owner
      if (user.role !== 'Owner') {
        console.log('User is not an owner');
        return;
      }

      let totalAmount = 0;
      const breakdown = [];

      // Calculate earnings from each bus owned by this user
      if (user.bus && user.bus.length > 0) {
        user.bus.forEach(bus => {
          let busEarnings = 0;
          let busBookingsCount = 0;

          if (bus.schedules && bus.schedules.length > 0) {
            bus.schedules.forEach(schedule => {
              if (schedule.bookings && schedule.bookings.length > 0) {
                const scheduleEarnings =
                  schedule.bookings.length * schedule.fare;
                busEarnings += scheduleEarnings;
                busBookingsCount += schedule.bookings.length;
                totalAmount += scheduleEarnings;
              }
            });
          }

          if (busEarnings > 0) {
            breakdown.push({
              busId: bus.id,
              busName: bus.name,
              earnings: busEarnings,
              bookingsCount: busBookingsCount,
            });
          }
        });
      }

      setTotalEarnings(totalAmount);
      setEarningsBreakdown(breakdown);

      console.log(`Total earnings calculated: Rs. ${totalAmount}`);
      console.log('Earnings breakdown:', breakdown);
    } catch (error) {
      console.error('Error calculating earnings:', error);
    }
  };

  // Alternative method if data is stored differently
  const calculateEarningsFromAllUsers = async () => {
    try {
      // If all users data is stored in localStorage under 'users' key
      const allUsersData = await AsyncStorage.getItem('usersArray');
      const loggedUserData = await AsyncStorage.getItem('currentUser');

      if (!allUsersData || !loggedUserData) {
        console.log('Required data not found');
        return;
      }

      const allUsers = JSON.parse(allUsersData);
      const loggedUser = JSON.parse(loggedUserData);

      // Find the current user in the users array
      const currentUser = allUsers.find(user => user.id === loggedUser.id);

      if (!currentUser || currentUser.role !== 'Owner') {
        console.log('User not found or not an owner');
        return;
      }

      let totalAmount = 0;
      const breakdown = [];

      if (currentUser.bus && currentUser.bus.length > 0) {
        currentUser.bus.forEach(bus => {
          let busEarnings = 0;
          let busBookingsCount = 0;

          if (bus.schedules && bus.schedules.length > 0) {
            bus.schedules.forEach(schedule => {
              if (schedule.bookings && schedule.bookings.length > 0) {
                const scheduleEarnings =
                  schedule.bookings.length * schedule.fare;
                busEarnings += scheduleEarnings;
                busBookingsCount += schedule.bookings.length;
                totalAmount += scheduleEarnings;
              }
            });
          }

          if (busEarnings > 0) {
            breakdown.push({
              busId: bus.id,
              busName: bus.name,
              earnings: busEarnings,
              bookingsCount: busBookingsCount,
            });
          }
        });
      }

      setTotalEarnings(totalAmount);
      setEarningsBreakdown(breakdown);
      setLoggedUser(currentUser);
    } catch (error) {
      console.error('Error calculating earnings from all users:', error);
    }
  };

  useEffect(() => {
    // Try both methods to calculate earnings
    calculateTotalEarnings();
    // If the above doesn't work, try this alternative
    // calculateEarningsFromAllUsers();
  }, []);

  const handleBackPress = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setIsDrawerOpen(false);
      });
    } else {
      setIsDrawerOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeDrawer = () => {
    if (isDrawerOpen) {
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setIsDrawerOpen(false);
      });
    }
  };

  const handleMenuItemPress = item => {
    closeDrawer();
    switch (item.title) {
      case 'Profile':
        console.log('Navigate to Profile');
        break;
      case 'Settings':
        console.log('Navigate to Settings');
        if (navigation && navigation.navigate) {
          navigation.navigate('OwnerSettings');
        }
        break;
      case 'Log out':
        console.log('Log out');
        break;
      default:
        break;
    }
  };

  const formatCurrency = amount => {
    return `Rs. ${amount.toLocaleString()}.00`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      {/* Overlay */}
      {isDrawerOpen && (
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Drawer */}
      <Animated.View style={[styles.drawer, { right: slideAnim }]}>
        <View style={styles.drawerContent}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.drawerItem}
              onPress={() => handleMenuItemPress(item)}
            >
              <Text style={styles.drawerItemIcon}>{item.icon}</Text>
              <Text style={styles.drawerItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Withdraw</Text>
          <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Amount Display */}
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Total Earnings</Text>
          <Text style={styles.amountText}>{formatCurrency(totalEarnings)}</Text>
          {loggedUser && (
            <Text style={styles.ownerName}>Owner: {loggedUser.name}</Text>
          )}
        </View>

        {/* Earnings Breakdown */}
        {earningsBreakdown.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Earnings Breakdown</Text>
            <View style={styles.historyList}>
              {earningsBreakdown.map((item, index) => (
                <View key={index} style={styles.breakdownItem}>
                  <View style={styles.breakdownHeader}>
                    <Text style={styles.busName}>{item.busName}</Text>
                    <Text style={styles.busEarnings}>
                      {formatCurrency(item.earnings)}
                    </Text>
                  </View>
                  <Text style={styles.busDetails}>
                    {item.bookingsCount} bookings • Bus ID: {item.busId}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* History Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>History</Text>
          <View style={styles.historyList}>
            {historyData.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.historyItem,
                  item.isSelected && styles.selectedHistoryItem,
                ]}
              >
                <Text
                  style={[
                    styles.historyItemText,
                    item.isSelected && styles.selectedHistoryItemText,
                  ]}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Withdraw Button */}
        <TouchableOpacity style={styles.withdrawButton}>
          <Text style={styles.withdrawButtonText}>Withdraw</Text>
        </TouchableOpacity>

        {/* Refresh Button */}
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => {
            calculateTotalEarnings();
            calculateEarningsFromAllUsers();
          }}
        >
          <Text style={styles.refreshButtonText}>Refresh Earnings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#4A90E2',
    zIndex: 999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 2,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  drawerItemIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  amountContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  amountLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  amountText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  ownerName: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 12,
  },
  historyList: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#f8f8f8',
  },
  selectedHistoryItem: {
    backgroundColor: '#6B73FF',
  },
  historyItemText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedHistoryItemText: {
    color: 'white',
  },
  breakdownItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  busName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  busEarnings: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  busDetails: {
    fontSize: 12,
    color: '#666',
  },
  withdrawButton: {
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  withdrawButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  refreshButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default WithdrawScreen;
