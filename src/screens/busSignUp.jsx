import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  ScrollView,
  Alert
} from 'react-native';

const { width, height } = Dimensions.get('window');

const BusFormScreen = ({ navigation }) => {
  const [busName, setBusName] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  const handleSave = () => {
    // Validation
    if (!busName.trim()) {
      Alert.alert('Validation Error', 'Please enter bus name');
      return;
    }
    if (!busNumber.trim()) {
      Alert.alert('Validation Error', 'Please enter bus number');
      return;
    }
    if (!startLocation.trim()) {
      Alert.alert('Validation Error', 'Please enter start location');
      return;
    }
    if (!endLocation.trim()) {
      Alert.alert('Validation Error', 'Please enter end location');
      return;
    }

    const busData = {
      busName: busName.trim(),
      busNumber: busNumber.trim(),
      startLocation: startLocation.trim(),
      endLocation: endLocation.trim(),
    };

    Alert.alert(
      'Save Bus Information',
      `Save bus details for ${busName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: () => {
            console.log('Bus data saved:', busData);
            // Add your save logic here
            // navigation.navigate('NextScreen', { busData });
            Alert.alert('Success', 'Bus information saved successfully!');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <View style={styles.gradientBackground} />
      
      {/* Main Content Card */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentCard}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Title */}
        <Text style={styles.title}>Bus</Text>
        
        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Bus Name"
              placeholderTextColor="#0F766E"
              value={busName}
              onChangeText={setBusName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Bus Number"
              placeholderTextColor="#0F766E"
              value={busNumber}
              onChangeText={setBusNumber}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Start Location"
              placeholderTextColor="#0F766E"
              value={startLocation}
              onChangeText={setStartLocation}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="End Location"
              placeholderTextColor="#0F766E"
              value={endLocation}
              onChangeText={setEndLocation}
              autoCapitalize="words"
            />
          </View>

          {/* Additional Notes Field */}
          <View style={styles.inputGroup}>
            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="Additional Notes (Optional)"
              placeholderTextColor="#0F766E"
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
            />
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

        {/* Additional Actions */}
        <View style={styles.additionalActions}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.35,
    backgroundColor: '#3B82F6',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  scrollView: {
    flex: 1,
    marginTop: height * 0.08,
  },
  contentCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 50,
    minHeight: height * 0.95,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: -1,
  },
  formContainer: {
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    height: 55,
    borderColor: '#E5E7EB',
    borderWidth: 1.5,
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#1F2937',
    fontWeight: '500',
  },
  notesInput: {
    height: 100,
    paddingTop: 15,
  },
  saveButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#1E293B',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  additionalActions: {
    alignItems: 'center',
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BusFormScreen;