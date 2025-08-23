// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   TextInput,
//   Alert,
// } from 'react-native';
// import { Message } from '../screens/components/Message';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// async function getLocalDataTime() {
//   try {
//     const data = await AsyncStorage.getItem('selectedRoute');
//     if (data !== null) {
//       return JSON.parse(data);
//     }
//     return null;
//   } catch (error) {
//     console.log('Error reading route:', error);
//   }
// }

// // connection
// async function connection(url, method) {
//   const response = fetch(url, {
//     method: { method },
//     headers: {
//       'content-Type': 'application/json',
//       Authorization: '',
//     },
//     body: JSON.stringify(),
//   });

//   if (!(await response).ok) {
//     throw new Error('Error');
//   }

//   const data = (await response).json();
//   Alert.alert('Success');
//   return data;
// }

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// export default function ChatInterface({ navigation }) {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: 'Thank you',
//       sender: 'user',
//       time: '2:30 PM',
//       selected: false,
//     },
//     {
//       id: 2,
//       text: 'I need the details about the route and other details about the bus',
//       sender: 'user',
//       time: '2:31 PM',
//       selected: false,
//     },
//   ]);
//   const [newMessage, setNewMessage] = useState('');
//   const [selectionMode, setSelectionMode] = useState(false);
//   const [selectedCount, setSelectedCount] = useState(0);

