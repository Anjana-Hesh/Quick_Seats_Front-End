import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  ScrollView,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';

const { width, height } = Dimensions.get('window');
const MENU_WIDTH = width * 0.7; // 70% of screen width

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

  const handleMenuItemPress = (item) => {
    console.log(`${item} pressed`);
    closeMenu();
    
    // Add navigation logic for menu items
    switch(item) {
      case 'Profile':
        // navigation.navigate('Profile');
        break;
      case 'Settings':
        // navigation.navigate('Settings');
        break;
      case 'Log out':
        // Handle logout logic
        break;
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

  const MenuItem = ({ title, onPress }) => (
    <TouchableOpacity 
      style={styles.menuItem}
      onPress={() => onPress(title)}
      activeOpacity={0.7}
    >
      <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
  );

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

      {/* Menu Overlay and Slide Menu */}
      {isMenuVisible && (
        <>
          {/* Dark Overlay */}
          <TouchableWithoutFeedback onPress={closeMenu}>
            <Animated.View 
              style={[
                styles.overlay,
                { opacity: overlayOpacity }
              ]} 
            />
          </TouchableWithoutFeedback>

          {/* Sliding Menu */}
          <Animated.View 
            style={[
              styles.slideMenu,
              { left: slideAnim }
            ]}
          >
            <View style={styles.menuHeader}>
              <View style={styles.menuProfileSection}>
                <View style={styles.menuProfilePicture}>
                  <Text style={styles.menuProfileIcon}>👤</Text>
                </View>
                <Text style={styles.menuProfileName}>Anjana</Text>
              </View>
            </View>

            <View style={styles.menuContent}>
              <MenuItem title="Profile" onPress={handleMenuItemPress} />
              <MenuItem title="Settings" onPress={handleMenuItemPress} />
              <MenuItem title="Log out" onPress={handleMenuItemPress} />
            </View>
          </Animated.View>
        </>
      )}
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
  // Menu Styles
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 20,
  },
  slideMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: MENU_WIDTH,
    backgroundColor: '#67C7D4',
    zIndex: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  menuHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuProfileSection: {
    alignItems: 'center',
  },
  menuProfilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  menuProfileIcon: {
    fontSize: 28,
  },
  menuProfileName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  menuContent: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
});

export default HomeScreen;