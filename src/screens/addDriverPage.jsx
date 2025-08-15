import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';

const AddDriverToBusScreen = ({ navigation, route }) => {
  const [driverName, setDriverName] = useState('');
  const [driverId, setDriverId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedBus, setSelectedBus] = useState(null);

  // Sample bus data
  const buses = [
    { id: 'BUS-001', number: 'NA-1234', route: 'Colombo-Kandy' },
    { id: 'BUS-002', number: 'NA-5678', route: 'Colombo-Galle' },
    { id: 'BUS-003', number: 'NA-9012', route: 'Kandy-Jaffna' },
  ];

  const handleAssignDriver = () => {
    if (!driverName || !driverId || !phoneNumber || !selectedBus) {
      Alert.alert('Error', 'Please fill all fields and select a bus');
      return;
    }
    
    Alert.alert(
      'Success',
      `Driver ${driverName} assigned to Bus ${selectedBus.number}`,
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A9EAF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assign Driver to Bus</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {/* Driver Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Driver Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Driver Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter driver name"
              value={driverName}
              onChangeText={setDriverName}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Driver ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter driver ID"
              value={driverId}
              onChangeText={setDriverId}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>

        {/* Bus Selection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Bus</Text>
          
          {buses.map((bus) => (
            <TouchableOpacity
              key={bus.id}
              style={[
                styles.busCard,
                selectedBus?.id === bus.id && styles.selectedBusCard
              ]}
              onPress={() => setSelectedBus(bus)}
            >
              <View style={styles.busInfo}>
                <Text style={styles.busNumber}>{bus.number}</Text>
                <Text style={styles.busRoute}>{bus.route}</Text>
              </View>
              {selectedBus?.id === bus.id && (
                <Text style={styles.selectedIcon}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.assignButton}
          onPress={handleAssignDriver}
        >
          <Text style={styles.assignButtonText}>Assign Driver</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4A9EAF',
    paddingVertical: 15,
    paddingHorizontal: 16,
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
  headerRight: {
    width: 40, // To balance the header
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  section: {
    marginBottom: 25,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A9EAF',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  busCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedBusCard: {
    backgroundColor: '#E1F0F7',
    borderColor: '#4A9EAF',
  },
  busInfo: {
    flex: 1,
  },
  busNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E3B5C',
    marginBottom: 3,
  },
  busRoute: {
    fontSize: 14,
    color: '#666',
  },
  selectedIcon: {
    fontSize: 20,
    color: '#4A9EAF',
    marginLeft: 10,
  },
  assignButton: {
    backgroundColor: '#4A9EAF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
    elevation: 3,
  },
  assignButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddDriverToBusScreen;