// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFS from 'react-native-fs';

// const { width, height } = Dimensions.get('window');

// const RegisterScreen = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//     email: '',
//     nic: '',
//     address: '',
//   });
//   const [userType, setUserType] = useState('Customer');
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   // Validation functions
//   const validateEmail = email => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhone = phone => {
//     const phoneRegex = /^[0-9]{10}$/;
//     return phoneRegex.test(phone.replace(/\s/g, ''));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     } else if (formData.username.length < 3) {
//       newErrors.username = 'Username must be at least 3 characters';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     if (!formData.phoneNumber.trim()) {
//       newErrors.phoneNumber = 'Phone number is required';
//     } else if (!validatePhone(formData.phoneNumber)) {
//       newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     if (!formData.nic.trim()) {
//       newErrors.nic = 'NIC is required';
//     }

//     if (!formData.address.trim()) {
//       newErrors.address = 'Address is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // API call function
//   const registerUser = async () => {
//     try {
//       setLoading(true);

//       const userData = {
//         name: formData.username.trim(),
//         nic: formData.nic.trim(),
//         password: formData.password,
//         address: formData.address.trim(),
//         phone: formData.phoneNumber.trim(),
//         email: formData.email.trim(),
//         role: userType,
//         bus: [
//           {
//             id: '',
//             seatDetails: {
//               left: 0,
//               right: 0,
//               row: 2,
//             },
//             bookings: [],
//             shcedule: [],
//           },
//         ],
//       };

//       const response = await fetch(
//         'http://10.48.140.203:8080/api/v1/user/sign-up-user',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer your-auth-token-here',
//           },
//           body: JSON.stringify(userData),
//         },
//       );

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => null);
//         throw new Error(
//           errorData?.message || `HTTP error! status: ${response.status}`,
//         );
//       }

//       const data = await response.json();

//       Alert.alert('Success!', 'Your account has been created successfully.', [
//         {
//           text: 'OK',
//           onPress: () => navigation.navigate('Login'),
//         },
//       ]);

//       return data;
//     } catch (error) {
//       console.error('Registration error:', error);
//       Alert.alert(
//         'Registration Failed',
//         error.message || 'Something went wrong. Please try again.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = () => {
//     // if (!validateForm()) {
//     //   Alert.alert('Validation Error', 'Please fix the errors in the form.');
//     //   return;
//     // }

//     console.log('Registration data:', { ...formData, userType });

//     if (userType === 'Owner') {
//       navigation.navigate('BusSignUp');
//       saveData();
//     } else {
//       saveData();
//     }
//   };

//   const updateFormData = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   async function saveData() {
//     try {
//       await AsyncStorage.setItem(
//         'selectedData',
//         JSON.stringify([
//           {
//             name: formData.username.trim(),
//             nic: formData.nic.trim(),
//             password: formData.password,
//             address: formData.address.trim(),
//             phone: formData.phoneNumber.trim(),
//             email: formData.email.trim(),
//             role: userType,
//             bus: [],
//           },
//         ]),
//       );

//       console.log('Route saved successfully!');
//     } catch (error) {
//       console.log('Error saving route:', error);
//     }
//   }

//   const UserTypeButton = ({ type, isSelected, onPress }) => (
//     <TouchableOpacity
//       style={[
//         styles.userTypeButton,
//         isSelected && styles.userTypeButtonSelected,
//       ]}
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       <Text
//         style={[styles.userTypeText, isSelected && styles.userTypeTextSelected]}
//       >
//         {type}
//       </Text>
//     </TouchableOpacity>
//   );

//   const InputField = ({
//     placeholder,
//     field,
//     secureTextEntry = false,
//     keyboardType = 'default',
//     autoCapitalize = 'sentences',
//   }) => (
//     <View style={styles.inputWrapper}>
//       <TextInput
//         style={[styles.input, errors[field] && styles.inputError]}
//         placeholder={placeholder}
//         placeholderTextColor="#9CA3AF"
//         value={formData[field]}
//         onChangeText={value => updateFormData(field, value)}
//         secureTextEntry={secureTextEntry}
//         keyboardType={keyboardType}
//         autoCapitalize={autoCapitalize}
//       />
//       {errors[field] ? (
//         <Text style={styles.errorText}>{errors[field]}</Text>
//       ) : null}
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       {/* Gradient Background */}
//       <View style={styles.gradientBackground} />

//       {/* Main Content Card */}
//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.contentCard}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <Text style={styles.title}>Create Account</Text>

//         {/* Input Container */}
//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="Username"
//             field="username"
//             autoCapitalize="none"
//           />

