import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getLocalDataTime() {
  try {
    const data = await AsyncStorage.getItem('selectedRoute');
    if (data !== null) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.log('Error reading rout:', error);
  }
}

// connection
async function connection(url, method) {
  const response = fetch(url, {
    method: { method },
    headers: {
      'content-Type': 'application/json',
      Authorization: '',
    },
    body: JSON.stringify(),
  });

  if (!(await response).ok) {
    throw new Error('Error');
  }

  const data = (await response).json();
  Alert.alert('Success');
  return data;
}

// Manual Icons Components
const BackIcon = ({ size = 24, color = 'white' }) => (
  <View style={[styles.icon, { width: size, height: size }]}>
    <View
      style={[
        styles.backArrow,
        { borderTopColor: color, borderRightColor: color },
      ]}
    />
  </View>
);

const MenuIcon = ({ size = 24, color = 'white' }) => (
  <View style={[styles.icon, { width: size, height: size }]}>
    <View style={[styles.menuLine, { backgroundColor: color }]} />
    <View style={[styles.menuLine, { backgroundColor: color }]} />
    <View style={[styles.menuLine, { backgroundColor: color }]} />
  </View>
);

const DriverBookingDataScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Get booking data from navigation params or use default
  const bookingData = route.params?.bookingData || {
    name: 'James Carter',
    date: 'Sun-02-02',
  };

  const [selectedBooking, setSelectedBooking] = useState(1); // Index 1 is selected by default

  // Sample booking slots data
  const bookingSlots = [
    { id: 0, date: '2025-01-20-Morning', isSelected: false },
    { id: 1, date: '2025-01-20-Morning', isSelected: true },
    { id: 2, date: '2025-01-20-Morning', isSelected: false },
    { id: 3, date: '2025-01-20-Morning', isSelected: false },
    { id: 4, date: '2025-01-20-Morning', isSelected: false },
    { id: 5, date: '2025-01-20-Morning', isSelected: false },
    { id: 6, date: '2025-01-20-Morning', isSelected: false },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const handleBookingSlotPress = slotId => {
    setSelectedBooking(slotId);
  };

  const handleCompletePress = () => {
    const selectedSlot = bookingSlots.find(slot => slot.id === selectedBooking);
    console.log('Completing booking:', selectedSlot);
    // Add your completion logic here
    // navigation.navigate('CompletedBooking', { selectedSlot });
  };

  const BookingSlot = ({ slot, isSelected, onPress }) => (
    <TouchableOpacity
      style={[styles.bookingSlot, isSelected && styles.selectedBookingSlot]}
      onPress={() => onPress(slot.id)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.bookingSlotText,
          isSelected && styles.selectedBookingSlotText,
        ]}
      >
        {slot.date}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4A9BB8" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <BackIcon size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{bookingData.name}</Text>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleMenuPress}
          activeOpacity={0.7}
        >
          <MenuIcon size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Driver Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoColon}>:</Text>
            <Text style={styles.infoValue}>{bookingData.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Contacts</Text>
            <Text style={styles.infoColon}>:</Text>
            <Text style={styles.infoValue}>070 435 3463</Text>
          </View>
        </View>

        {/* Bookings Section */}
        <View style={styles.bookingsSection}>
          <Text style={styles.bookingsTitle}>Bookings</Text>

          <View style={styles.bookingSlots}>
            {bookingSlots.map(slot => (
              <BookingSlot
                key={slot.id}
                slot={slot}
                isSelected={selectedBooking === slot.id}
                onPress={handleBookingSlotPress}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Complete Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleCompletePress}
          activeOpacity={0.8}
        >
          <Text style={styles.completeButtonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // Header Styles
  header: {
    backgroundColor: '#4A9BB8',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'left',
    marginLeft: 16,
  },

  // Content Styles
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Info Card Styles
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    width: 80,
  },
  infoColon: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 8,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },

  // Bookings Section Styles
  bookingsSection: {
    marginTop: 20,
    marginBottom: 100, // Space for bottom button
  },
  bookingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A9BB8',
    marginBottom: 16,
  },
  bookingSlots: {
    gap: 8,
  },
  bookingSlot: {
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  selectedBookingSlot: {
    backgroundColor: '#6B4E99',
  },
  bookingSlotText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'left',
  },
  selectedBookingSlotText: {
    color: 'white',
  },

  // Bottom Section Styles
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  completeButton: {
    backgroundColor: '#4A4A6A',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  // Manual Icon Styles
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Back Arrow Icon
  backArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '225deg' }],
    marginLeft: 2,
  },

  // Menu Icon (Hamburger)
  menuLine: {
    width: 18,
    height: 2,
    marginVertical: 2,
    borderRadius: 1,
  },
});

export default DriverBookingDataScreen;
