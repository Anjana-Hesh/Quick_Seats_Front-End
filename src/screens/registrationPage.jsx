// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet, 
//   ScrollView, 
//   Modal, 
//   Pressable,
//   KeyboardAvoidingView,
//   Platform
// } from 'react-native';

// const RegistrationForm = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     nic: '',
//     role: '',
//     username: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [modalVisible, setModalVisible] = useState(false);
//   const roles = ['Customer', 'Driver', 'Bus Owner'];

//   const handleChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = () => {
//     console.log('Registration Data:', formData);
//     // Add your registration logic here
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.keyboardAvoidingView}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.header}>Create Account</Text>

//         {/* Role Selection Dropdown */}
//         <Pressable
//           style={styles.dropdown}
//           onPress={() => setModalVisible(true)}
//         >
//           <Text style={styles.dropdownText}>
//             {formData.role || 'Select Your Role'}
//           </Text>
//         </Pressable>

//         <Modal
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               {roles.map((item) => (
//                 <Pressable
//                   key={item}
//                   style={styles.modalItem}
//                   onPress={() => {
//                     handleChange('role', item);
//                     setModalVisible(false);
//                   }}
//                 >
//                   <Text style={styles.modalItemText}>{item}</Text>
//                 </Pressable>
//               ))}
//             </View>
//           </View>
//         </Modal>

//         {/* Account Credentials */}
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           placeholderTextColor={'#032549ff'}
//           value={formData.username}
//           onChangeText={(text) => handleChange('username', text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor={'#032549ff'}
//           secureTextEntry
//           value={formData.password}
//           onChangeText={(text) => handleChange('password', text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Confirm Password"
//           placeholderTextColor={'#032549ff'}
//           secureTextEntry
//           value={formData.confirmPassword}
//           onChangeText={(text) => handleChange('confirmPassword', text)}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           placeholderTextColor={'#032549ff'}
//           keyboardType="email-address"
//           value={formData.email}
//           onChangeText={(text) => handleChange('email', text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Phone Number"
//           placeholderTextColor={'#032549ff'}
//           keyboardType="phone-pad"
//           value={formData.phone}
//           onChangeText={(text) => handleChange('phone', text)}
//         />

//         {/* Submit Button */}
//         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Register</Text>
//         </TouchableOpacity>

//         {/* Login Link */}
//         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//           <Text style={styles.loginText}>
//             Already have an account? <Text style={styles.loginLink}>Login</Text>
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   keyboardAvoidingView: {
//     flex: 1,
//   },
//   container: {
//     flexGrow: 1,
//     padding: 25,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 25,
//     textAlign: 'center',
//     color: '#333',
//   },
//   nameContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     backgroundColor: '#fff',
//     fontSize: 16,
//   },
//   nameInput: {
//     width: '48%',
//   },
//   dropdown: {
//     height: 50,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     marginBottom: 15,
//   },
//   dropdownText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     paddingVertical: 10,
//   },
//   modalItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   modalItemText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#4a80f0',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   loginText: {
//     textAlign: 'center',
//     marginTop: 10,
//     color: '#666',
//   },
//   loginLink: {
//     color: '#4a80f0',
//     fontWeight: 'bold',
//   },
// });

// export default RegistrationForm;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('Customer'); // Default selection

  const handleRegister = () => {
    console.log('Registration data:', {
      username,
      password,
      confirmPassword,
      phoneNumber,
      email,
      userType
    });
    // Add your registration logic here
  };

  const UserTypeButton = ({ type, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.userTypeButton,
        isSelected && styles.userTypeButtonSelected
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.userTypeText,
        isSelected && styles.userTypeTextSelected
      ]}>
        {type}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <View style={styles.gradientBackground} />
      
      {/* Main Content Card */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentCard}
        showsVerticalScrollIndicator={false}
      >
        {/* Input Container */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="User Name"
            placeholderTextColor="#0F766E"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#0F766E"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Password Re-enter"
            placeholderTextColor="#0F766E"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#0F766E"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#0F766E"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* User Type Selection */}
        <View style={styles.userTypeContainer}>
          <View style={styles.userTypeRow}>
            <UserTypeButton
              type="Customer"
              isSelected={userType === 'Customer'}
              onPress={() => setUserType('Customer')}
            />
            <UserTypeButton
              type="Driver"
              isSelected={userType === 'Driver'}
              onPress={() => setUserType('Driver')}
            />
            <UserTypeButton
              type="Bus Owner"
              isSelected={userType === 'Bus Owner'}
              onPress={() => setUserType('Bus Owner')}
            />
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleRegister}
          activeOpacity={0.8}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>I already have an account</Text>
        </TouchableOpacity>
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
    height: height * 0.3,
    backgroundColor: '#3B82F6',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  scrollView: {
    flex: 1,
    marginTop: height * 0.15,
  },
  contentCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 50,
    minHeight: height * 0.9,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    height: 55,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#1F2937',
  },
  userTypeContainer: {
    marginBottom: 40,
  },
  userTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#14B8A6',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#14B8A6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  userTypeButtonSelected: {
    backgroundColor: '#0F766E',
  },
  userTypeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  userTypeTextSelected: {
    color: 'white',
    fontWeight: '700',
  },
  signUpButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#1E293B',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default RegisterScreen;
