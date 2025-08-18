import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  ScrollView,
  StatusBar,
  SafeAreaView,
  Linking
} from 'react-native';

const { width, height } = Dimensions.get('window');

const BookingDetailsScreen = ({ navigation, route }) => {
  const { bookingId } = route.params;
  
  // Sample booking data - you can replace this with actual data fetching
  const [bookingData] = useState({
    busNumber: 'ACD-01-DB',
    name: 'ACD-01-DB',
    contacts: '070 435 4463',
    dailyDetails: [
      { id: 1, date: '2025-01-20-Morning', isSelected: false },
      { id: 2, date: '2025-01-20-Morning', isSelected: true },
      { id: 3, date: '2025-01-20-Morning', isSelected: false },
    ],
    bookings: [
      { id: 1, date: '2025-01-20-Morning', isSelected: false },
      { id: 2, date: '2025-01-20-Morning', isSelected: true },
      { id: 3, date: '2025-01-20-Morning', isSelected: false },
      { id: 4, date: '2025-01-20-Morning', isSelected: false },
      { id: 5, date: '2025-01-20-Morning', isSelected: false },
      { id: 6, date: '2025-01-20-Morning', isSelected: false },
      { id: 7, date: '2025-01-20-Morning', isSelected: false },
    ]
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCallPress = () => {
    Linking.openURL(`tel:${bookingData.contacts}`);
  };

  const handleDailyDetailPress = (itemId) => {
    console.log(`Daily detail ${itemId} pressed`);
    // Add navigation or action logic here
  };

  const handleBookingPress = (itemId) => {
    console.log(`Booking ${itemId} pressed`);
    // Add navigation or action logic here
  };

  const DetailItem = ({ item, onPress, section }) => (
    <TouchableOpacity 
      style={[
        styles.detailItem,
        { backgroundColor: item.isSelected ? '#4F46E5' : '#E5E7EB' }
      ]}
      onPress={() => onPress(item.id)}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.detailText,
        { color: item.isSelected ? 'white' : '#374151' }
      ]}>
        {item.date}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
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
          
          <Text style={styles.headerTitle}>{bookingData.busNumber}</Text>
          
          <View style={styles.placeholder} />
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Bus Information Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoSeparator}>:</Text>
            <Text style={styles.infoValue}>{bookingData.name}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Contacts</Text>
            <Text style={styles.infoSeparator}>:</Text>
            <TouchableOpacity onPress={handleCallPress}>
              <Text style={[styles.infoValue, styles.phoneNumber]}>
                {bookingData.contacts}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.phoneIcon}
              onPress={handleCallPress}
            >
              <Text style={styles.phoneEmoji}>📞</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Details</Text>
          <View style={styles.detailsList}>
            {bookingData.dailyDetails.map((item) => (
              <DetailItem 
                key={item.id} 
                item={item} 
                onPress={handleDailyDetailPress}
                section="daily"
              />
            ))}
          </View>
        </View>

        {/* Bookings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bookings</Text>
          <View style={styles.detailsList}>
            {bookingData.bookings.map((item) => (
              <DetailItem 
                key={item.id} 
                item={item} 
                onPress={handleBookingPress}
                section="bookings"
              />
            ))}
          </View>
        </View>

        {/* Bottom padding */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#14B8A6',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 20,
  },
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: StatusBar.currentHeight || 0,
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
  placeholder: {
    width: 35,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    width: 80,
  },
  infoSeparator: {
    fontSize: 16,
    color: '#1F2937',
    marginHorizontal: 10,
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  phoneNumber: {
    color: '#14B8A6',
    fontWeight: '500',
  },
  phoneIcon: {
    marginLeft: 10,
    padding: 5,
  },
  phoneEmoji: {
    fontSize: 18,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 15,
  },
  detailsList: {
    gap: 8,
  },
  detailItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  detailText: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default BookingDetailsScreen;