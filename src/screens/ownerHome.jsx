import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = 280;

const DriversScreen = ({ navigation }) => {
  const [tooltipVisible, setTooltipVisible] = useState(null);
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const drivers = [
    { id: '1', name: 'James Carter' },
    { id: '2', name: 'Emily Johnson' },
    { id: '3', name: 'Michael Bennett' },
    { id: '4', name: 'Daniel Cooper' },
    { id: '5', name: 'Sophia Reynolds' },
    { id: '6', name: 'Benjamin Harris' },
    { id: '7', name: 'Benjamin Harris' },
  ];

  const topActions = [
    { 
      id: 'add-driver', 
      icon: '➕', 
      tooltip: 'Add New Driver',
      action: () => navigation.navigate('AddDriverPage')
    },
    { 
      id: 'search', 
      icon: '🔍', 
      tooltip: 'Search Drivers',
      action: () => Alert.alert('Search', 'Open search functionality')
    },
    { 
      id: 'bookings', 
      icon: ' 🔖', 
      tooltip: 'bookings',
      action: () => navigation.navigate('DriverBooking') 
    },
  ];

  const menuItems = [
    { id: '1', title: 'Dashboard', icon: '📊' },
    { id: '2', title: 'Drivers', icon: '👨‍✈️' },
    { id: '3', title: 'Messages', icon: '💬' },
    { id: '4', title: 'Settings', icon: '⚙️' },
    { id: '5', title: 'Profile', icon: '👤' },
    { id: '6', title: 'Logout', icon: '🚪' },
  ];

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      // Close drawer
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setIsDrawerOpen(false);
      });
    } else {
      // Open drawer
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

  const handleMenuItemPress = (item) => {
    closeDrawer();
    switch (item.title) {
      case 'Messages':
        navigation.navigate('MessageInbox');
        break;
      case 'Settings':
        navigation.navigate('OwnerSettings');
        break;
      case 'Dashboard':
        case 'Profile':
        case 'Logout':
          Alert.alert(`${item.title}`, `Navigate to ${item.title}`);
        break;
      default:
        break;
    }
  };

  const handleDriverPress = (driver) => {
    navigation.navigate('DriverBookingDataPrice', { driver: driver });
  };

  const handleDriverMessage = (driver) => {
    navigation.navigate('MessageInbox', { recipient: driver.name });
  };

  const showTooltip = (actionId) => {
    setTooltipVisible(actionId);
    setTimeout(() => setTooltipVisible(null), 2000);
  };

  const renderTooltip = (action, index) => {
    if (tooltipVisible === action.id) {
      return (
        <View style={[styles.tooltip, { left: 50 + (index * 100) }]}>
          <Text style={styles.tooltipText}>{action.tooltip}</Text>
          <View style={styles.tooltipArrow} />
        </View>
      );
    }
    return null;
  };

  const renderDriver = ({ item }) => (
    <TouchableOpacity 
      style={styles.driverCard}
      onPress={() => handleDriverPress(item)}
    >
      <View style={styles.driverInfo}>
        <View style={styles.driverAvatar}>
          <Text style={styles.avatarIcon}>👤</Text>
        </View>
        <Text style={styles.driverName}>{item.name}</Text>
      </View>
      <TouchableOpacity 
        style={styles.messageButton}
        onPress={() => handleDriverMessage(item)}
      >
        <Text style={styles.messageIcon}>💬</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.drawerItem}
      onPress={() => handleMenuItemPress(item)}
    >
      <Text style={styles.drawerItemIcon}>{item.icon}</Text>
      <Text style={styles.drawerItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A9EAF" />
      
      {/* Overlay */}
      {isDrawerOpen && (
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Drawer */}
      <Animated.View style={[styles.drawer, { right: slideAnim }]}>
        <View style={styles.drawerContent}>
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Animated.View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.profileContainer}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileIcon}>👤</Text>
            </View>
            <Text style={styles.greeting}>Hi Anjana ,</Text>
          </View>
        </View>
        
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Action Circles */}
      <View style={styles.actionsContainer}>
        {topActions.map((action, index) => (
          <View key={action.id} style={styles.actionWrapper}>
            {renderTooltip(action, index)}
            <TouchableOpacity 
              style={styles.actionCircle}
              onPress={action.action}
              onLongPress={() => showTooltip(action.id)}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Drivers</Text>
        
        <FlatList
          data={drivers}
          renderItem={renderDriver}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.driversList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A9EAF',
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
    backgroundColor: '#4A9EAF',
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
    marginBottom: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#4A9EAF',
  },
  headerLeft: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileIcon: {
    fontSize: 18,
    color: '#4A9EAF',
  },
  greeting: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  menuButton: {
    padding: 4,
  },
  menuIcon: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: '#4A9EAF',
    position: 'relative',
  },
  actionWrapper: {
    alignItems: 'center',
    position: 'relative',
  },
  actionCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  actionIcon: {
    fontSize: 24,
  },
  tooltip: {
    position: 'absolute',
    top: -40,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    zIndex: 1000,
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    minWidth: 80,
  },
  tooltipArrow: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    marginLeft: -5,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(0, 0, 0, 0.8)',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2E3B5C',
    marginBottom: 20,
  },
  driversList: {
    paddingBottom: 20,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarIcon: {
    fontSize: 18,
    color: '#6B46C1',
  },
  driverName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2E3B5C',
  },
  messageButton: {
    width: 40,
    height: 40,
    backgroundColor: '#6B46C1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageIcon: {
    fontSize: 16,
    color: 'white',
  },
});

export default DriversScreen;