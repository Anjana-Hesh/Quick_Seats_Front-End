import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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

export default function MobileMessageInterface({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');

  const contacts = [
    {
      id: 'ACD-01-DB',
      name: 'Kamal Perera',
      message:
        'Hello there, I need more information about the project details...',
      time: '2:30 PM',
      unread: true,
      phone: '070 435 3463',
    },
    {
      id: 'ACD-02-DB',
      name: 'Nimal Silva',
      message: 'Can we schedule a meeting for tomorrow?',
      time: '1:45 PM',
      unread: false,
      phone: '071 567 8901',
    },
    {
      id: 'ACD-03-DB',
      name: 'Sunil Fernando',
      message: 'Thanks for the update. Everything looks good.',
      time: '12:20 PM',
      unread: true,
      phone: '077 234 5678',
    },
    {
      id: 'ACD-04-DB',
      name: 'Amara Jayasinghe',
      message: 'Please send me the document when you get a chance.',
      time: '11:15 AM',
      unread: false,
      phone: '075 345 6789',
    },
    {
      id: 'ACD-05-DB',
      name: 'Ruwan Kumara',
      message: 'Great work on the presentation today!',
      time: '10:30 AM',
      unread: true,
      phone: '078 456 7890',
    },
    {
      id: 'ACD-06-DB',
      name: 'Chaminda Rathnayake',
      message: 'Could you clarify the requirements?',
      time: '9:45 AM',
      unread: false,
      phone: '072 567 8901',
    },
    {
      id: 'ACD-07-DB',
      name: 'Priyanka Mendis',
      message: 'The system is working perfectly now.',
      time: 'Yesterday',
      unread: false,
      phone: '076 678 9012',
    },
    {
      id: 'ACD-08-DB',
      name: 'Lasantha Wickramasinghe',
      message: 'Let me know if you need any assistance.',
      time: 'Yesterday',
      unread: true,
      phone: '074 789 0123',
    },
  ];

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleContactClick = contact => {
    navigation.navigate('MessageInbox', {
      contactId: contact.id,
      contactName: contact.name,
      contactPhone: contact.phone,
    });
  };

  const handleBackClick = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.fullContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={handleBackClick}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Send Message</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>⋯</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Contact List */}
      <ScrollView
        style={styles.contactList}
        contentContainerStyle={styles.contactListContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredContacts.map(contact => (
          <TouchableOpacity
            key={contact.id}
            onPress={() => handleContactClick(contact)}
            style={styles.contactItem}
            activeOpacity={0.7}
          >
            <View style={styles.contactInfo}>
              <View style={styles.avatarContainer}>
                <View style={styles.contactAvatar}>
                  <Text style={styles.contactAvatarText}>👤</Text>
                </View>
                {contact.unread && <View style={styles.unreadBadge} />}
              </View>

              <View style={styles.contactDetails}>
                <View style={styles.contactHeader}>
                  <Text style={styles.contactId}>{contact.id}</Text>
                  <Text style={styles.contactTime}>{contact.time}</Text>
                </View>
                <Text style={styles.contactNameText}>{contact.name}</Text>
                <Text style={styles.contactMessage} numberOfLines={1}>
                  {contact.message}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.deleteIcon}>
              <Text style={styles.deleteIconText}>🗑️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  contactList: {
    flex: 1,
  },
  contactListContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactAvatarText: {
    fontSize: 22,
  },
  unreadBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EF4444',
  },
  contactDetails: {
    flex: 1,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  contactTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  contactNameText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  contactMessage: {
    fontSize: 12,
    color: '#6B7280',
  },
  deleteIcon: {
    padding: 8,
  },
  deleteIconText: {
    fontSize: 16,
  },
});
