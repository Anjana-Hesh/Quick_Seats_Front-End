import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  ScrollView,
  StatusBar,
  SafeAreaView,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';

const { width, height } = Dimensions.get('window');
const MENU_WIDTH = width * 0.7;

const SearchBusScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [buses] = useState([
    { id: 1, busNumber: 'ACD-01-DB', isBookmarked: true },
    { id: 2, busNumber: 'ACD-01-DB', isBookmarked: true },
    { id: 3, busNumber: 'ACD-01-DB', isBookmarked: true },
    { id: 4, busNumber: 'ACD-01-DB', isBookmarked: true },
    { id: 5, busNumber: 'ACD-01-DB', isBookmarked: true },
    { id: 6, busNumber: 'ACD-01-DB', isBookmarked: true },
    { id: 7, busNumber: 'ACD-01-DB', isBookmarked: true },
    { id: 8, busNumber: 'ACD-01-DB', isBookmarked: false },
  ]);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

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

  const handleBackPress = () => {
    navigation.navigate('CustomerHome'); // Navigate to CustomerHome screen
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
    
    switch(item) {
      case 'Profile':
        navigation.navigate('Profile');
        break;
      case 'Settings':
        navigation.navigate('Settings');
        break;
      case 'Log out':
        // Handle logout logic
        break;
    }
  };

  const handleBookmarkPress = (busId) => {
    console.log(`Bookmark pressed for bus ${busId}`);
  };

  const handleBusPress = (busId) => {
    console.log(`Bus ${busId} pressed`);
    navigation.navigate('BusDetails', { busId });
  };

  const BusItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.busItem}
      onPress={() => handleBusPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.busContent}>
        <View style={styles.userIcon}>
          <Text style={styles.userIconText}>👤</Text>
        </View>
        <Text style={styles.busNumber}>{item.busNumber}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.bookmarkButton}
        onPress={() => handleBookmarkPress(item.id)}
      >
        <View style={[
          styles.bookmarkIcon,
          { backgroundColor: item.isBookmarked ? '#8B5CF6' : '#9CA3AF' }
        ]}>
          <Text style={styles.bookmarkText}>🏷️</Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
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
    <SafeAreaView style={styles.container}>
      {/* Proper Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#14B8A6" />
      
      {/* Header */}
      <View style={styles.header}>
        {/* Navigation Header */}
        <View style={styles.navigationHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Search Bus</Text>
          
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={handleMenuPress}
          >
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter 2</Text>
        </TouchableOpacity>
      </View>

      {/* Bus List */}
      <ScrollView 
        style={styles.busList}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {buses.map((item) => (
          <BusItem key={item.id} item={item} />
        ))}
        
        {/* Add some bottom padding */}
        <View style={{ height: 20 }} />
      </ScrollView>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#14B8A6',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 25,
  },
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: StatusBar.currentHeight || 0, // Account for status bar height
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
  menuButton: {
    width: 30,
    height: 25,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: 25,
    height: 3,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#9CA3AF',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    padding: 0,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  filterButton: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  busList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  busItem: {
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
  busContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userIcon: {
    width: 35,
    height: 35,
    borderRadius: 17,
    backgroundColor: '#8B5CF6',
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
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkText: {
    fontSize: 14,
    color: 'white',
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

export default SearchBusScreen;