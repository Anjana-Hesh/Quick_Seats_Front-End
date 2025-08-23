import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';

const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getLocalDataTime() {
  try {
    const data = await AsyncStorage.getItem('selectedRoute');
    if (data !== null) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.log('Error reading route:', error);
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

const BusDataScreen = ({ navigation }) => {
  const [busLayout, setBusLayout] = useState([]);
  const [selectedSeatType, setSelectedSeatType] = useState('1');
  const [isDragging, setIsDragging] = useState(false);

  const seatTypes = [
    { id: '1', name: '1', seats: 1 },
    { id: '2', name: '2', seats: 2 },
    { id: '3', name: '3', seats: 3 },
    { id: 'side', name: 'Side Seat', seats: 1 },
  ];

  const handleSeatTypeSelect = type => {
    setSelectedSeatType(type);
  };

  const addSeatToBus = (x, y) => {
    const selectedType = seatTypes.find(type => type.id === selectedSeatType);
    const newSeat = {
      id: Date.now() + Math.random(),
      type: selectedSeatType,
      name: selectedType.name,
      seats: selectedType.seats,
      x: x,
      y: y,
    };
    setBusLayout([...busLayout, newSeat]);
  };

  const removeSeat = seatId => {
    Alert.alert('Remove Seat', 'Are you sure you want to remove this seat?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setBusLayout(busLayout.filter(seat => seat.id !== seatId));
        },
      },
    ]);
  };

  const SeatIcon = ({ type, seats, isInBus = false, onPress }) => {
    const getSeatStyle = () => {
      switch (type) {
        case '1':
          return [styles.seatIcon, styles.singleSeat];
        case '2':
          return [styles.seatIcon, styles.doubleSeat];
        case '3':
          return [styles.seatIcon, styles.tripleSeat];
        case 'side':
          return [styles.seatIcon, styles.sideSeat];
        default:
          return [styles.seatIcon, styles.singleSeat];
      }
    };

    const renderSeatBoxes = () => {
      const boxes = [];
      for (let i = 0; i < seats; i++) {
        boxes.push(
          <View key={i} style={[styles.seatBox, i > 0 && { marginLeft: 2 }]} />,
        );
      }
      return boxes;
    };

    return (
      <TouchableOpacity
        style={getSeatStyle()}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.seatContainer}>{renderSeatBoxes()}</View>
        {isInBus && (
          <Text style={styles.seatLabel}>{type === 'side' ? 'S' : seats}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const handleBusAreaPress = event => {
    const { locationX, locationY } = event.nativeEvent;
    // Add some boundary checks
    if (
      locationX > 10 &&
      locationX < width * 0.7 - 50 &&
      locationY > 50 &&
      locationY < height * 0.35 - 50
    ) {
      addSeatToBus(locationX, locationY);
    }
  };

  const handleSave = () => {
    if (busLayout.length === 0) {
      Alert.alert(
        'No Seats',
        'Please add some seats to the bus layout before saving.',
      );
      return;
    }

    Alert.alert(
      'Save Layout',
      `Save bus layout with ${busLayout.length} seats?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: () => {
            console.log('Bus layout saved:', busLayout);
            navigation.goBack();
          },
        },
      ],
    );
  };

  const clearLayout = () => {
    if (busLayout.length === 0) return;

    Alert.alert('Clear Layout', 'Are you sure you want to remove all seats?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear All',
        style: 'destructive',
        onPress: () => setBusLayout([]),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      {/* Header with gradient background */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bus Data</Text>
      </View>

      {/* Main Content */}
      <View style={styles.contentCard}>
        {/* Seat Type Selector */}
        <View style={styles.seatTypeContainer}>
          {seatTypes.map(type => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.seatTypeButton,
                selectedSeatType === type.id && styles.seatTypeButtonSelected,
              ]}
              onPress={() => handleSeatTypeSelect(type.id)}
            >
              <Text
                style={[
                  styles.seatTypeText,
                  selectedSeatType === type.id && styles.seatTypeTextSelected,
                ]}
              >
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Instruction */}
        <Text style={styles.instructionText}>
          Select a seat type above, then tap anywhere in the bus area to add
          seats
        </Text>

        {/* Available Seat Icons for Reference */}
        <Text style={styles.sectionTitle}>Available Seat Types</Text>
        <View style={styles.availableSeatsContainer}>
          {seatTypes.map(type => (
            <View key={type.id} style={styles.availableSeatItem}>
              <SeatIcon type={type.id} seats={type.seats} />
              <Text style={styles.availableSeatLabel}>{type.name}</Text>
            </View>
          ))}
        </View>

        {/* Bus Layout Area */}
        <View style={styles.busLayoutArea}>
          <Text style={styles.layoutTitle}>
            Bus Layout ({busLayout.length} seats)
          </Text>
          <TouchableOpacity
            style={styles.busContainer}
            onPress={handleBusAreaPress}
            activeOpacity={1}
          >
            {/* Bus outline */}
            <View style={styles.busOutline}>
              {/* Driver area */}
              <View style={styles.driverArea}>
                <View style={styles.steeringWheel} />
                <Text style={styles.driverLabel}>Driver</Text>
              </View>

              {/* Seat placement area */}
              <View style={styles.seatPlacementArea}>
                {busLayout.map(seat => (
                  <View
                    key={seat.id}
                    style={[styles.placedSeat, { left: seat.x, top: seat.y }]}
                  >
                    <SeatIcon
                      type={seat.type}
                      seats={seat.seats}
                      isInBus={true}
                      onPress={() => removeSeat(seat.id)}
                    />
                  </View>
                ))}
              </View>

              {/* Bus entrance */}
              <View style={styles.busEntrance}>
                <Text style={styles.entranceLabel}>Entrance</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Instructions */}
          <Text style={styles.instructions}>
            • Tap in the bus area to add the selected seat type{'\n'}• Tap on
            placed seats to remove them{'\n'}• Selected seat type:{' '}
            <Text style={styles.selectedType}>
              {seatTypes.find(s => s.id === selectedSeatType)?.name}
            </Text>
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.clearButton} onPress={clearLayout}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Layout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    height: height * 0.12,
    backgroundColor: '#14B8A6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    marginRight: 15,
  },
  backArrow: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  contentCard: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -15,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
  },
  seatTypeContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 8,
  },
  seatTypeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  seatTypeButtonSelected: {
    backgroundColor: '#14B8A6',
    borderColor: '#0F766E',
  },
  seatTypeText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  seatTypeTextSelected: {
    color: 'white',
    fontWeight: '700',
  },
  instructionText: {
    fontSize: 12,
    color: '#059669',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 10,
    fontWeight: '600',
  },
  availableSeatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
  },
  availableSeatItem: {
    alignItems: 'center',
  },
  availableSeatLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 5,
  },
  seatIcon: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 2,
  },
  singleSeat: {
    width: 35,
    height: 30,
    backgroundColor: '#10B981',
  },
  doubleSeat: {
    width: 45,
    height: 30,
    backgroundColor: '#3B82F6',
  },
  tripleSeat: {
    width: 55,
    height: 30,
    backgroundColor: '#8B5CF6',
  },
  sideSeat: {
    width: 30,
    height: 35,
    backgroundColor: '#F59E0B',
  },
  seatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatBox: {
    width: 12,
    height: 18,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 2,
  },
  seatLabel: {
    position: 'absolute',
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  busLayoutArea: {
    marginBottom: 20,
  },
  layoutTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 15,
    color: '#1F2937',
    textAlign: 'center',
  },
  busContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  busOutline: {
    width: width * 0.75,
    height: height * 0.35,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 15,
    position: 'relative',
    borderWidth: 3,
    borderColor: '#9CA3AF',
  },
  driverArea: {
    position: 'absolute',
    top: 15,
    right: 15,
    alignItems: 'center',
  },
  steeringWheel: {
    width: 25,
    height: 25,
    backgroundColor: '#374151',
    borderRadius: 12,
    marginBottom: 5,
  },
  driverLabel: {
    fontSize: 8,
    color: '#6B7280',
    fontWeight: '500',
  },
  busEntrance: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    marginLeft: -20,
    alignItems: 'center',
  },
  entranceLabel: {
    fontSize: 8,
    color: '#6B7280',
    fontWeight: '500',
  },
  seatPlacementArea: {
    flex: 1,
    position: 'relative',
    marginTop: 30,
  },
  placedSeat: {
    position: 'absolute',
  },
  instructions: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 11,
    lineHeight: 16,
  },
  selectedType: {
    fontWeight: 'bold',
    color: '#059669',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 2,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#1E293B',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BusDataScreen;
