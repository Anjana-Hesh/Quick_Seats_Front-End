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
    { id: 1, number: 'ACD-01-DB' },
    { id: 2, number: 'ACD-01-DB' },
    { id: 3, number: 'ACD-01-DB' },
    { id: 4, number: 'ACD-01-DB' },
    { id: 5, number: 'ACD-01-DB' },
    { id: 6, number: 'ACD-01-DB' },
    { id: 7, number: 'ACD-01-DB' },
    { id: 8, number: 'ACD-01-DB' },
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

  const handleBusPress = (busNumber) => {
    navigation.navigate('BusLocation', { busNumber });
  };

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
      onPress={() => handleBusPress(item.number)}
      activeOpacity={0.7}
    >
      <Text style={styles.busNumber}>{item.number}</Text>
      <Text style={styles.arrowIcon}>→</Text>
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
          <Text style={styles.searchIcon}>Q</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Bus List */}
      <ScrollView 
        style={styles.busList}
        showsVerticalScrollIndicator={false}
      >
        {buses.map((bus) => (
          <BusItem key={bus.id} item={bus} />
        ))}
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
                <Text style={styles.menuProfileName}>User</Text>
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
    fontWeight: 'bold',
    marginRight: 8,
    color: '#6B7280',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    padding: 0,
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
  },
  busNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  arrowIcon: {
    fontSize: 18,
    color: '#9CA3AF',
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