//           <InputField
//             placeholder="Password"
//             field="password"
//             secureTextEntry={true}
//             autoCapitalize="none"
//           />

//           <InputField
//             placeholder="Confirm Password"
//             field="confirmPassword"
//             secureTextEntry={true}
//             autoCapitalize="none"
//           />

//           <InputField
//             placeholder="Phone Number"
//             field="phoneNumber"
//             keyboardType="phone-pad"
//           />

//           <InputField
//             placeholder="Email Address"
//             field="email"
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />

//           <InputField
//             placeholder="NIC Number"
//             field="nic"
//             autoCapitalize="none"
//           />

//           <InputField placeholder="Address" field="address" />
//         </View>

//         {/* User Type Selection */}
//         <View style={styles.userTypeContainer}>
//           <Text style={styles.sectionTitle}>Select Account Type</Text>
//           <View style={styles.userTypeRow}>
//             <UserTypeButton
//               type="Customer"
//               isSelected={userType === 'Customer'}
//               onPress={() => setUserType('Customer')}
//             />
//             <UserTypeButton
//               type="Driver"
//               isSelected={userType === 'Driver'}
//               onPress={() => setUserType('Driver')}
//             />
//             <UserTypeButton
//               type="Bus Owner"
//               isSelected={userType === 'Owner'}
//               onPress={() => setUserType('Owner')}
//             />
//           </View>
//         </View>

//         {/* Sign Up Button */}
//         <TouchableOpacity
//           style={[styles.signUpButton, loading && styles.signUpButtonDisabled]}
//           onPress={handleRegister}
//           activeOpacity={0.8}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="white" size="small" />
//           ) : (
//             <Text style={styles.signUpButtonText}>Create Account</Text>
//           )}
//         </TouchableOpacity>

