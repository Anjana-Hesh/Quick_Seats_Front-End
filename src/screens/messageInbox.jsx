import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, TextInput, Alert } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ChatInterface({ navigation }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Thank you",
      sender: "user",
      time: "2:30 PM",
      selected: false
    },
    {
      id: 2,
      text: "I need the details about the route and other details about the bus",
      sender: "user", 
      time: "2:31 PM",
      selected: false
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleBackClick = () => {
    if (selectionMode) {
      cancelSelection();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        selected: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const toggleMessageSelection = (id) => {
    const updatedMessages = messages.map(msg => 
      msg.id === id ? {...msg, selected: !msg.selected} : msg
    );
    setMessages(updatedMessages);
    
    const count = updatedMessages.filter(msg => msg.selected).length;
    setSelectedCount(count);
    if (count > 0 && !selectionMode) {
      setSelectionMode(true);
    } else if (count === 0) {
      setSelectionMode(false);
    }
  };

  const deleteSelectedMessages = () => {
    Alert.alert(
      "Delete Messages",
      "Are you sure you want to delete the selected messages?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            setMessages(messages.filter(msg => !msg.selected));
            setSelectionMode(false);
            setSelectedCount(0);
          }
        }
      ]
    );
  };

  const selectAllMessages = () => {
    const allSelected = messages.every(msg => msg.selected);
    const updatedMessages = messages.map(msg => ({
      ...msg,
      selected: !allSelected
    }));
    setMessages(updatedMessages);
    setSelectedCount(allSelected ? 0 : updatedMessages.length);
  };

  const cancelSelection = () => {
    const updatedMessages = messages.map(msg => ({
      ...msg,
      selected: false
    }));
    setMessages(updatedMessages);
    setSelectionMode(false);
    setSelectedCount(0);
  };

  const forwardSelectedMessages = () => {
    // Implement forwarding logic here
    Alert.alert("Forward", `${selectedCount} messages will be forwarded`);
  };

  const shareSelectedMessages = () => {
    // Implement sharing logic here
    Alert.alert("Share", `${selectedCount} messages will be shared`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBackClick} style={styles.backButton}>
            <Text style={styles.backButtonText}>
              {selectionMode ? '✕' : '←'}
            </Text>
          </TouchableOpacity>
          
          {selectionMode ? (
            <View style={styles.selectionHeader}>
              <Text style={styles.selectedCountText}>{selectedCount} selected</Text>
              <View style={styles.selectionActions}>
                <TouchableOpacity onPress={selectAllMessages} style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Select All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteSelectedMessages} style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={forwardSelectedMessages} style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Forward</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={shareSelectedMessages} style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.profileSection}>
              <View style={styles.profileAvatar}>
                <Text style={styles.avatarText}>👤</Text>
              </View>
              <Text style={styles.profileName}>Hi Anjana ,</Text>
            </View>
          )}
          
          <View style={styles.headerSpacer} />
        </View>
      </View>

      {/* Chat Messages Area */}
      <View style={styles.chatContainer}>
        <ScrollView 
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((message) => (
            <TouchableOpacity
              key={message.id}
              onLongPress={() => toggleMessageSelection(message.id)}
              onPress={() => selectionMode && toggleMessageSelection(message.id)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.messageWrapper,
                message.selected && styles.selectedMessageWrapper
              ]}>
                <View style={[
                  styles.messageBubble,
                  message.sender === 'user' ? styles.userMessage : styles.otherMessage,
                  message.selected && styles.selectedMessage
                ]}>
                  {selectionMode && (
                    <View style={[
                      styles.selectionIndicator,
                      message.selected && styles.selectedIndicator
                    ]}>
                      {message.selected && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                  )}
                  <Text style={[
                    styles.messageText,
                    message.sender === 'user' ? styles.userMessageText : styles.otherMessageText
                  ]}>
                    {message.text}
                  </Text>
                  <Text style={styles.messageTime}>{message.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Message Input */}
        {!selectionMode && (
          <View style={styles.inputContainer}>
            <View style={styles.messageInputWrapper}>
              <TextInput
                style={styles.messageInput}
                placeholder="Send Message"
                value={newMessage}
                onChangeText={setNewMessage}
                placeholderTextColor="#9CA3AF"
                multiline={true}
              />
              <TouchableOpacity 
                onPress={handleSendMessage}
                style={styles.sendButton}
                disabled={!newMessage.trim()}
              >
                <Text style={styles.sendButtonText}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 16,
  },
  selectionHeader: {
    flex: 1,
    marginLeft: 16,
  },
  selectedCountText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  selectionActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 32,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  selectedMessageWrapper: {
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    borderRadius: 8,
    padding: 4,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  selectedMessage: {
    borderWidth: 1,
    borderColor: '#22D3EE',
  },
  userMessage: {
    backgroundColor: '#E5E7EB',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#3B82F6',
    alignSelf: 'flex-start',
  },
  selectionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicator: {
    backgroundColor: '#22D3EE',
    borderColor: '#22D3EE',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
    color: '#6B7280',
    marginLeft: 8,
  },
  userMessageText: {
    color: '#374151',
  },
  otherMessageText: {
    color: '#FFFFFF',
  },
  otherMessageTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  messageInputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#22D3EE',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  sendButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});