import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';

const ClientListScreen = ({ navigation }) => {
  const [clients, setClients] = useState([
    { id: '1', name: 'James Carter', status: 'active', phone: '+1234567890' },
    { id: '2', name: 'Emily Johnson', status: 'active', phone: '+1234567891' },
    { id: '3', name: 'Michael Bennett', status: 'inactive', phone: '+1234567892' },
    { id: '4', name: 'Daniel Cooper', status: 'active', phone: '+1234567893' },
    { id: '5', name: 'Sophia Reynolds', status: 'active', phone: '+1234567894' },
    { id: '6', name: 'Benjamin Harris', status: 'inactive', phone: '+1234567895' },
    { id: '7', name: 'Benjamin Harris', status: 'active', phone: '+1234567896' },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  // Filter clients based on search query
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClientPress = (client) => {
    setSelectedClient(client);
    Alert.alert(
      'Client Selected',
      `Selected: ${client.name}\nStatus: ${client.status}\nPhone: ${client.phone}`,
      [
        { text: 'Call', onPress: () => console.log('Calling ' + client.phone) },
        { text: 'Message', onPress: () => console.log('Messaging ' + client.name) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleMenuPress = () => {
    Alert.alert('Menu', 'Menu options here');
  };

  const handleBookmarkPress = () => {
    Alert.alert('Bookmarks', 'Bookmark functionality');
  };

  const handleChatPress = () => {
    Alert.alert('Chat', 'Chat functionality');
  };

  // Manual Icons Components
  const PersonIcon = ({ size = 24, color = "#6B46C1" }) => (
    <View style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 2,
      borderColor: color,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <View style={{
        width: size * 0.4,
        height: size * 0.4,
        borderRadius: size * 0.2,
        backgroundColor: color,
        marginBottom: 2
      }} />
      <View style={{
        width: size * 0.6,
        height: size * 0.3,
        borderRadius: size * 0.15,
        backgroundColor: color,
        position: 'absolute',
        bottom: 4
      }} />
    </View>
  );

  const MenuIcon = ({ size = 24, color = "white" }) => (
    <View style={{ width: size, height: size, justifyContent: 'space-between', paddingVertical: 4 }}>
      <View style={{ width: size, height: 2, backgroundColor: color }} />
      <View style={{ width: size, height: 2, backgroundColor: color }} />
      <View style={{ width: size, height: 2, backgroundColor: color }} />
    </View>
  );

  const BookmarkIcon = ({ size = 24, color = "white" }) => (
    <View style={{
      width: size * 0.7,
      height: size,
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: color,
      borderBottomWidth: 0,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      position: 'relative'
    }}>
      <View style={{
        position: 'absolute',
        bottom: -2,
        left: -2,
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.35,
        borderRightWidth: size * 0.35,
        borderTopWidth: size * 0.3,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
      }} />
    </View>
  );

  const ChatIcon = ({ size = 24, color = "white" }) => (
    <View style={{
      width: size,
      height: size * 0.8,
      borderRadius: size * 0.2,
      borderWidth: 2,
      borderColor: color,
      backgroundColor: 'transparent',
      position: 'relative'
    }}>
      <View style={{
        position: 'absolute',
        bottom: -8,
        left: size * 0.2,
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
      }} />
    </View>
  );

  const SearchIcon = ({ size = 20, color = "#666" }) => (
    <View style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 2,
      borderColor: color,
      position: 'relative'
    }}>
      <View style={{
        position: 'absolute',
        bottom: -6,
        right: -6,
        width: size * 0.3,
        height: 2,
        backgroundColor: color,
        transform: [{ rotate: '45deg' }]
      }} />
    </View>
  );

  const renderClientItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.clientItem,
        selectedClient?.id === item.id && styles.selectedClientItem
      ]}
      onPress={() => handleClientPress(item)}
      activeOpacity={0.7}
      accessible={true}
      accessibilityLabel={`Client ${item.name}, status ${item.status}`}
      accessibilityHint="Tap to view client options"
    >
      <View style={styles.clientInfo}>
        <View style={styles.avatarContainer}>
          <PersonIcon size={24} color="#6B46C1" />
        </View>
        <View style={styles.clientDetails}>
          <Text style={styles.clientName}>{item.name}</Text>
          <Text style={styles.clientStatus}>
            Status: <Text style={[
              styles.statusText,
              { color: item.status === 'active' ? '#10B981' : '#EF4444' }
            ]}>
              {item.status}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.flagContainer}>
        <View style={[
          styles.flag,
          { backgroundColor: item.status === 'active' ? '#10B981' : '#EF4444' }
        ]} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.userSection}>
            <View style={styles.userAvatar}>
              <PersonIcon size={20} color="white" />
            </View>
            <Text style={styles.greeting}>Hi Anjana ,</Text>
          </View>
          <TouchableOpacity>
            <MenuIcon size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <BookmarkIcon size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <ChatIcon size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Client List */}
      <View style={styles.clientSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Clients ({filteredClients.length})</Text>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchIconContainer}>
              <SearchIcon size={16} color="#999" />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search clients..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              accessible={true}
              accessibilityLabel="Search clients"
              accessibilityHint="Type to search for clients"
            />
            {searchQuery ? (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSearchQuery('')}
                accessible={true}
                accessibilityLabel="Clear search"
              >
                <Text style={styles.clearButtonText}>×</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {filteredClients.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No clients found matching your search' : 'No clients available'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredClients}
            renderItem={renderClientItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            accessible={true}
            accessibilityLabel="Client list"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4FC3D7',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  greeting: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIconContainer: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
  },
  clearButton: {
    padding: 5,
    marginLeft: 10,
  },
  clearButtonText: {
    fontSize: 20,
    color: '#999',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  clientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 12,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  selectedClientItem: {
    backgroundColor: '#F0F9FF',
    borderLeftColor: '#4FC3D7',
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  clientStatus: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusText: {
    fontWeight: '600',
  },
  flagContainer: {
    marginLeft: 10,
  },
  flag: {
    width: 8,
    height: 20,
    borderRadius: 4,
  },
});

export default ClientListScreen;