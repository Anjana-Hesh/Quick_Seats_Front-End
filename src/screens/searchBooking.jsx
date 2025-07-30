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
const MENU_WIDTH = width * 0.7; // 70% of screen width

const SearchBookingsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [bookings] = useState([
    { id: 1, busNumber: 'ACD-01-DB', date: 'Sun-02-02', isBookmarked: true },
    { id: 2, busNumber: 'ACD-01-DB', date: 'Sun-02-02', isBookmarked: true },
    { id: 3, busNumber: 'ACD-01-DB', date: 'Sun-02-02', isBookmarked: true },
    { id: 4, busNumber: 'ACD-01-DB', date: 'Sun-02-02', isBookmarked: true },
    { id: 5, busNumber: 'ACD-01-DB', date: 'Sun-02-02', isBookmarked: true },
    { id: 6, busNumber: 'ACD-01-DB', date: 'Sun-02-02', isBookmarked: true },
    { id: 7, busNumber: 'ACD-01-DB', date: 'Sun-02-02', isBookmarked: true },
  ]);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const filterOptions = [
    { id: 0, label: 'All', icon: '📅' },
    { id: 1, label: 'Today', icon: '🗓️' },
    { id: 2, label: 'Week', icon: '📊' },
    { id: 3, label: 'Month', icon: '🏷️' }
  ];

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
    navigation.navigate('CustomerHome');
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
        navigation.navigate('Profile');
        break;
      case 'Settings':
        navigation.navigate('Settings');
        break;
      case 'Log out':
        // Handle logout logic
        navigation.navigate('Login');
        break;
    }
  };

  const handleFilterPress = (filterId) => {
    setSelectedFilter(filterId);
    console.log(`Filter ${filterOptions[filterId].label} selected`);
  };

  const handleBookmarkPress = (bookingId) => {
    console.log(`Bookmark pressed for booking ${bookingId}`);
    // Add bookmark toggle functionality
  };

  const handleBookingPress = (bookingId) => {
    console.log(`Booking ${bookingId} pressed`);
    navigation.navigate('BookingDetails', { bookingId });
  };

  const FilterButton = ({ item, isSelected }) => (
    <TouchableOpacity 
      style={[
        styles.filterButton,
        { backgroundColor: isSelected ? '#0F766E' : '#14B8A6' }
      ]}
      onPress={() => handleFilterPress(item.id)}
      activeOpacity={0.8}
    >
      <Text style={styles.filterIcon}>{item.icon}</Text>
      <Text style={styles.filterLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  const BookingItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.bookingItem}
      onPress={() => handleBookingPress(item.id)}
      activeOpacity={0.7}
    >
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
      
      <View style={styles.bookingContent}>
        <Text style={styles.busNumber}>{item.busNumber}</Text>
        <Text style={styles.bookingDate}>{item.date}</Text>
      </View>
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
      <StatusBar barStyle="light-content" backgroundColor="#14B8A6" />
      
      {/* Header */}
      <View style={styles.header}>
        {/* Status Bar Simulation */}
        <View style={styles.statusBar}>
          <Text style={styles.timeText}>22:00</Text>
          <View style={styles.notchArea}>
            <View style={styles.notch} />
          </View>
          <View style={styles.statusIcons}>
            <View style={styles.signalBars}>
              <View style={[styles.bar, styles.bar1]} />
              <View style={[styles.bar, styles.bar2]} />
              <View style={[styles.bar, styles.bar3]} />
              <View style={[styles.bar, styles.bar4]} />
            </View>
            <View style={styles.wifiIcon}>
              <Text style={styles.iconText}>📶</Text>
            </View>
            <View style={styles.batteryIcon}>
              <View style={styles.battery} />
            </View>
          </View>
        </View>

        {/* Navigation Header */}
        <View style={styles.navigationHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Search Bookings</Text>
          
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

      {/* Filter Circles */}
      <View style={styles.filterContainer}>
        {filterOptions.map((item) => (
          <FilterButton 
            key={item.id} 
            item={item} 
            isSelected={selectedFilter === item.id}
          />
        ))}
      </View>

      {/* Bookings List */}
      <ScrollView 
        style={styles.bookingsList}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {bookings.map((item) => (
          <BookingItem key={item.id} item={item} />
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
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  timeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  notchArea: {
    flex: 1,
    alignItems: 'center',
  },
  notch: {
    width: 120,
    height: 25,
    backgroundColor: 'black',
    borderRadius: 15,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 5,
  },
  bar: {
    width: 3,
    backgroundColor: 'white',
    marginRight: 1,
  },
  bar1: { height: 4 },
  bar2: { height: 6 },
  bar3: { height: 8 },
  bar4: { height: 10 },
  wifiIcon: {
    marginRight: 5,
  },
  iconText: {
    color: 'white',
    fontSize: 12,
  },
  batteryIcon: {
    marginLeft: 5,
  },
  battery: {
    width: 20,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  filterButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  filterIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  filterLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  bookingsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bookingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
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
  bookmarkButton: {
    marginRight: 15,
  },
  bookmarkIcon: {
    width: 35,
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkText: {
    fontSize: 16,
    color: 'white',
  },
  bookingContent: {
    flex: 1,
  },
  busNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  bookingDate: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
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

export default SearchBookingsScreen;