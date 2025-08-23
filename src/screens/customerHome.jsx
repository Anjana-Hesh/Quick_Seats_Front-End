// import React, { useState, useRef, useEffect } from 'react';
// import { useFocusEffect } from '@react-navigation/native';
// import img from '../../assets/images/map.png';
// import chat from '../../assets/images/chat.png';
// import bus from '../../assets/images/bus.png';
// import speech from '../../assets/images/speech.png';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   Animated,
//   Icon,
//   Image,
//   Alert,
// } from 'react-native';
// import SideMenu from './components/SideMenu';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // async function getLocalData() {
// //   try {
// //     const data = await AsyncStorage.getItem('username');
// //     if (data !== null) {
// //       return JSON.parse(data);
// //     }
// //     return null;
// //   } catch (error) {
// //     console.log('Error reading route:', error);
// //   }
// // }

// // async function getLocalDataToken() {
// //   try {
// //     const data = await AsyncStorage.getItem('accessToken');
// //     if (data !== null) {
// //       return JSON.parse(data);
// //     }
// //     return null;
// //   } catch (error) {
// //     console.log('Error reading route:', error);
// //   }
// // }

// const { width, height } = Dimensions.get('window');
// const MENU_WIDTH = width * 0.7;

// const HomeScreen = ({ navigation }) => {
//   useFocusEffect(
//     React.useCallback(() => {
//       console.log('Screen is focused!');
//       console.log('array', getUsersArray());
//       getAllBookings(getUsersArray());
//       return () => console.log('Screen unfocused');
//     }, []),
//   );

//   async function getUsersArray() {
//     try {
//       console.log('Get dataaaaa');
//       const usersData = await AsyncStorage.getItem('usersArray');
//       console.log(JSON.parse(usersData));
//       return JSON.parse(usersData);
//     } catch (error) {
//       console.error('Error getting users array:', error);
//       return [];
//     }
//   }

//   function getAllBookings(users) {
//     console.log('users', users[2]);
//     return users.flatMap(
//       user =>
//         user.bus?.flatMap(bus =>
//           (bus.bookings || []).map(booking => ({
//             ...booking,
//             busInfo: {
//               busId: bus.id,
//               busName: bus.name,
//               owner: user.name,
//             },
//           })),
//         ) || [],
//     );
//   }

//   function loadData() {}

//   // useEffect(() => {
//   //   console.log('Screen loaded!');
//   //   connection();
//   // }, []);

//   // useFocusEffect(
//   //   React.useCallback(() => {
//   //     console.log('Screen is focused!');
//   //     connection();

//   //     return () => console.log('Screen unfocused'); // cleanup
//   //   }, []),
//   // );

//   const [conversationHome, setConversation] = useState('');
//   const [followings, setFollowings] = useState([]);
//   // const [followings, setFollowings] = useState([
//   //   { id: 1, user01: 'ACD-01-DB', user02: true },
//   //   { id: 2, user01: 'ACD-01-DB', user02: true },
//   //   { id: 3, user01: 'ACD-01-DB', user02: true },
//   //   { id: 4, user01: 'ACD-01-DB', user02: true },
//   //   { id: 5, user01: 'ACD-01-DB', user02: true },
//   //   { id: 6, user01: 'ACD-01-DB', user02: true },
//   //   { id: 7, user01: 'ACD-01-DB', user02: true },
//   //   { id: 8, user01: 'ACD-01-DB', user02: true },
//   // ]);

//   // async function connection() {
//   //   try {
//   //     const token = getLocalDataToken();
//   //     const user = getLocalData();
//   //     console.log('token:', JSON.stringify(token));
//   //     console.log('user:', user);

//   //     const response = await fetch(
//   //       'http://10.48.140.203:8080/api/v1/conversation/get-conversation-user',
//   //       {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           Authorization: `Bearer ${token}`, // <- include actual token here
//   //         },
//   //         body: JSON.stringify({
//   //           user: user,
//   //         }),
//   //       },
//   //     );

//   //     if (!response.ok) {
//   //       throw new Error('Following Load failed');
//   //     }

