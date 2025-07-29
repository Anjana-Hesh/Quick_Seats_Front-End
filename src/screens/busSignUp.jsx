import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const BusInfoScreen = ({ navigation }) => {
  const [busData, setBusData] = useState({
    busName: '',
    busNumber: '',
    startLocation: '',
    endLocation: ''
  });

  const handleInputChange = (name, value) => {
    setBusData({
      ...busData,
      [name]: value
    });
  };

  const handleSave = () => {
    console.log('Bus Data:', busData);
    // Add your save logic here
  };

  return (
    <View style={styles.container}>
      {/* Time display at top right */}
      <Text style={styles.timeText}> BUS </Text>
      
      {/* Form container */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Bus Name"
          placeholderTextColor={'#032549ff'}
          value={busData.busName}
          onChangeText={(text) => handleInputChange('busName', text)}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Bus Number"
          placeholderTextColor={'#032549ff'}
          value={busData.busNumber}
          onChangeText={(text) => handleInputChange('busNumber', text)}
          keyboardType="numeric"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Start Location"
          placeholderTextColor={'#032549ff'}
          value={busData.startLocation}
          onChangeText={(text) => handleInputChange('startLocation', text)}
        />
        
        <TextInput
          style={styles.input}
          placeholder="End Location"
          placeholderTextColor={'#032549ff'}
          value={busData.endLocation}
          onChangeText={(text) => handleInputChange('endLocation', text)}
        />
      </View>
      
      {/* Save button */}
      <TouchableOpacity style={styles.button}
    //    onPress={handleSave}
        onPress={() => navigation.navigate('BusData')}
       >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  timeText: {
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 30,
    color: '#333',
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BusInfoScreen;