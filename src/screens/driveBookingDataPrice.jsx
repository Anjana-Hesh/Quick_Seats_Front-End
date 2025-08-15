import React, { useState, useRef } from 'react';
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = 280;

const WithdrawScreen = ({ navigation }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const historyData = [
    { id: 1, date: '2025-01-20-Morning', isSelected: false },
    { id: 2, date: '2025-01-20-Morning', isSelected: true },
    { id: 3, date: '2025-01-20-Morning', isSelected: false },
    { id: 4, date: '2025-01-20-Morning', isSelected: false },
    { id: 5, date: '2025-01-20-Morning', isSelected: false },
    { id: 6, date: '2025-01-20-Morning', isSelected: false },
    { id: 7, date: '2025-01-20-Morning', isSelected: false },
  ];

  const paymentHistory = [
    { id: 1, amount: 'Rs. 2000', date: '2025.05.05', isSelected: false },
    { id: 2, amount: 'Rs. 2000', date: '2025.05.05', isSelected: true },
    { id: 3, amount: 'Rs. 2000', date: '2025.05.05', isSelected: false },
    { id: 4, amount: 'Rs. 2000', date: '2025.05.05', isSelected: false },
    { id: 5, amount: 'Rs. 2000', date: '2025.05.05', isSelected: false },
    { id: 6, amount: 'Rs. 2000', date: '2025.05.05', isSelected: false },
  ];

  const menuItems = [
    { id: '1', title: 'Profile', icon: '👤' },
    { id: '2', title: 'Settings', icon: '⚙️' },
    { id: '3', title: 'Log out', icon: '🚪' },
  ];

  const handleBackPress = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

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
    // Handle menu item actions
    switch (item.title) {
      case 'Profile':
        // Navigate to profile
        console.log('Navigate to Profile');
        break;
      case 'Settings':
        // Navigate to settings
        console.log('Navigate to Settings');
         navigation.navigate('OwnerSettings');
        break;
      case 'Log out':
        // Handle logout
        console.log('Log out');
        break;
      default:
        break;
    }
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
          {menuItems.map((item) => (
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
          <Text style={styles.amountText}>Rs. 10000.00</Text>
        </View>

        {/* History Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>History</Text>
          <View style={styles.historyList}>
            {historyData.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.historyItem,
                  item.isSelected && styles.selectedHistoryItem
                ]}
              >
                <Text style={[
                  styles.historyItemText,
                  item.isSelected && styles.selectedHistoryItemText
                ]}>
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

        {/* Payment History Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment History</Text>
          <View style={styles.historyList}>
            {paymentHistory.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.historyItem,
                  item.isSelected && styles.selectedPaymentItem
                ]}
              >
                <Text style={[
                  styles.paymentItemText,
                  item.isSelected && styles.selectedPaymentItemText
                ]}>
                  {item.amount} - {item.date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
  selectedPaymentItem: {
    backgroundColor: '#8B7CF6',
  },
  historyItemText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedHistoryItemText: {
    color: 'white',
  },
  paymentItemText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedPaymentItemText: {
    color: 'white',
  },
  withdrawButton: {
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 30,
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
});

export default WithdrawScreen;