import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MobileMessageInterface({ navigation }) {
  const [currentScreen, setCurrentScreen] = useState('messageList');
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const contacts = [
    {
      id: 'ACD-01-DB',
      name: 'Kamal Perera',
      message: 'Hello there, I need more information about the project details...',
      time: '2:30 PM',
      unread: true,
      phone: '070 435 3463'
    },
    {
      id: 'ACD-02-DB',
      name: 'Nimal Silva',
      message: 'Can we schedule a meeting for tomorrow?',
      time: '1:45 PM',
      unread: false,
      phone: '071 567 8901'
    },
    {
      id: 'ACD-03-DB',
      name: 'Sunil Fernando',
      message: 'Thanks for the update. Everything looks good.',
      time: '12:20 PM',
      unread: true,
      phone: '077 234 5678'
    },
    {
      id: 'ACD-04-DB',
      name: 'Amara Jayasinghe',
      message: 'Please send me the document when you get a chance.',
      time: '11:15 AM',
      unread: false,
      phone: '075 345 6789'
    },
    {
      id: 'ACD-05-DB',
      name: 'Ruwan Kumara',
      message: 'Great work on the presentation today!',
      time: '10:30 AM',
      unread: true,
      phone: '078 456 7890'
    },
    {
      id: 'ACD-06-DB',
      name: 'Chaminda Rathnayake',
      message: 'Could you clarify the requirements?',
      time: '9:45 AM',
      unread: false,
      phone: '072 567 8901'
    },
    {
      id: 'ACD-07-DB',
      name: 'Priyanka Mendis',
      message: 'The system is working perfectly now.',
      time: 'Yesterday',
      unread: false,
      phone: '076 678 9012'
    },
    {
      id: 'ACD-08-DB',
      name: 'Lasantha Wickramasinghe',
      message: 'Let me know if you need any assistance.',
      time: 'Yesterday',
      unread: true,
      phone: '074 789 0123'
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setCurrentScreen('bookingDetails');
  };

  const handleBackClick = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      setCurrentScreen('messageList');
      setSelectedContact(null);
    }
  };

  const handleMessageIconClick = () => {
    // console.log('Redirecting to MessageInbox page...');
    navigation.navigate('MessageInbox');
  };

  // Booking Details Screen
  if (currentScreen === 'bookingDetails' && selectedContact) {
    return (
      <View style={styles.fullContainer}>
        {/* Header */}
        <View style={styles.headerBooking}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={handleBackClick} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitleBooking}>{selectedContact.id}</Text>
            <TouchableOpacity onPress={handleMessageIconClick} style={styles.messageIconButton}>
              <Text style={styles.messageIconText}>💬</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView 
          style={styles.bookingScrollContainer}
          contentContainerStyle={styles.bookingScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Contact Info Card */}
          <View style={styles.contactInfoCard}>
            <View style={styles.contactInfoRow}>
              <Text style={styles.contactInfoLabel}>Name</Text>
              <Text style={styles.contactInfoValue}>: {selectedContact.name}</Text>
            </View>
            <View style={styles.contactInfoRow}>
              <Text style={styles.contactInfoLabel}>Contacts</Text>
              <View style={styles.contactsRow}>
                <Text style={styles.contactInfoValue}>: {selectedContact.phone}</Text>
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
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // Message List Screen
  return (
    <View style={styles.fullContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBackClick} style={styles.headerButton}>
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
        {filteredContacts.map((contact) => (
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
  headerBooking: {
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
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  messageIconButton: {
    padding: 8,
    borderRadius: 20,
  },
  messageIconText: {
    fontSize: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  headerTitleBooking: {
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
  bookingScrollContainer: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  bookingScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  contactInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactInfoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    width: 80,
  },
  contactInfoValue: {
    fontSize: 16,
    color: '#111827',
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
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  dailyButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  morningButton: {
    backgroundColor: '#0891B2',
    paddingVertical: 12,
    paddingHorizontal: 24,
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
    backgroundColor: '#0891B2',
    paddingVertical: 12,
    paddingHorizontal: 24,
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
    marginBottom: 4,
  },
  dayButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  remainingSeatsContainer: {
    marginBottom: 24,
  },
  remainingSeatsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  bookButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 40,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});