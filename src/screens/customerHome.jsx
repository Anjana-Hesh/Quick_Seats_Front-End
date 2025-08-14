import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  ScrollView,
  Animated,
} from 'react-native';
import SideMenu from './components/SideMenu';

const { width, height } = Dimensions.get('window');
const MENU_WIDTH = width * 0.7;

const HomeScreen = ({ navigation }) => {
  const [followings, setFollowings] = useState([
    { id: 1, busNumber: 'ACD-01-DB', isBookmarked: true },
    { id: 2, busNumber: 'ACD-01-DB', isBookmarked: true },
    { id: 3, busNumber: 'ACD-01-DB', isBookmarked: true },
    { id: 4, busNumber: 'ACD-01-DB', isBookmarked: true },
    { id: 5, busNumber: 'ACD-01-DB', isBookmarked: true },
    { id: 6, busNumber: 'ACD-01-DB', isBookmarked: true },
    { id: 7, busNumber: 'ACD-01-DB', isBookmarked: true },
    { id: 8, busNumber: 'ACD-01-DB', isBookmarked: true },
  ]);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const toggleBookmark = (id) => {
    setFollowings(prevFollowings =>
      prevFollowings.map(item =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
      )
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
      })
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
      })
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

  const handleMenuItemPress = (action) => {
    console.log(`${action} pressed`);
    closeMenu();
    
    // Add navigation logic for menu items
    switch(action) {
      case 'Profile':
        // navigation.navigate('Profile');
        console.log('Navigating to Profile...');
        break;
      case 'Settings':
        // Navigate to CustomerSettings page
        navigation.navigate('CustomerSettings');
        console.log('Navigating to CustomerSettings...');
        break;
      case 'Help':
        // navigation.navigate('Help');
        console.log('Navigating to Help & Support...');
        break;
      case 'Log out':
        // Handle logout logic
        console.log('Logging out...');
        // You can add logout logic here like:
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'Login' }],
        // });
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  const handleIconPress = (iconName) => {
    console.log(`${iconName} pressed`);
    // Add navigation logic for each icon
    switch(iconName) {
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

  const FollowingItem = ({ item }) => (
    <View style={styles.followingItem}>
      <View style={styles.followingContent}>
        <View style={styles.userIcon}>
          <Text style={styles.userIconText}>👤</Text>
        </View>
        <Text style={styles.busNumber}>{item.busNumber}</Text>
      </View>
      <TouchableOpacity 
        style={styles.bookmarkButton}
        onPress={() => toggleBookmark(item.id)}
      >
        <Text style={[
          styles.bookmarkIcon,
          { color: item.isBookmarked ? '#8B5CF6' : '#9CA3AF' }
        ]}>
          🏷️
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Custom menu items
  const menuItems = [
    { title: "Profile", action: "Profile" },
    { title: "Settings", action: "Settings" },
    { title: "Help & Support", action: "Help" },
    { title: "Log out", action: "Log out" }
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
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={handleMenuPress}
        >
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
            <Text style={styles.navIconText}>🚌</Text>
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
            <Text style={styles.navIconText}>📍</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navIcon}
            onPress={() => handleIconPress('search')}
          >
            <Text style={styles.navIconText}>💬</Text> 
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
          {followings.map((item) => (
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