//   //     const data = await response.json();
//   //     setFollowings(data);
//   //     console.log('Response:', data);

//   //     Alert.alert('Success', 'Following Load successful!');
//   //     return data;
//   //   } catch (error) {
//   //     console.error('Error:', error);
//   //     Alert.alert('Error', error.message);
//   //     return false;
//   //   }
//   // }

//   const [isMenuVisible, setIsMenuVisible] = useState(false);
//   const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
//   const overlayOpacity = useRef(new Animated.Value(0)).current;

//   //// connection //////////////////////////////////////////////
//   // async function connection(url, method) {
//   //   const response = fetch(url, {
//   //     method: { method },
//   //     headers: {
//   //       'content-Type': 'application/json',
//   //       Authorization: '',
//   //     },
//   //     body: JSON.stringify(),
//   //   });

//   //   if (!(await response).ok) {
//   //     throw new Error('Error');
//   //   }

//   //   const data = (await response).json();
//   //   Alert.alert('Success');
//   //   setFollowings(data);
//   // }
//   ///////////////////////////////////////////////////////////////

//   const toggleBookmark = id => {
//     setFollowings(prevFollowings =>
//       prevFollowings.map(item =>
//         item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item,
//       ),
//     );
//   };

//   const openMenu = () => {
//     setIsMenuVisible(true);
//     Animated.parallel([
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: false,
//       }),
//       Animated.timing(overlayOpacity, {
//         toValue: 0.5,
//         duration: 300,
//         useNativeDriver: false,
//       }),
//     ]).start();
//   };

//   const closeMenu = () => {
//     Animated.parallel([
//       Animated.timing(slideAnim, {
//         toValue: -MENU_WIDTH,
//         duration: 300,
//         useNativeDriver: false,
//       }),
//       Animated.timing(overlayOpacity, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: false,
//       }),
//     ]).start(() => {
//       setIsMenuVisible(false);
//     });
//   };

//   const handleMenuPress = () => {
//     if (isMenuVisible) {
//       closeMenu();
//     } else {
//       openMenu();
//     }
//   };

//   const handleMenuItemPress = action => {
//     console.log(`${action} pressed`);
//     closeMenu();

//     switch (action) {
//       case 'Profile':
//         console.log('Navigating to Profile...');
//         break;
//       case 'Settings':
//         navigation.navigate('CustomerSettings');
//         console.log('Navigating to CustomerSettings...');
//         break;
//       case 'Help':
//         console.log('Navigating to Help & Support...');
//         break;
//       case 'Log out':
//         console.log('Logging out...');

//         break;
//       default:
//         console.log(`Unknown action: ${action}`);
//     }
//   };

//   const handleIconPress = iconName => {
//     console.log(`${iconName} pressed`);
//     switch (iconName) {
//       case 'bus':
//         navigation.navigate('SearchBus');
//         break;
//       case 'bookmark':
//         navigation.navigate('SearchBookings');
//         break;
//       case 'location':
//         navigation.navigate('CheckLocation');
//         break;
//       case 'search':
//         navigation.navigate('MessageDetails');
//         break;
//     }
//   };

//   const FollowingItem = (
//     { item }, /////////////////////////////////////////////////////////////////////
//   ) => (
//     <TouchableOpacity onPress={() => navigation.navigate('DetailsBusBooking')}>
//       <View style={styles.followingItem}>
//         <View style={styles.followingContent}>
//           <View style={styles.userIcon}>
//             <Text style={styles.userIconText}>👤</Text>
//           </View>
//           <Text style={styles.busNumber}>{item.busNumber}</Text>
//         </View>
//         <TouchableOpacity
//           style={styles.bookmarkButton}
//           onPress={() => navigation.navigate('MessageInbox')}
//         >
//           <Image source={speech} style={styles.navIconText} />
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );

//   // Custom menu items
//   const menuItems = [
//     { title: 'Profile', action: 'Profile' },
//     { title: 'Settings', action: 'Settings' },
//     { title: 'Help & Support', action: 'Help' },
//     { title: 'Log out', action: 'Log out' },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* Header with gradient background */}
//       <View style={styles.header}>
//         {/* User Profile Section */}
//         <View style={styles.userSection}>
//           <View style={styles.profilePicture}>
//             <Text style={styles.profileIcon}>👤</Text>
//           </View>
//           <Text style={styles.greeting}>Hi Anjana ,</Text>
//         </View>

//         {/* Menu Button */}
//         <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
//           <View style={styles.menuLine} />
//           <View style={styles.menuLine} />
//           <View style={styles.menuLine} />
//         </TouchableOpacity>

//         {/* Navigation Icons */}
//         <View style={styles.navigationIcons}>
//           <TouchableOpacity
//             style={styles.navIcon}
//             onPress={() => handleIconPress('bus')}
//           >
//             <Image source={bus} style={styles.navIconText} />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.navIcon}
//             onPress={() => handleIconPress('bookmark')}
//           >
//             <Text style={styles.navIconText}>🔖</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.navIcon}
//             onPress={() => handleIconPress('location')}
//           >
//             <Image source={img} style={styles.navIconText} />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.navIcon}
//             onPress={() => handleIconPress('search')}
//           >
//             <Image source={chat} style={styles.navIconText} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Main Content */}
//       <View style={styles.contentContainer}>
//         {/* Followings Section */}
//         <View style={styles.followingsHeader}>
//           <Text style={styles.followingsTitle}>Followings</Text>
//         </View>

//         {/* Followings List */}
//         <ScrollView
//           style={styles.followingsList}
//           showsVerticalScrollIndicator={false}
//           bounces={true}
//         >
//           {followings.map(item => (
//             <FollowingItem key={item.id} item={item} />
//           ))}

//           {/* Add some bottom padding */}
//           <View style={{ height: 20 }} />
//         </ScrollView>
//       </View>

//       {/* Side Menu Component */}
//       <SideMenu
//         isVisible={isMenuVisible}
//         slideAnim={slideAnim}
//         overlayOpacity={overlayOpacity}
//         onClose={closeMenu}
//         onMenuItemPress={handleMenuItemPress}
//         profileName="Anjana"
//         menuItems={menuItems}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//   },
//   header: {
//     backgroundColor: '#14B8A6',
//     paddingTop: 50,
//     paddingBottom: 30,
//     paddingHorizontal: 20,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//   },
//   userSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 25,
//   },
//   profilePicture: {
//     width: 45,
//     height: 45,
//     borderRadius: 22,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   profileIcon: {
//     fontSize: 20,
//   },
//   greeting: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: 'white',
//     flex: 1,
//   },
//   menuButton: {
//     position: 'absolute',
//     top: 55,
//     right: 20,
//     width: 30,
//     height: 25,
//     justifyContent: 'space-between',
//     zIndex: 10,
//   },
//   menuLine: {
//     width: 25,
//     height: 3,
//     backgroundColor: 'white',
//     borderRadius: 2,
//   },
//   navigationIcons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   navIcon: {
//     width: 55,
//     height: 55,
//     borderRadius: 27,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//   },
//   navIconText: {
//     fontSize: 24,
//   },
//   contentContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//     marginTop: -15,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     paddingTop: 25,
//   },
//   followingsHeader: {
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   followingsTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1F2937',
//   },
//   followingsList: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   followingItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#E5E7EB',
//     paddingVertical: 18,
//     paddingHorizontal: 20,
//     borderRadius: 15,
//     marginBottom: 12,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   followingContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   userIcon: {
//     width: 35,
//     height: 35,
//     borderRadius: 17,
//     backgroundColor: '#9CA3AF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   userIconText: {
//     fontSize: 16,
//     color: 'white',
//   },
//   busNumber: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#0F766E',
//     flex: 1,
//   },
//   bookmarkButton: {
//     padding: 5,
//   },
//   bookmarkIcon: {
//     fontSize: 20,
//   },
// });