//         {/* Login Link */}
//         <TouchableOpacity
//           style={styles.loginLink}
//           onPress={() => navigation.navigate('Login')}
//         >
//           <Text style={styles.loginText}>Already have an account? Sign In</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   gradientBackground: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: height * 0.3,
//     backgroundColor: '#3B82F6',
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//   },
//   scrollView: {
//     flex: 1,
//     marginTop: height * 0.12,
//   },
//   contentCard: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 30,
//     paddingTop: 30,
//     paddingBottom: 50,
//     minHeight: height * 0.9,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: -5,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1F2937',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   inputContainer: {
//     marginBottom: 25,
//   },
//   inputWrapper: {
//     marginBottom: 15,
//   },
//   input: {
//     height: 55,
//     borderColor: '#E5E7EB',
//     borderWidth: 1,
//     borderRadius: 12,
//     paddingHorizontal: 20,
//     fontSize: 16,
//     backgroundColor: '#FAFAFA',
//     color: '#1F2937',
//   },
//   inputError: {
//     borderColor: '#EF4444',
//     borderWidth: 2,
//   },
//   errorText: {
//     color: '#EF4444',
//     fontSize: 12,
//     marginTop: 5,
//     marginLeft: 5,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1F2937',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   userTypeContainer: {
//     marginBottom: 30,
//   },
//   userTypeRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 10,
//   },
//   userTypeButton: {
//     flex: 1,
//     paddingVertical: 15,
//     paddingHorizontal: 8,
//     borderRadius: 12,
//     backgroundColor: '#E5E7EB',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: 'transparent',
//   },
//   userTypeButtonSelected: {
//     backgroundColor: '#3B82F6',
//     borderColor: '#1D4ED8',
//   },
//   userTypeText: {
//     color: '#6B7280',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   userTypeTextSelected: {
//     color: 'white',
//     fontWeight: '700',
//   },
//   signUpButton: {
//     backgroundColor: '#1F2937',
//     paddingVertical: 18,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 20,
//     elevation: 3,
//     shadowColor: '#1F2937',
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   signUpButtonDisabled: {
//     backgroundColor: '#9CA3AF',
//   },
//   signUpButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   loginLink: {
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   loginText: {
//     color: '#3B82F6',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

// export default RegisterScreen;///////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width, height } = Dimensions.get('window');

// // Utility functions for data management
// const getUsersArray = async () => {
//   try {
//     const usersData = await AsyncStorage.getItem('usersArray');
//     return usersData ? JSON.parse(usersData) : [];
//   } catch (error) {
//     console.error('Error getting users array:', error);
//     return [];
//   }
// };

// const saveUserToArray = async userData => {
//   try {
//     const existingUsers = await getUsersArray();
//     const newUser = {
//       ...userData,
//       id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };
//     const updatedUsers = [...existingUsers, newUser];
//     await AsyncStorage.setItem('usersArray', JSON.stringify(updatedUsers));
//     console.log('User saved to array:', newUser);
//     return newUser;
//   } catch (error) {
//     console.error('Error saving user to array:', error);
//     throw error;
//   }
// };

// const findUserByCredentials = async (email, username) => {
//   try {
//     const users = await getUsersArray();
//     return (
//       users.find(
//         user =>
//           user.email.toLowerCase() === email.toLowerCase() ||
//           user.name.toLowerCase() === username.toLowerCase(),
//       ) || null
//     );
//   } catch (error) {
//     console.error('Error finding user by credentials:', error);
//     return null;
//   }
// };

// const RegisterScreen = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//     email: '',
//     nic: '',
//     address: '',
//   });
//   const [userType, setUserType] = useState('Customer');
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   // Validation functions
//   const validateEmail = email => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhone = phone => {
//     const phoneRegex = /^[0-9]{10}$/;
//     return phoneRegex.test(phone.replace(/\s/g, ''));
//   };

//   const validateForm = async () => {
//     const newErrors = {};

//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     } else if (formData.username.length < 3) {
//       newErrors.username = 'Username must be at least 3 characters';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     if (!formData.phoneNumber.trim()) {
//       newErrors.phoneNumber = 'Phone number is required';
//     } else if (!validatePhone(formData.phoneNumber)) {
//       newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     } else {
//       // Check if email already exists
//       const existingUser = await findUserByCredentials(
//         formData.email,
//         formData.username,
//       );
//       if (existingUser) {
//         if (existingUser.email.toLowerCase() === formData.email.toLowerCase()) {
//           newErrors.email = 'This email is already registered';
//         }
//         if (
//           existingUser.name.toLowerCase() === formData.username.toLowerCase()
//         ) {
//           newErrors.username = 'This username is already taken';
//         }
//       }
//     }

//     if (!formData.nic.trim()) {
//       newErrors.nic = 'NIC is required';
//     }

//     if (!formData.address.trim()) {
//       newErrors.address = 'Address is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleRegister = async () => {
//     try {
//       setLoading(true);

//       // if (!(await validateForm())) {
//       //   Alert.alert('Validation Error', 'Please fix the errors in the form.');
//       //   return;
//       // }

//       // Prepare user data
//       const userData = {
//         name: formData.username.trim(),
//         nic: formData.nic.trim(),
//         password: formData.password,
//         address: formData.address.trim(),
//         phone: formData.phoneNumber.trim(),
//         email: formData.email.trim(),
//         role: userType,
//         bus: [], // Initialize empty bus array
//       };

//       console.log('Registration data:', userData);

//       if (userType === 'Owner') {
//         // Save current user data temporarily for bus registration
//         await AsyncStorage.setItem('selectedData', JSON.stringify(userData));
//         navigation.navigate('BusSignUp');
//       } else {
//         // For Customer and Driver, save directly to users array
//         await saveUserToArray(userData);

//         Alert.alert('Success!', 'Your account has been created successfully.', [
//           {
//             text: 'OK',
//             onPress: () => navigation.navigate('Login'),
//           },
//         ]);
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       Alert.alert(
//         'Registration Failed',
//         error.message || 'Something went wrong. Please try again.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateFormData = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   const UserTypeButton = ({ type, isSelected, onPress }) => (
//     <TouchableOpacity
//       style={[
//         styles.userTypeButton,
//         isSelected && styles.userTypeButtonSelected,
//       ]}
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       <Text
//         style={[styles.userTypeText, isSelected && styles.userTypeTextSelected]}
//       >
//         {type}
//       </Text>
//     </TouchableOpacity>
//   );

//   const InputField = ({
//     placeholder,
//     field,
//     secureTextEntry = false,
//     keyboardType = 'default',
//     autoCapitalize = 'sentences',
//   }) => (
//     <View style={styles.inputWrapper}>
//       <TextInput
//         style={[styles.input, errors[field] && styles.inputError]}
//         placeholder={placeholder}
//         placeholderTextColor="#9CA3AF"
//         value={formData[field]}
//         onChangeText={value => updateFormData(field, value)}
//         secureTextEntry={secureTextEntry}
//         keyboardType={keyboardType}
//         autoCapitalize={autoCapitalize}
//       />
//       {errors[field] ? (
//         <Text style={styles.errorText}>{errors[field]}</Text>
//       ) : null}
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <View style={styles.gradientBackground} />

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.contentCard}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <Text style={styles.title}>Create Account</Text>

//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="Username"
//             field="username"
//             autoCapitalize="none"
//           />

//           <InputField
//             placeholder="Password"
//             field="password"
//             secureTextEntry={true}
//             autoCapitalize="none"
//           />

//           <InputField
//             placeholder="Confirm Password"
//             field="confirmPassword"
//             secureTextEntry={true}
//             autoCapitalize="none"
//           />

//           <InputField
//             placeholder="Phone Number"
//             field="phoneNumber"
//             keyboardType="phone-pad"
//           />

//           <InputField
//             placeholder="Email Address"
//             field="email"
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />

//           <InputField
//             placeholder="NIC Number"
//             field="nic"
//             autoCapitalize="none"
//           />

//           <InputField placeholder="Address" field="address" />
//         </View>

//         <View style={styles.userTypeContainer}>
//           <Text style={styles.sectionTitle}>Select Account Type</Text>
//           <View style={styles.userTypeRow}>
//             <UserTypeButton
//               type="Customer"
//               isSelected={userType === 'Customer'}
//               onPress={() => setUserType('Customer')}
//             />
//             <UserTypeButton
//               type="Driver"
//               isSelected={userType === 'Driver'}
//               onPress={() => setUserType('Driver')}
//             />
//             <UserTypeButton
//               type="Bus Owner"
//               isSelected={userType === 'Owner'}
//               onPress={() => setUserType('Owner')}
//             />
//           </View>
//         </View>

//         <TouchableOpacity
//           style={[styles.signUpButton, loading && styles.signUpButtonDisabled]}
//           onPress={handleRegister}
//           activeOpacity={0.8}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="white" size="small" />
//           ) : (
//             <Text style={styles.signUpButtonText}>
//               {userType === 'Owner'
//                 ? 'Continue to Bus Setup'
//                 : 'Create Account'}
//             </Text>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.loginLink}
//           onPress={() => navigation.navigate('Login')}
//         >
//           <Text style={styles.loginText}>Already have an account? Sign In</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   gradientBackground: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: height * 0.3,
//     backgroundColor: '#3B82F6',
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//   },
//   scrollView: {
//     flex: 1,
//     marginTop: height * 0.12,
//   },
//   contentCard: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 30,
//     paddingTop: 30,
//     paddingBottom: 50,
//     minHeight: height * 0.9,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: -5,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1F2937',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   inputContainer: {
//     marginBottom: 25,
//   },
//   inputWrapper: {
//     marginBottom: 15,
//   },
//   input: {
//     height: 55,
//     borderColor: '#E5E7EB',
//     borderWidth: 1,
//     borderRadius: 12,
//     paddingHorizontal: 20,
//     fontSize: 16,
//     backgroundColor: '#FAFAFA',
//     color: '#1F2937',
//   },
//   inputError: {
//     borderColor: '#EF4444',
//     borderWidth: 2,
//   },
//   errorText: {
//     color: '#EF4444',
//     fontSize: 12,
//     marginTop: 5,
//     marginLeft: 5,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1F2937',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   userTypeContainer: {
//     marginBottom: 30,
//   },
//   userTypeRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 10,
//   },
//   userTypeButton: {
//     flex: 1,
//     paddingVertical: 15,
//     paddingHorizontal: 8,
//     borderRadius: 12,
//     backgroundColor: '#E5E7EB',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: 'transparent',
//   },
//   userTypeButtonSelected: {
//     backgroundColor: '#3B82F6',
//     borderColor: '#1D4ED8',
//   },
//   userTypeText: {
//     color: '#6B7280',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   userTypeTextSelected: {
//     color: 'white',
//     fontWeight: '700',
//   },
//   signUpButton: {
//     backgroundColor: '#1F2937',
//     paddingVertical: 18,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 20,
//     elevation: 3,
//     shadowColor: '#1F2937',
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   signUpButtonDisabled: {
//     backgroundColor: '#9CA3AF',
//   },
//   signUpButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   loginLink: {
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   loginText: {
//     color: '#3B82F6',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

// export default RegisterScreen;///////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

// Move InputField component outside of RegisterScreen
const InputField = ({
  placeholder,
  field,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  formData,
  errors,
  updateFormData,
}) => (
  <View style={styles.inputWrapper}>
    <TextInput
      style={[styles.input, errors[field] && styles.inputError]}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      value={formData[field]}
      onChangeText={value => updateFormData(field, value)}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
    {errors[field] ? (
      <Text style={styles.errorText}>{errors[field]}</Text>
    ) : null}
  </View>
);

// Utility functions for data management
const getUsersArray = async () => {
  try {
    const usersData = await AsyncStorage.getItem('usersArray');
    return usersData ? JSON.parse(usersData) : [];
  } catch (error) {
    console.error('Error getting users array:', error);
    return [];
  }
};

const saveUserToArray = async userData => {
  try {
    const existingUsers = await getUsersArray();
    const newUser = {
      ...userData,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedUsers = [...existingUsers, newUser];
    await AsyncStorage.setItem('usersArray', JSON.stringify(updatedUsers));
    console.log('User saved to array:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error saving user to array:', error);
    throw error;
  }
};

const findUserByCredentials = async (email, username) => {
  try {
    const users = await getUsersArray();
    return (
      users.find(
        user =>
          user.email.toLowerCase() === email.toLowerCase() ||
          user.name.toLowerCase() === username.toLowerCase(),
      ) || null
    );
  } catch (error) {
    console.error('Error finding user by credentials:', error);
    return null;
  }
};

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    email: '',
    nic: '',
    address: '',
  });
  const [userType, setUserType] = useState('Customer');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = phone => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = async () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else {
      // Check if email already exists
      const existingUser = await findUserByCredentials(
        formData.email,
        formData.username,
      );
      if (existingUser) {
        if (existingUser.email.toLowerCase() === formData.email.toLowerCase()) {
          newErrors.email = 'This email is already registered';
        }
        if (
          existingUser.name.toLowerCase() === formData.username.toLowerCase()
        ) {
          newErrors.username = 'This username is already taken';
        }
      }
    }

    if (!formData.nic.trim()) {
      newErrors.nic = 'NIC is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      // if (!(await validateForm())) {
      //   Alert.alert('Validation Error', 'Please fix the errors in the form.');
      //   return;
      // }

      // Prepare user data
      const userData = {
        name: formData.username.trim(),
        nic: formData.nic.trim(),
        password: formData.password,
        address: formData.address.trim(),
        phone: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        role: userType,
        bus: [], // Initialize empty bus array
      };

      console.log('Registration data:', userData);

      if (userType === 'Owner') {
        // Save current user data temporarily for bus registration
        await AsyncStorage.setItem('selectedData', JSON.stringify(userData));
        navigation.navigate('BusSignUp');
      } else {
        // For Customer and Driver, save directly to users array
        await saveUserToArray(userData);

        Alert.alert('Success!', 'Your account has been created successfully.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        'Registration Failed',
        error.message || 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const UserTypeButton = ({ type, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.userTypeButton,
        isSelected && styles.userTypeButtonSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[styles.userTypeText, isSelected && styles.userTypeTextSelected]}
      >
        {type}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.gradientBackground} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentCard}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.inputContainer}>
          <InputField
            placeholder="Username"
            field="username"
            autoCapitalize="none"
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />

          <InputField
            placeholder="Password"
            field="password"
            secureTextEntry={true}
            autoCapitalize="none"
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />

          <InputField
            placeholder="Confirm Password"
            field="confirmPassword"
            secureTextEntry={true}
            autoCapitalize="none"
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />

          <InputField
            placeholder="Phone Number"
            field="phoneNumber"
            keyboardType="phone-pad"
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />

          <InputField
            placeholder="Email Address"
            field="email"
            keyboardType="email-address"
            autoCapitalize="none"
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />

          <InputField
            placeholder="NIC Number"
            field="nic"
            autoCapitalize="none"
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />

          <InputField
            placeholder="Address"
            field="address"
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />
        </View>

        <View style={styles.userTypeContainer}>
          <Text style={styles.sectionTitle}>Select Account Type</Text>
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
              isSelected={userType === 'Owner'}
              onPress={() => setUserType('Owner')}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.signUpButton, loading && styles.signUpButtonDisabled]}
          onPress={handleRegister}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.signUpButtonText}>
              {userType === 'Owner'
                ? 'Continue to Bus Setup'
                : 'Create Account'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ... rest of the styles remain exactly the same ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
    marginTop: height * 0.12,
  },
  contentCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 30,
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    height: 55,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#1F2937',
  },
  inputError: {
    borderColor: '#EF4444',
    borderWidth: 2,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 15,
    textAlign: 'center',
  },
  userTypeContainer: {
    marginBottom: 30,
  },
  userTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  userTypeButtonSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#1D4ED8',
  },
  userTypeText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  userTypeTextSelected: {
    color: 'white',
    fontWeight: '700',
  },
  signUpButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#1F2937',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  signUpButtonDisabled: {
    backgroundColor: '#9CA3AF',
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