//   const handleBackClick = () => {
//     if (selectionMode) {
//       cancelSelection();
//     } else if (navigation) {
//       navigation.goBack();
//     }
//   };

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const message = {
//         id: Date.now(),
//         text: newMessage,
//         sender: 'user',
//         time: new Date().toLocaleTimeString([], {
//           hour: '2-digit',
//           minute: '2-digit',
//         }),
//         selected: false,
//       };
//       setMessages([...messages, message]);
//       setNewMessage('');
//     }
//   };

//   const toggleMessageSelection = id => {
//     const updatedMessages = messages.map(msg =>
//       msg.id === id ? { ...msg, selected: !msg.selected } : msg,
//     );
//     setMessages(updatedMessages);

//     const count = updatedMessages.filter(msg => msg.selected).length;
//     setSelectedCount(count);
//     if (count > 0 && !selectionMode) {
//       setSelectionMode(true);
//     } else if (count === 0) {
//       setSelectionMode(false);
//     }
//   };

//   const deleteSelectedMessages = () => {
//     Alert.alert(
//       'Delete Messages',
//       'Are you sure you want to delete the selected messages?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           onPress: () => {
//             setMessages(messages.filter(msg => !msg.selected));
//             setSelectionMode(false);
//             setSelectedCount(0);
//           },
//         },
//       ],
//     );
//   };

//   const selectAllMessages = () => {
//     const allSelected = messages.every(msg => msg.selected);
//     const updatedMessages = messages.map(msg => ({
//       ...msg,
//       selected: !allSelected,
//     }));
//     setMessages(updatedMessages);
//     setSelectedCount(allSelected ? 0 : updatedMessages.length);
//   };

//   const cancelSelection = () => {
//     const updatedMessages = messages.map(msg => ({
//       ...msg,
//       selected: false,
//     }));
//     setMessages(updatedMessages);
//     setSelectionMode(false);
//     setSelectedCount(0);
//   };

//   const forwardSelectedMessages = () => {
//     // Implement forwarding logic here
//     Alert.alert('Forward', `${selectedCount} messages will be forwarded`);
//   };

//   const shareSelectedMessages = () => {
//     // Implement sharing logic here
//     Alert.alert('Share', `${selectedCount} messages will be shared`);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <TouchableOpacity onPress={handleBackClick} style={styles.backButton}>
//             <Text style={styles.backButtonText}>
//               {selectionMode ? '✕' : '←'}
//             </Text>
//           </TouchableOpacity>

//           {selectionMode ? (
//             <View style={styles.selectionHeader}>
//               <Text style={styles.selectedCountText}>
//                 {selectedCount} selected
//               </Text>
//               <View style={styles.selectionActions}>
//                 <TouchableOpacity
//                   onPress={selectAllMessages}
//                   style={styles.actionButton}
//                 >
//                   <Text style={styles.actionButtonText}>Select All</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={deleteSelectedMessages}
//                   style={styles.actionButton}
//                 >
//                   <Text style={styles.actionButtonText}>Delete</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={forwardSelectedMessages}
//                   style={styles.actionButton}
//                 >
//                   <Text style={styles.actionButtonText}>Forward</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={shareSelectedMessages}
//                   style={styles.actionButton}
//                 >
//                   <Text style={styles.actionButtonText}>Share</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ) : (
//             <View style={styles.profileSection}>
//               <View style={styles.profileAvatar}>
//                 <Text style={styles.avatarText}>👤</Text>
//               </View>
//               <Text style={styles.profileName}>Hi Anjana ,</Text>
//             </View>
//           )}

//           <View style={styles.headerSpacer} />
//         </View>
//       </View>

//       {/* Chat Messages Area */}
//       <View style={styles.chatContainer}>
//         <ScrollView
//           style={styles.messagesContainer}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.messagesContent}
//         >
//           <Message message="Hello!" time="10:30 AM" />
//           <Message message="Hello!" time="10:30 AM" />
//           <Message message="Hello!" time="10:30 AM" />
//           <Message message="Hello!" time="10:30 AM" />
//           <Message message="Hello!" time="10:30 AM" />
//           <Message message="Hello!" time="10:30 AM" />
//           <Message message="Hello!" time="10:30 AM" />
//           <Message message="Hello!" time="10:30 AM" />
//           <Message message="Hello!" time="10:30 AM" />
//           <Message message="Hello!" time="10:30 AM" />
//           <Message message="Hello!" time="10:30 AM" />
//           <Message message="Hello!" time="10:30 AM" />

//           {/* {messages.map(message => (
//             <TouchableOpacity
//               key={message.id}
//               onLongPress={() => toggleMessageSelection(message.id)}
//               onPress={() =>
//                 selectionMode && toggleMessageSelection(message.id)
//               }
//               activeOpacity={0.7}
//             >
//               <View
//                 style={[
//                   styles.messageWrapper,
//                   message.selected && styles.selectedMessageWrapper,
//                 ]}
//               >
//                 <View
//                   style={[
//                     styles.messageBubble,
//                     message.sender === 'user'
//                       ? styles.userMessage
//                       : styles.otherMessage,
//                     message.selected && styles.selectedMessage,
//                   ]}
//                 >
//                   {selectionMode && (
//                     <View
//                       style={[
//                         styles.selectionIndicator,
//                         message.selected && styles.selectedIndicator,
//                       ]}
//                     >
//                       {message.selected && (
//                         <Text style={styles.checkmark}>✓</Text>
//                       )}
//                     </View>
//                   )}
//                   <Text
//                     style={[
//                       styles.messageText,
//                       message.sender === 'user'
//                         ? styles.userMessageText
//                         : styles.otherMessageText,
//                     ]}
//                   >
//                     {message.text}
//                   </Text>
//                   <Text style={styles.messageTime}>{message.time}</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))} */}
//         </ScrollView>

//         {/* Message Input */}
//         {!selectionMode && (
//           <View style={styles.inputContainer}>
//             <View style={styles.messageInputWrapper}>
//               <TextInput
//                 style={styles.messageInput}
//                 placeholder="Send Message"
//                 value={newMessage}
//                 onChangeText={setNewMessage}
//                 placeholderTextColor="#9CA3AF"
//                 multiline={true}
//               />
//               <TouchableOpacity
//                 onPress={handleSendMessage}
//                 style={styles.sendButton}
//                 disabled={!newMessage.trim()}
//               >
//                 <Text style={styles.sendButtonText}>➤</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: screenWidth,
//     height: screenHeight,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     backgroundColor: '#22D3EE',
//     paddingHorizontal: 16,
//     paddingTop: 50,
//     paddingBottom: 16,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   backButton: {
//     padding: 8,
//     borderRadius: 20,
//   },
//   backButtonText: {
//     color: '#FFFFFF',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   profileSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     marginLeft: 16,
//   },
//   selectionHeader: {
//     flex: 1,
//     marginLeft: 16,
//   },
//   selectedCountText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   selectionActions: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   actionButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     marginRight: 8,
//     marginBottom: 4,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     borderRadius: 12,
//   },
//   actionButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//   },
//   profileAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   avatarText: {
//     fontSize: 20,
//     color: '#FFFFFF',
//   },
//   profileName: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   headerSpacer: {
//     width: 32,
//   },
//   chatContainer: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//   },
//   messagesContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   messagesContent: {
//     paddingTop: 20,
//     paddingBottom: 20,
//   },
//   messageWrapper: {
//     marginBottom: 16,
//     alignItems: 'flex-end',
//   },
//   selectedMessageWrapper: {
//     backgroundColor: 'rgba(34, 211, 238, 0.1)',
//     borderRadius: 8,
//     padding: 4,
//   },
//   messageBubble: {
//     maxWidth: '80%',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 18,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//   },
//   selectedMessage: {
//     borderWidth: 1,
//     borderColor: '#22D3EE',
//   },
//   userMessage: {
//     backgroundColor: '#E5E7EB',
//     alignSelf: 'flex-end',
//   },
//   otherMessage: {
//     backgroundColor: '#3B82F6',
//     alignSelf: 'flex-start',
//   },
//   selectionIndicator: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#9CA3AF',
//     marginRight: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   selectedIndicator: {
//     backgroundColor: '#22D3EE',
//     borderColor: '#22D3EE',
//   },
//   checkmark: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   messageText: {
//     fontSize: 16,
//     lineHeight: 22,
//     flex: 1,
//   },
//   messageTime: {
//     fontSize: 12,
//     marginTop: 4,
//     textAlign: 'right',
//     color: '#6B7280',
//     marginLeft: 8,
//   },
//   userMessageText: {
//     color: '#374151',
//   },
//   otherMessageText: {
//     color: '#FFFFFF',
//   },
//   otherMessageTime: {
//     color: 'rgba(255,255,255,0.7)',
//   },
//   inputContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//   },
//   messageInputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     backgroundColor: '#F3F4F6',
//     borderRadius: 24,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     minHeight: 48,
//   },
//   messageInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#374151',
//     maxHeight: 100,
//     paddingVertical: 8,
//   },
//   sendButton: {
//     marginLeft: 8,
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: '#22D3EE',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 40,
//     height: 40,
//   },
//   sendButtonText: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
// });

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Improved storage functions
async function getStoredMessages() {
  try {
    const data = await AsyncStorage.getItem('chatMessages');
    if (data !== null) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.log('Error reading messages:', error);
    return [];
  }
}

async function saveMessages(messages) {
  try {
    await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
  } catch (error) {
    console.log('Error saving messages:', error);
  }
}

// Improved connection function
async function sendToServer(message, method = 'POST') {
  try {
    const response = await fetch('https://api.example.com/messages', {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer your-token-here',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Connection error:', error);
    // For demo purposes, we'll simulate a response
    return { success: true, response: 'Message received!' };
  }
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Custom Message Component
const MessageBubble = ({ message, onLongPress, onPress, selectionMode }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isUser = message.sender === 'user';

  return (
    <Animated.View
      style={[
        styles.messageWrapper,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        message.selected && styles.selectedMessageWrapper,
        isUser ? styles.userMessageWrapper : styles.otherMessageWrapper,
      ]}
    >
      <TouchableOpacity
        onLongPress={() => onLongPress(message.id)}
        onPress={() => selectionMode && onPress(message.id)}
        activeOpacity={0.7}
        style={styles.messageTouchable}
      >
        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userMessage : styles.otherMessage,
            message.selected && styles.selectedMessage,
          ]}
        >
          {selectionMode && (
            <View
              style={[
                styles.selectionIndicator,
                message.selected && styles.selectedIndicator,
              ]}
            >
              {message.selected && <Text style={styles.checkmark}>✓</Text>}
            </View>
          )}
          <View style={styles.messageContent}>
            <Text
              style={[
                styles.messageText,
                isUser ? styles.userMessageText : styles.otherMessageText,
              ]}
            >
              {message.text}
            </Text>
            <View style={styles.messageFooter}>
              <Text
                style={[
                  styles.messageTime,
                  isUser ? styles.userMessageTime : styles.otherMessageTime,
                ]}
              >
                {message.time}
              </Text>
              {isUser && (
                <Text style={styles.messageStatus}>
                  {message.status === 'sent'
                    ? '✓'
                    : message.status === 'delivered'
                    ? '✓✓'
                    : '⏰'}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Typing Indicator Component
const TypingIndicator = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(dot1, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot2, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot3, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot1, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot2, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot3, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.typingIndicator}>
      <View style={styles.typingBubble}>
        <View style={styles.typingDots}>
          <Animated.View style={[styles.dot, { opacity: dot1 }]} />
          <Animated.View style={[styles.dot, { opacity: dot2 }]} />
          <Animated.View style={[styles.dot, { opacity: dot3 }]} />
        </View>
      </View>
    </View>
  );
};

export default function ChatInterface({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrollViewRef = useRef();
  const inputRef = useRef();

  // Load messages on component mount
  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setIsLoading(true);
    const storedMessages = await getStoredMessages();
    setMessages(storedMessages);
    setIsLoading(false);
  };

  const handleBackClick = () => {
    if (selectionMode) {
      cancelSelection();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage.trim(),
        sender: 'user',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'sending',
        selected: false,
      };

      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      setNewMessage('');

      // Save to storage
      await saveMessages(updatedMessages);

      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);

      // Simulate sending to server
      try {
        setIsTyping(true);
        const response = await sendToServer(message.text);

        // Update message status
        const sentMessages = updatedMessages.map(msg =>
          msg.id === message.id ? { ...msg, status: 'sent' } : msg,
        );
        setMessages(sentMessages);
        await saveMessages(sentMessages);

        // Simulate bot response after a delay
        setTimeout(() => {
          const botMessage = {
            id: Date.now() + 1,
            text: getBotResponse(message.text),
            sender: 'bot',
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            selected: false,
          };

          const withBotMessage = [...sentMessages, botMessage];
          setMessages(withBotMessage);
          saveMessages(withBotMessage);
          setIsTyping(false);

          setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }, 1500);
      } catch (error) {
        console.log('Error sending message:', error);
        const errorMessages = updatedMessages.map(msg =>
          msg.id === message.id ? { ...msg, status: 'error' } : msg,
        );
        setMessages(errorMessages);
        await saveMessages(errorMessages);
        setIsTyping(false);
      }
    }
  };

  const getBotResponse = userMessage => {
    const responses = [
      'Hello! How can I help you with your bus booking today?',
      "Thanks for your message! I'm here to assist you.",
      'Great question! Let me help you with that information.',
      'I understand. Let me get you the route details and bus information.',
      "Thank you for contacting us. I'll provide you with the details you need.",
      "Hello there! I'm happy to help you with any bus-related queries.",
    ];

    if (
      userMessage.toLowerCase().includes('route') ||
      userMessage.toLowerCase().includes('details')
    ) {
      return 'I can provide you with route information, schedules, and bus details. What specific information would you like to know?';
    }

    if (userMessage.toLowerCase().includes('thank')) {
      return "You're very welcome! Is there anything else I can help you with?";
    }

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleMessageSelection = id => {
    const updatedMessages = messages.map(msg =>
      msg.id === id ? { ...msg, selected: !msg.selected } : msg,
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
      'Delete Messages',
      `Are you sure you want to delete ${selectedCount} selected message${
        selectedCount > 1 ? 's' : ''
      }?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const filteredMessages = messages.filter(msg => !msg.selected);
            setMessages(filteredMessages);
            await saveMessages(filteredMessages);
            setSelectionMode(false);
            setSelectedCount(0);
          },
        },
      ],
    );
  };

  const selectAllMessages = () => {
    const allSelected = messages.every(msg => msg.selected);
    const updatedMessages = messages.map(msg => ({
      ...msg,
      selected: !allSelected,
    }));
    setMessages(updatedMessages);
    setSelectedCount(allSelected ? 0 : updatedMessages.length);
  };

  const cancelSelection = () => {
    const updatedMessages = messages.map(msg => ({
      ...msg,
      selected: false,
    }));
    setMessages(updatedMessages);
    setSelectionMode(false);
    setSelectedCount(0);
  };

  const clearAllMessages = () => {
    Alert.alert(
      'Clear Chat',
      'Are you sure you want to clear all messages? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            setMessages([]);
            await saveMessages([]);
            setSelectionMode(false);
            setSelectedCount(0);
          },
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading chat...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
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
              <Text style={styles.selectedCountText}>
                {selectedCount} selected
              </Text>
              <View style={styles.selectionActions}>
                <TouchableOpacity
                  onPress={selectAllMessages}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionButtonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deleteSelectedMessages}
                  style={[styles.actionButton, styles.deleteButton]}
                >
                  <Text style={styles.actionButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.profileSection}>
              <View style={styles.profileAvatar}>
                <Text style={styles.avatarText}>🚌</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Bus Support</Text>
                <Text style={styles.profileStatus}>
                  {isTyping ? 'typing...' : 'Online'}
                </Text>
              </View>
            </View>
          )}

          <TouchableOpacity
            onPress={clearAllMessages}
            style={styles.menuButton}
          >
            <Text style={styles.menuButtonText}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Messages Area */}
      <View style={styles.chatContainer}>
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>💬</Text>
            <Text style={styles.emptyStateTitle}>No messages yet</Text>
            <Text style={styles.emptyStateSubtitle}>
              Start a conversation by sending a message below
            </Text>
          </View>
        ) : (
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesContent}
            onContentSizeChange={() => {
              setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }, 100);
            }}
          >
            {messages.map(message => (
              <MessageBubble
                key={message.id}
                message={message}
                onLongPress={toggleMessageSelection}
                onPress={toggleMessageSelection}
                selectionMode={selectionMode}
              />
            ))}
            {isTyping && <TypingIndicator />}
          </ScrollView>
        )}

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <View style={styles.messageInputWrapper}>
            <TextInput
              ref={inputRef}
              style={styles.messageInput}
              placeholder="Type your message here..."
              value={newMessage}
              onChangeText={setNewMessage}
              placeholderTextColor="#9CA3AF"
              multiline={true}
              maxLength={500}
              onSubmitEditing={handleSendMessage}
              returnKeyType="send"
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              style={[
                styles.sendButton,
                !newMessage.trim() && styles.sendButtonDisabled,
              ]}
              disabled={!newMessage.trim()}
            >
              <Text
                style={[
                  styles.sendButtonText,
                  !newMessage.trim() && styles.sendButtonTextDisabled,
                ]}
              >
                ➤
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.characterCount}>{newMessage.length}/500</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    backgroundColor: '#22D3EE',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  menuButton: {
    padding: 8,
    borderRadius: 20,
  },
  menuButtonText: {
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
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
  },
  deleteButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  profileStatus: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontStyle: 'italic',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
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
    marginBottom: 12,
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  otherMessageWrapper: {
    alignItems: 'flex-start',
  },
  selectedMessageWrapper: {
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    borderRadius: 12,
    padding: 4,
    margin: -4,
  },
  messageTouchable: {
    maxWidth: '85%',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedMessage: {
    borderWidth: 2,
    borderColor: '#22D3EE',
  },
  userMessage: {
    backgroundColor: '#E5E7EB',
    borderBottomRightRadius: 8,
  },
  otherMessage: {
    backgroundColor: '#3B82F6',
    borderBottomLeftRadius: 8,
  },
  selectionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#9CA3AF',
    marginRight: 8,
    marginTop: 2,
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
  messageContent: {
    flex: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#374151',
  },
  otherMessageText: {
    color: '#FFFFFF',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  messageTime: {
    fontSize: 12,
    fontWeight: '400',
  },
  userMessageTime: {
    color: '#6B7280',
  },
  otherMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  messageStatus: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  typingIndicator: {
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  typingBubble: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 8,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9CA3AF',
    marginHorizontal: 2,
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
    marginBottom: 4,
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    maxHeight: 120,
    paddingVertical: 8,
    textAlignVertical: 'top',
  },
  sendButton: {
    marginLeft: 12,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#22D3EE',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  sendButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  sendButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sendButtonTextDisabled: {
    color: '#9CA3AF',
  },
  characterCount: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 4,
  },
});
