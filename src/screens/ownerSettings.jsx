import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

const SettingsScreen = ({ navigation }) => {
  const [driverRoles, setDriverRoles] = useState([
    'Driver123@gmail.com',
    'Driver123@gmail.com',
    'Driver123@gmail.com',
  ]);

  const [userDetails, setUserDetails] = useState({
    name: 'Anjana Heshan',
    email: 'OverBus12@gmail.com',
    phone: '0706543576',
  });

  const addDriverRole = () => {
    setDriverRoles([...driverRoles, 'Driver123@gmail.com']);
  };

  const removeDriverRole = index => {
    const newRoles = driverRoles.filter((_, i) => i !== index);
    setDriverRoles(newRoles);
  };

  const handleSave = () => {
    Alert.alert('Success', 'Changes saved successfully!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A9EAF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Driver Roles Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Driver Roles</Text>

          {driverRoles.map((email, index) => (
            <View key={index} style={styles.driverRoleItem}>
              <Text style={styles.driverEmail}>{email}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeDriverRole(index)}
              >
                <Icon name="close" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addButton}
            onPress={addDriverRole}
            activeOpacity={0.7}
          >
            <Icon name="add" size={24} color="#4A9EAF" />
            <Text style={styles.addButtonText}>Add Driver</Text>
          </TouchableOpacity>
        </View>

        {/* Change User Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Change User Details</Text>

          {/* User Name */}
          <View style={styles.detailItem}>
            <View style={styles.detailLeft}>
              <View style={[styles.avatar, styles.avatarActive]}>
                <Icon name="person" size={20} color="#4A9EAF" />
              </View>
              <TextInput
                style={styles.detailText}
                value={userDetails.name}
                onChangeText={text =>
                  setUserDetails({ ...userDetails, name: text })
                }
                placeholder="Full Name"
              />
            </View>
            <Icon name="check" size={20} color="#4A9EAF" />
          </View>

          {/* Email */}
          <View style={styles.detailItem}>
            <View style={styles.detailLeft}>
              <View style={styles.avatar}>
                <Icon name="email" size={20} color="#4A9EAF" />
              </View>
              <TextInput
                style={styles.detailText}
                value={userDetails.email}
                onChangeText={text =>
                  setUserDetails({ ...userDetails, email: text })
                }
                keyboardType="email-address"
                placeholder="Email Address"
              />
            </View>
            <Icon name="check" size={20} color="#4A9EAF" />
          </View>

          {/* Phone Number */}
          <View style={styles.detailItem}>
            <View style={styles.detailLeft}>
              <View style={styles.avatar}>
                <Icon name="phone" size={20} color="#4A9EAF" />
              </View>
              <TextInput
                style={styles.detailText}
                value={userDetails.phone}
                onChangeText={text =>
                  setUserDetails({ ...userDetails, phone: text })
                }
                keyboardType="phone-pad"
                placeholder="Phone Number"
              />
            </View>
            <Icon name="check" size={20} color="#4A9EAF" />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A9EAF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#4A9EAF',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  driverRoleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  driverEmail: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  removeButton: {
    padding: 4,
    marginLeft: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F4F4',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#4A9EAF',
  },
  addButtonText: {
    color: '#4A9EAF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F4F4',
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarActive: {
    borderWidth: 2,
    borderColor: '#4A9EAF',
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    paddingVertical: 0,
    paddingRight: 8,
  },
  saveButton: {
    backgroundColor: '#4A9EAF',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;
