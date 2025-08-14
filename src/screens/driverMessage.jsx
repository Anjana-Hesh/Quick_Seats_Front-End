import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
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

const SearchIcon = ({ size = 20, color = "#999" }) => (
  <View style={[styles.searchIconContainer, { width: size, height: size }]}>
    <View style={[styles.searchCircle, { borderColor: color }]} />
    <View style={[styles.searchHandle, { backgroundColor: color }]} />
  </View>
);

const PersonIcon = ({ size = 24, color = "#6B4E99" }) => (
  <View style={[styles.personIconContainer, { width: size, height: size }]}>
    <View style={[styles.personHead, { borderColor: color }]} />
    <View style={[styles.personBody, { borderColor: color }]} />
  </View>
);

const DeleteIcon = ({ size = 20, color = "#6B4E99" }) => (
  <View style={[styles.deleteIconContainer, { width: size, height: size }]}>
    <View style={[styles.deleteCan, { borderColor: color }]} />
    <View style={[styles.deleteTop, { backgroundColor: color }]} />
    <View style={[styles.deleteLine1, { backgroundColor: color }]} />
    <View style={[styles.deleteLine2, { backgroundColor: color }]} />
  </View>
);

const SendMessageScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

  const contacts = [
    { 
      id: 1, 
      name: 'James Carter', 
      message: 'Hello there, I need more information about the...' 
    },
    { 
      id: 2, 
      name: 'Emily Johnson', 
      message: 'Hello there, I need more information about the...' 
    },
    { 
      id: 3, 
      name: 'Michael Bennett', 
      message: 'Hello there, I need more information about the...' 
    },
    { 
      id: 4, 
      name: 'Olivia Thompson', 
      message: 'Hello there, I need more information about the...' 
    },
    { 
      id: 5, 
      name: 'Daniel Cooper', 
      message: 'Hello there, I need more information about the...' 
    },
    { 
      id: 6, 
      name: 'Sophia Reynolds', 
      message: 'Hello there, I need more information about the...' 
    },
    { 
      id: 7, 
      name: 'Benjamin Harris', 
      message: 'Hello there, I need more information about the...' 
    },
    { 
      id: 8, 
      name: 'Benjamin Harris', 
      message: 'Hello there, I need more information about the...' 
    },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuPress = () => {
    setIsSideMenuVisible(true);
  };

  const handleCloseSideMenu = () => {
    setIsSideMenuVisible(false);
  };

  const handleContactPress = (contact) => {
    // Navigate to chat screen or message details
    navigation.navigate('MessageInbox', { contact });
  };

  const handleDeleteContact = (contactId) => {
    // Add delete functionality here
    console.log('Delete contact:', contactId);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const ContactItem = ({ contact }) => (
    <TouchableOpacity 
      style={styles.contactItem}
      onPress={() => handleContactPress(contact)}
      activeOpacity={0.7}
    >
      <View style={styles.contactInfo}>
        <View style={styles.contactIcon}>
          <PersonIcon size={24} color="#6B4E99" />
        </View>
        
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactMessage} numberOfLines={2}>
            {contact.message}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => handleDeleteContact(contact.id)}
        activeOpacity={0.7}
      >
        <DeleteIcon size={20} color="#6B4E99" />
      </TouchableOpacity>
    </TouchableOpacity>
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
        
        <Text style={styles.headerTitle}>Send Message</Text>
        
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={handleMenuPress}
          activeOpacity={0.7}
        >
          <MenuIcon size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <SearchIcon size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Contacts List */}
      <ScrollView 
        style={styles.contactsList} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contactsContent}
      >
        {filteredContacts.map((contact) => (
          <ContactItem
            key={`${contact.id}-${contact.name}`}
            contact={contact}
          />
        ))}
        
        {filteredContacts.length === 0 && searchText.length > 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No contacts found</Text>
          </View>
        )}
      </ScrollView>

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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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

  // Search Styles
  searchSection: {
    backgroundColor: '#4A9BB8',
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: -20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },

  // Contacts List Styles
  contactsList: {
    flex: 1,
  },
  contactsContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  contactItem: {
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    justifyContent: 'space-between',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIcon: {
    marginRight: 12,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A9BB8',
    marginBottom: 4,
  },
  contactMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 12,
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
  
  // Search Icon
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
  },
  searchHandle: {
    width: 6,
    height: 2,
    borderRadius: 1,
    position: 'absolute',
    bottom: 2,
    right: 2,
    transform: [{ rotate: '45deg' }],
  },

  // Person Icon
  personIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  personHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    marginBottom: 2,
  },
  personBody: {
    width: 12,
    height: 8,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderWidth: 2,
    borderBottomWidth: 0,
  },

  // Delete Icon (Trash Can)
  deleteIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteCan: {
    width: 14,
    height: 16,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderRadius: 2,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  deleteTop: {
    position: 'absolute',
    top: -2,
    width: 16,
    height: 2,
    borderRadius: 1,
  },
  deleteLine1: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 1,
    height: 8,
    borderRadius: 0.5,
  },
  deleteLine2: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 1,
    height: 8,
    borderRadius: 0.5,
  },

  // No Results
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});

export default SendMessageScreen;