// export default HomeScreen;
//////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useRef, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import img from '../../assets/images/map.png';
import chat from '../../assets/images/chat.png';
import bus from '../../assets/images/bus.png';
import speech from '../../assets/images/speech.png';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  Icon,
  Image,
  Alert,
} from 'react-native';
import SideMenu from './components/SideMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
const MENU_WIDTH = width * 0.7;

const HomeScreen = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      console.log('Screen is focused!');
      loadBookingsData(); // Call async function properly
      return () => console.log('Screen unfocused');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  // New async function to handle the data loading
  async function loadBookingsData() {
    try {
      const usersArray = await getUsersArray();
      console.log('array', usersArray);
      if (usersArray) {
        getAllBookings(usersArray);
      }
    } catch (error) {
      console.error('Error loading bookings data:', error);
    }
  }

  async function getUsersArray() {
    try {
      console.log('Get dataaaaa');
      const usersData = await AsyncStorage.getItem('usersArray');
      const parsedData = JSON.parse(usersData);
      console.log(parsedData);
      return parsedData;
    } catch (error) {
      console.error('Error getting users array:', error);
      return [];
    }
  }

  function getAllBookings(users) {
    // Add null/undefined check
    if (!users || !Array.isArray(users)) {
      console.warn('Users array is null, undefined, or not an array:', users);
      return [];
    }

    console.log('users', users[2]);
    return users.flatMap(
      user =>
        user.bus?.flatMap(bus =>
          (bus.bookings || []).map(booking => ({
            ...booking,
            busInfo: {
              busId: bus.id,
              busName: bus.name,
              owner: user.name,
            },
          })),
        ) || [],
    );
  }

  function loadData() {}

  // useEffect(() => {
  //   console.log('Screen loaded!');
  //   connection();
  // }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('Screen is focused!');
  //     connection();

  //     return () => console.log('Screen unfocused'); // cleanup
  //   }, []),
  // );

  const [conversationHome, setConversation] = useState('');
  const [followings, setFollowings] = useState([]);
  // const [followings, setFollowings] = useState([
  //   { id: 1, user01: 'ACD-01-DB', user02: true },
  //   { id: 2, user01: 'ACD-01-DB', user02: true },
  //   { id: 3, user01: 'ACD-01-DB', user02: true },
  //   { id: 4, user01: 'ACD-01-DB', user02: true },
  //   { id: 5, user01: 'ACD-01-DB', user02: true },
  //   { id: 6, user01: 'ACD-01-DB', user02: true },
  //   { id: 7, user01: 'ACD-01-DB', user02: true },
  //   { id: 8, user01: 'ACD-01-DB', user02: true },
  // ]);

  // async function connection() {
  //   try {
  //     const token = getLocalDataToken();
  //     const user = getLocalData();
  //     console.log('token:', JSON.stringify(token));
  //     console.log('user:', user);

  //     const response = await fetch(
  //       'http://10.48.140.203:8080/api/v1/conversation/get-conversation-user',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`, // <- include actual token here
  //         },
  //         body: JSON.stringify({
  //           user: user,
  //         }),
  //       },
  //     );

  //     if (!response.ok) {
  //       throw new Error('Following Load failed');
  //     }

  //     const data = await response.json();
  //     setFollowings(data);
  //     console.log('Response:', data);

  //     Alert.alert('Success', 'Following Load successful!');
  //     return data;
  //   } catch (error) {
  //     console.error('Error:', error);
  //     Alert.alert('Error', error.message);
  //     return false;
  //   }
  // }

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  //// connection //////////////////////////////////////////////
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
  //   setFollowings(data);
  // }
  ///////////////////////////////////////////////////////////////

  const toggleBookmark = id => {
    setFollowings(prevFollowings =>
      prevFollowings.map(item =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item,
      ),
    );
  };

  const openMenu = () => {
    setIsMenuVisible(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -MENU_WIDTH,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsMenuVisible(false);
    });
  };

  const handleMenuPress = () => {
    if (isMenuVisible) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const handleMenuItemPress = action => {
    console.log(`${action} pressed`);
    closeMenu();

    switch (action) {
      case 'Profile':
        console.log('Navigating to Profile...');
        break;
      case 'Settings':
        navigation.navigate('CustomerSettings');
        console.log('Navigating to CustomerSettings...');
        break;
      case 'Help':
        console.log('Navigating to Help & Support...');
        break;
      case 'Log out':
        console.log('Logging out...');
        navigation.navigate('Login');
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  const handleIconPress = iconName => {
    console.log(`${iconName} pressed`);
    switch (iconName) {
      case 'bus':
        navigation.navigate('SearchBus');
        break;
      case 'bookmark':
        navigation.navigate('SearchBookings');
        break;
      case 'location':
        navigation.navigate('CheckLocation');
        break;
      case 'search':
        navigation.navigate('MessageDetails');
        break;
    }
  };

  const FollowingItem = (
    { item }, /////////////////////////////////////////////////////////////////////
  ) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetailsBusBooking')}>
      <View style={styles.followingItem}>
        <View style={styles.followingContent}>
          <View style={styles.userIcon}>
            <Text style={styles.userIconText}>👤</Text>
          </View>
          <Text style={styles.busNumber}>{item.busNumber}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => navigation.navigate('MessageInbox')}
        >
          <Image source={speech} style={styles.navIconText} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Custom menu items
  const menuItems = [
    { title: 'Profile', action: 'Profile' },
    { title: 'Settings', action: 'Settings' },
    { title: 'Help & Support', action: 'Help' },
    { title: 'Log out', action: 'Log out' },
  ];

  return (
    <View style={styles.container}>
      {/* Header with gradient background */}
      <View style={styles.header}>
        {/* User Profile Section */}
        <View style={styles.userSection}>
          <View style={styles.profilePicture}>
            <Text style={styles.profileIcon}>👤</Text>
          </View>
          <Text style={styles.greeting}>Hi Anjana ,</Text>
        </View>

        {/* Menu Button */}
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </TouchableOpacity>

        {/* Navigation Icons */}
        <View style={styles.navigationIcons}>
          <TouchableOpacity
            style={styles.navIcon}
            onPress={() => handleIconPress('bus')}
          >
            <Image source={bus} style={styles.navIconText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navIcon}
            onPress={() => handleIconPress('bookmark')}
          >
            <Text style={styles.navIconText}>🔖</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navIcon}
            onPress={() => handleIconPress('location')}
          >
            <Image source={img} style={styles.navIconText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navIcon}
            onPress={() => handleIconPress('search')}
          >
            <Image source={chat} style={styles.navIconText} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Followings Section */}
        <View style={styles.followingsHeader}>
          <Text style={styles.followingsTitle}>Followings</Text>
        </View>

        {/* Followings List */}
        <ScrollView
          style={styles.followingsList}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {followings.map(item => (
            <FollowingItem key={item.id} item={item} />
          ))}

          {/* Add some bottom padding */}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>

      {/* Side Menu Component */}
      <SideMenu
        isVisible={isMenuVisible}
        slideAnim={slideAnim}
        overlayOpacity={overlayOpacity}
        onClose={closeMenu}
        onMenuItemPress={handleMenuItemPress}
        profileName="Anjana"
        menuItems={menuItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#14B8A6',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  profilePicture: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileIcon: {
    fontSize: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    flex: 1,
  },
  menuButton: {
    position: 'absolute',
    top: 55,
    right: 20,
    width: 30,
    height: 25,
    justifyContent: 'space-between',
    zIndex: 10,
  },
  menuLine: {
    width: 25,
    height: 3,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  navigationIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  navIcon: {
    width: 55,
    height: 55,
    borderRadius: 27,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  navIconText: {
    fontSize: 24,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 25,
  },
  followingsHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  followingsTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  followingsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  followingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E5E7EB',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  followingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userIcon: {
    width: 35,
    height: 35,
    borderRadius: 17,
    backgroundColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userIconText: {
    fontSize: 16,
    color: 'white',
  },
  busNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F766E',
    flex: 1,
  },
  bookmarkButton: {
    padding: 5,
  },
  bookmarkIcon: {
    fontSize: 20,
  },
});

export default HomeScreen;
