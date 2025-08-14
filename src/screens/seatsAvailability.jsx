import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SideMenu from './components/SideMenu';

// Manual Icons Components
const BackIcon = ({ size = 24, color = "white" }) => (
  <View style={[styles.icon, { width: size, height: size }]}>
    <View style={[styles.backArrow, { borderTopColor: color, borderRightColor: color }]} />
  </View>
);

const MenuIcon = ({ size = 24, color = "white" }) => (
  <View style={[styles.icon, { width: size, height: size }]}>
    <View style={[styles.menuLine, { backgroundColor: color }]} />
    <View style={[styles.menuLine, { backgroundColor: color }]} />
    <View style={[styles.menuLine, { backgroundColor: color }]} />
  </View>
);

const SeatManagerScreen = () => {
  const navigation = useNavigation();
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  
  // Updated seat configuration to match the image (left: 2 seats, right: 3 seats per row + 6 back seats)
  const [seats, setSeats] = useState({
    // Left side seats (2 seats per row - A & B columns)
    'A1': 0, 'B1': 1, 'A2': 0, 'B2': 0, 'A3': 0, 'B3': 0, 'A4': 0, 'B4': 0,
    'A5': 0, 'B5': 0, 'A6': 0, 'B6': 0, 'A7': 0, 'B7': 0, 'A8': 0, 'B8': 0,
    'A9': 0, 'B9': 0, 'A10': 0, 'B10': 1, 'A11': 0, 'B11': 0, 'A12': 0, 'B12': 0,
    'A13': 0, 'B13': 0, 'A14': 0, 'B14': 0, 'A15': 0, 'B15': 0,
    
    // Right side seats (3 seats per row - C, D & E columns)
    'C1': 0, 'D1': 0, 'E1': 0, 'C2': 0, 'D2': 0, 'E2': 0, 'C3': 0, 'D3': 0, 'E3': 0,
    'C4': 0, 'D4': 0, 'E4': 0, 'C5': 0, 'D5': 0, 'E5': 0, 'C6': 0, 'D6': 0, 'E6': 0,
    'C7': 0, 'D7': 0, 'E7': 0, 'C8': 0, 'D8': 0, 'E8': 0, 'C9': 0, 'D9': 0, 'E9': 0,
    'C10': 0, 'D10': 0, 'E10': 0, 'C11': 0, 'D11': 0, 'E11': 0, 'C12': 0, 'D12': 0, 'E12': 0,
    'C13': 0, 'D13': 0, 'E13': 0, 'C14': 0, 'D14': 0, 'E14': 0, 'C15': 0, 'D15': 0, 'E15': 0,
    
    // Back row seats (6 seats in the last row)
    'BACK1': 0, 'BACK2': 0, 'BACK3': 0, 'BACK4': 0, 'BACK5': 0, 'BACK6': 0,
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuPress = () => {
    setIsSideMenuVisible(true);
  };

  const handleCloseSideMenu = () => {
    setIsSideMenuVisible(false);
  };

  const handleSeatPress = (seatId) => {
    setSeats(prevSeats => ({
      ...prevSeats,
      [seatId]: prevSeats[seatId] === 0 ? 1 : 0
    }));
  };

  const handleSave = () => {
    const bookedSeats = Object.keys(seats).filter(seatId => seats[seatId] === 1);
    console.log('Saving booked seats:', bookedSeats);
    // Add your save logic here
  };

  const getSeatStyle = (status) => {
    return status === 1 ? styles.bookedSeat : styles.availableSeat;
  };

  const Seat = ({ seatId, isDouble = false }) => (
    <TouchableOpacity
      style={[
        styles.seat, 
        getSeatStyle(seats[seatId]),
        isDouble && styles.doubleSeat
      ]}
      onPress={() => handleSeatPress(seatId)}
      activeOpacity={0.7}
    />
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
        
        <Text style={styles.headerTitle}>Seat Manager</Text>
        
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={handleMenuPress}
          activeOpacity={0.7}
        >
          <MenuIcon size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Bus Layout Card */}
        <View style={styles.busCard}>
          <ScrollView 
            style={styles.busLayout}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.busLayoutContent}
          >
            {/* Door indicator at front */}
            <View style={styles.doorRow}>
              <View style={styles.door} />
              <View style={styles.doorLines}>
                <View style={styles.doorLine} />
                <View style={styles.doorLine} />
              </View>
            </View>
            
            {/* Driver's area - Right Side */}
            <View style={styles.driverRow}>
              <View style={styles.leftEmpty} />
              <View style={styles.aisle} />
              <View style={styles.driverSide}>
                <View style={styles.driverSeat} />
              </View>
            </View>
            
            {/* Regular seat rows */}
            {Array.from({ length: 15 }, (_, index) => {
              const rowNumber = index + 1;
              return (
                <View key={rowNumber} style={styles.seatRow}>
                  <View style={styles.leftSide}>
                    <View style={styles.leftSeatGroup}>
                      <Seat seatId={`A${rowNumber}`} />
                      <Seat seatId={`B${rowNumber}`} />
                    </View>
                  </View>
                  <View style={styles.aisle} />
                  <View style={styles.rightSide}>
                    <View style={styles.rightSeatGroup}>
                      <Seat seatId={`C${rowNumber}`} />
                      <Seat seatId={`D${rowNumber}`} />
                      <Seat seatId={`E${rowNumber}`} />
                    </View>
                  </View>
                </View>
              );
            })}
            
            {/* Back row with 6 seats */}
            <View style={styles.backRow}>
              <Seat seatId="BACK1" />
              <Seat seatId="BACK2" />
              <Seat seatId="BACK3" />
              <Seat seatId="BACK4" />
              <Seat seatId="BACK5" />
              <Seat seatId="BACK6" />
            </View>
          </ScrollView>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendSeat, styles.availableSeat]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendSeat, styles.bookedSeat]} />
            <Text style={styles.legendText}>Booked</Text>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Side Menu */}
      <SideMenu 
        isVisible={isSideMenuVisible}
        onClose={handleCloseSideMenu}
      />
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
    paddingTop: 20,
  },

  // Bus Card Styles
  busCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 1,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  busLayout: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  busLayoutContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  // Door Styles
  doorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 15,
    paddingRight: 20,
  },
  door: {
    width: 25,
    height: 8,
    backgroundColor: '#666',
    borderRadius: 2,
    marginRight: 10,
  },
  doorLines: {
    flexDirection: 'column',
  },
  doorLine: {
    width: 15,
    height: 1.5,
    backgroundColor: '#777',
    marginVertical: 1,
    borderRadius: 1,
  },

  // Driver's area
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  leftEmpty: {
    flex: 1,
  },
  driverSide: {
    flex: 1.5,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  driverSeat: {
    width: 30,
    height: 20,
    backgroundColor: '#333',
    borderRadius: 4,
  },

  // Back row styles
  backRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },

  // Seat Styles
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  leftSide: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  rightSide: {
    flex: 1.5,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  leftSeatGroup: {
    flexDirection: 'row',
    gap: 5,
  },
  rightSeatGroup: {
    flexDirection: 'row',
    gap: 5,
  },
  aisle: {
    width: 25,
    height: 1,
  },
  seat: {
    width: 28,
    height: 18,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  availableSeat: {
    backgroundColor: '#999',
  },
  bookedSeat: {
    backgroundColor: '#FF3333',
  },

  // Legend Styles
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  legendSeat: {
    width: 20,
    height: 12,
    borderRadius: 2,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },

  // Save Button Styles
  saveButton: {
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
  saveButtonText: {
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

export default SeatManagerScreen;