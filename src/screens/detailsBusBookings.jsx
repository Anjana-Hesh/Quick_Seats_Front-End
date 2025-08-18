import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MobileMessageInterface({ navigation, route }) {
  // Get bus information from route params if coming from SearchBusScreen
  const busInfo = route?.params || { busId: 'ACD-01-DB', busNumber: 'ACD-01-DB' };

  const handleBackClick = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleBookPress = () => {
    navigation.navigate('BookingDate');
  };

  return (
    <View style={styles.fullContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBackClick} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{busInfo.busNumber || 'ACD-01-DB'}</Text>
          <View style={styles.headerButton} />
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Contact Info Card */}
        <View style={styles.contactInfoCard}>
          <View style={styles.contactInfoRow}>
            <Text style={styles.contactInfoLabel}>Name</Text>
            <Text style={styles.contactInfoValue}>: {busInfo.busNumber || 'ACD-01-DB'}</Text>
          </View>
          <View style={styles.contactInfoRow}>
            <Text style={styles.contactInfoLabel}>Contacts</Text>
            <View style={styles.contactsRow}>
              <Text style={styles.contactInfoValue}>: 070 435 3463</Text>
              <View style={styles.flagIcon}>
                <Text style={styles.flagText}>🇱🇰</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Daily Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Daily</Text>
          <View style={styles.dailyButtons}>
            <TouchableOpacity style={styles.morningButton}>
              <Text style={styles.morningButtonText}>MORNING</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.eveningButton}>
              <Text style={styles.eveningButtonText}>EVENING</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Weekly</Text>
          <View style={styles.weeklyButtons}>
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
              <TouchableOpacity key={day} style={styles.dayButton}>
                <Text style={styles.dayButtonText}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Remaining Seats */}
        <View style={styles.remainingSeatsContainer}>
          <Text style={styles.remainingSeatsText}>Remaining Seats : 10</Text>
        </View>

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBookPress}>
          <Text style={styles.bookButtonText}>Book</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#22D3EE',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  contactInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactInfoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C5F7C',
    width: 80,
  },
  contactInfoValue: {
    fontSize: 16,
    color: '#2C5F7C',
    fontWeight: '500',
    flex: 1,
  },
  contactsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagIcon: {
    marginLeft: 8,
  },
  flagText: {
    fontSize: 16,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C5F7C',
    marginBottom: 15,
  },
  dailyButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  morningButton: {
    backgroundColor: '#22A39F',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    flex: 1,
  },
  morningButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  eveningButton: {
    backgroundColor: '#22A39F',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    flex: 1,
  },
  eveningButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  weeklyButtons: {
    gap: 8,
  },
  dayButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 5,
  },
  dayButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  remainingSeatsContainer: {
    marginBottom: 30,
  },
  remainingSeatsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C5F7C',
  },
  bookButton: {
    backgroundColor: '#374151',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});