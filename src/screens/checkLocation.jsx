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
  TouchableWithoutFeedback,
  Platform
} from 'react-native';

const { width, height } = Dimensions.get('window');
const MENU_WIDTH = width * 0.7;

const CheckLocationScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [buses] = useState([
    { id: 1, number: 'ACD-01-DB', route: 'Colombo - Kandy', currentLocation: { latitude: 7.2906, longitude: 80.6337 } },
    { id: 2, number: 'ACD-02-DB', route: 'Colombo - Galle', currentLocation: { latitude: 6.9271, longitude: 79.8612 } },
    { id: 3, number: 'ACD-03-DB', route: 'Kandy - Nuwara Eliya', currentLocation: { latitude: 7.2906, longitude: 80.6337 } },
    { id: 4, number: 'ACD-04-DB', route: 'Colombo - Matara', currentLocation: { latitude: 6.9497, longitude: 79.8544 } },
    { id: 5, number: 'ACD-05-DB', route: 'Kurunegala - Colombo', currentLocation: { latitude: 7.4863, longitude: 80.3647 } },
    { id: 6, number: 'ACD-06-DB', route: 'Negombo - Colombo', currentLocation: { latitude: 7.2083, longitude: 79.8358 } },
    { id: 7, number: 'ACD-07-DB', route: 'Anuradhapura - Colombo', currentLocation: { latitude: 8.3114, longitude: 80.4037 } },
    { id: 8, number: 'ACD-08-DB', route: 'Ratnapura - Colombo', currentLocation: { latitude: 6.6828, longitude: 80.4126 } },
  ]);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // Status bar data simulation
  const [time, setTime] = useState('22:00');
  const [batteryLevel, setBatteryLevel] = useState(75);

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
    navigation.goBack();
  };

  const handleBusPress = (bus) => {
    // Navigate to BusLocationScreen with bus data
    navigation.navigate('BusLocationScreen', { 
      busNumber: bus.number,
      route: bus.route,
      currentLocation: bus.currentLocation,
      busId: bus.id
    });
  };

  // Filter buses based on search text
  const filteredBuses = buses.filter(bus => 
    bus.number.toLowerCase().includes(searchText.toLowerCase()) ||
    bus.route.toLowerCase().includes(searchText.toLowerCase())
  );

  const BatteryIcon = ({ level }) => {
    const batteryColor = level > 20 ? 'black' : 'red';
    
    return (
      <View style={styles.batteryContainer}>
        <View style={[styles.battery, { width: `${level}%`, backgroundColor: batteryColor }]} />
        <View style={styles.batteryTip} />
      </View>
    );
  };

  const BusItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.busItem}
      onPress={() => handleBusPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.busInfo}>
        <Text style={styles.busNumber}>{item.number}</Text>
        <Text style={styles.busRoute}>{item.route}</Text>
        <Text style={styles.locationStatus}>• Live Location Available</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrowIcon}>→</Text>
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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Custom Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.timeText}>{time}</Text>
        
        {Platform.OS === 'ios' && (
          <View style={styles.notchArea}>
            <View style={styles.notch} />
          </View>
        )}
        
        <View style={styles.statusIcons}>
          <View style={styles.signalBars}>
            <View style={[styles.bar, styles.bar1]} />
            <View style={[styles.bar, styles.bar2]} />
            <View style={[styles.bar, styles.bar3]} />
            <View style={[styles.bar, styles.bar4]} />
          </View>
          <Text style={styles.iconText}>📶</Text>
          <BatteryIcon level={batteryLevel} />
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Check Location</Text>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={openMenu}
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
            placeholder="Search by bus number or route"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredBuses.length} bus{filteredBuses.length !== 1 ? 'es' : ''} found
        </Text>
      </View>

      {/* Bus List */}
      <ScrollView 
        style={styles.busList}
        showsVerticalScrollIndicator={false}
      >
        {filteredBuses.length > 0 ? (
          filteredBuses.map((bus) => (
            <BusItem key={bus.id} item={bus} />
          ))
        ) : (
          <View style={styles.noBusesContainer}>
            <Text style={styles.noBusesText}>No buses found matching your search</Text>
          </View>
        )}
      </ScrollView>

      {/* Slide Menu */}
      {isMenuVisible && (
        <>
          <TouchableWithoutFeedback onPress={closeMenu}>
            <Animated.View 
              style={[
                styles.overlay,
                { opacity: overlayOpacity }
              ]} 
            />
          </TouchableWithoutFeedback>

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
                <Text style={styles.menuProfileName}> Anjana</Text>
              </View>
            </View>

            <View style={styles.menuContent}>
              <MenuItem title="Profile" onPress={() => navigation.navigate('Profile')} />
              <MenuItem title="Settings" onPress={() => navigation.navigate('Settings')} />
              <MenuItem title="Log out" onPress={() => navigation.navigate('Login')} />
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
    backgroundColor: '#FFFFFF',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 5 : 35,
    paddingBottom: 5,
    backgroundColor: '#FFFFFF',
  },
  timeText: {
    color: 'black',
    fontSize: 14,
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
    marginRight: 8,
    height: 14,
  },
  bar: {
    width: 3,
    backgroundColor: 'black',
    marginRight: 2,
  },
  bar1: { height: 5 },
  bar2: { height: 7 },
  bar3: { height: 9 },
  bar4: { height: 11 },
  iconText: {
    fontSize: 14,
    marginRight: 8,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  battery: {
    width: 20,
    height: 10,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'black',
  },
  batteryTip: {
    width: 2,
    height: 4,
    backgroundColor: 'black',
    marginLeft: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  menuButton: {
    width: 25,
    height: 20,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: 25,
    height: 3,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#6B7280',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    padding: 0,
  },
  resultsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  resultsText: {
    fontSize: 14,
    color: '#6B7280',
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  busInfo: {
    flex: 1,
  },
  busNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  busRoute: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  locationStatus: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  arrowContainer: {
    paddingLeft: 10,
  },
  arrowIcon: {
    fontSize: 18,
    color: '#9CA3AF',
  },
  noBusesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  noBusesText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
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
  },
  menuHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
});

export default CheckLocationScreen;