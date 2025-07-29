import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PanResponder, Animated } from 'react-native';

const BusSeatConfigScreen = () => {
  const [rowCount, setRowCount] = useState(10);
  const [leftSeats, setLeftSeats] = useState(2);
  const [rightSeats, setRightSeats] = useState(2);
  const [reservedSeats, setReservedSeats] = useState(0);
  
  // Drag and drop implementation
  const [pan] = useState(new Animated.ValueXY());
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: pan.x, dy: pan.y }
    ], { useNativeDriver: false }),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false
      }).start();
    }
  });

  const handleSave = () => {
    console.log('Seat Configuration Saved', {
      leftSeats,
      rightSeats,
      rowCount,
      reservedSeats: reservedSeats
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bus Data</Text>

      <View style={styles.configContainer}>
        <View style={styles.seatConfigRow}>
          <Text style={styles.label}>Left Seats</Text>
          <View style={styles.counter}>
            <TouchableOpacity onPress={() => setLeftSeats(Math.max(1, leftSeats - 1))}>
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{leftSeats}</Text>
            <TouchableOpacity onPress={() => setLeftSeats(leftSeats + 1)}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.seatConfigRow}>
          <Text style={styles.label}>Right Seats</Text>
          <View style={styles.counter}>
            <TouchableOpacity onPress={() => setRightSeats(Math.max(1, rightSeats - 1))}>
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{rightSeats}</Text>
            <TouchableOpacity onPress={() => setRightSeats(rightSeats + 1)}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.seatConfigRow}>
          <Text style={styles.label}>Row Count</Text>
          <View style={styles.counter}>
            <TouchableOpacity onPress={() => setRowCount(Math.max(5, rowCount - 1))}>
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{rowCount}</Text>
            <TouchableOpacity onPress={() => setRowCount(rowCount + 1)}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.seatConfigRow}>
          <Text style={styles.label}>Reserved Seat Count</Text>
          <View style={styles.counter}>
            <TouchableOpacity onPress={() => setReservedSeats(Math.max(0, reservedSeats - 1))}>
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{reservedSeats}</Text>
            <TouchableOpacity onPress={() => setReservedSeats(reservedSeats + 1)}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Drag and drop seat preview */}
      <View style={styles.seatPreviewContainer}>
        <Text style={styles.previewTitle}>Seat Layout Preview</Text>
        <Animated.View 
          style={[
            styles.seatLayout,
            { transform: [{ translateX: pan.x }, { translateY: pan.y }] }
          ]}
          {...panResponder.panHandlers}
        >
          {/* Left seats */}
          <View style={styles.seatColumn}>
            {Array(leftSeats).fill().map((_, i) => (
              <View key={`left-${i}`} style={styles.seat} />
            ))}
          </View>
          
          {/* Aisle */}
          <View style={styles.aisle} />
          
          {/* Right seats */}
          <View style={styles.seatColumn}>
            {Array(rightSeats).fill().map((_, i) => (
              <View key={`right-${i}`} style={styles.seat} />
            ))}
          </View>
        </Animated.View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },
  timeText: {
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  configContainer: {
    marginBottom: 30,
  },
  seatConfigRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  counterValue: {
    fontSize: 18,
    marginHorizontal: 10,
    minWidth: 30,
    textAlign: 'center',
  },
  seatPreviewContainer: {
    flex: 1,
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  seatLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  seatColumn: {
    justifyContent: 'space-around',
    height: 200,
  },
  seat: {
    width: 30,
    height: 30,
    backgroundColor: '#4CAF50',
    margin: 5,
    borderRadius: 5,
  },
  aisle: {
    width: 40,
    height: 200,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BusSeatConfigScreen;