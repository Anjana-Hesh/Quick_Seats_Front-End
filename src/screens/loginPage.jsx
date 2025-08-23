// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const { width, height } = Dimensions.get('window');

// /////////////////

// const users = [];

// const LoginScreen = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   // connection

//   async function connection(name, password) {
//     try {
//       let userdetails;
//       const datas = await AsyncStorage.getItem('selectedData');
//       if (data !== null) {
//         const d = JSON.parse(data);
//         console.log('Retrieved data:', d);
//         userdetails = {
//           email: d.email, // ✅ just the value
//           password: d.password,
//         };
//       }

//       console.log('Sending:', userdetails);

//       const response = await fetch(
//         'http://10.48.140.203:8080/api/v1/user/log-in-user',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json', // ✅ fix case
//           },
//           body: JSON.stringify(userdetails),
//         },
//       );

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       const data = await response.json();
//       console.log('Response:', data);

//       Alert.alert('Success', 'Login successful!');
//       return data;
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert('Error', error.message);
//       return false;
//     }
//   }

//   // Utility function to store data
//   async function storeLocalData(key, data) {
//     try {
//       await AsyncStorage.setItem(key, JSON.stringify(data));
//       console.log('Data stored successfully:', data);
//     } catch (error) {
//       console.log('Error storing data:', error);
//     }
//   }

//   const handleLogin = async function () {
//     // Check if fields are empty
//     if (!username.trim() || !password.trim()) {
//       Alert.alert('Error', 'Please enter both username and password');
//       return;
//     }

//     try {
//       // const userInfo = await connection(username.trim(), password.trim());

//       // console.log('role', userInfo.data.role);
//       // console.log('Username:', username);
//       // console.log('Password:', password);
//       let userdetails;
//       const datas = await AsyncStorage.getItem('usersArray');
//       let role;
//       if (datas !== null) {
//         const d = JSON.parse(datas);
//         console.log('Retrieved datas:', d);
//         d.forEach(element => {
//           if (d.email === username && d.password === password) {
//             role = d.role;
//           }
//         });
//         userdetails = {
//           email: d.email, // ✅ just the value
//           password: d.password,
//         };
//       }

//       const l = 'Customer';
//       switch (role) {
//         case 'Customer':
//           storeLocalData('Username', username);
//           // storeLocalData('token', userInfo.data.accessToken);
//           navigation.navigate('CustomerHome');
//           break;
//         case 'Owner':
//           storeLocalData('Username', username);
//           ////storeLocalData('token', userInfo.data.accessToken);
//           navigation.navigate('OwnerHome');
//           break;
//         case 'Driver':
//           storeLocalData('Username', username);
//           //storeLocalData('token', userInfo.data.accessToken);
//           navigation.navigate('DriverHome');
//           break;
//         default:
//           Alert.alert('Error', 'Invalid role received from server');
//           break;
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Gradient Background */}
//       <View style={styles.gradientBackground} />

//       {/* Main Content Card */}
//       <View style={styles.contentCard}>
//         {/* Login Instructions */}
//         <View style={styles.instructionContainer}>
//           <Text style={styles.instructionTitle}>Login Instructions:</Text>
//           <Text style={styles.instructionText}>• Enter "b" for Bus Driver</Text>
//           <Text style={styles.instructionText}>• Enter "o" for Owner</Text>
//           <Text style={styles.instructionText}>• Enter "c" for Customer</Text>
//         </View>

//         {/* Input Container */}
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="User Name (b/o/c)"
//             placeholderTextColor="#0F766E"
//             value={username}
//             onChangeText={setUsername}
//             autoCapitalize="none"
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             placeholderTextColor="#0F766E"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//         </View>

//         {/* Sign In Button */}
//         <TouchableOpacity
//           style={styles.signInButton}
//           onPress={handleLogin}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.signInButtonText}>Sign In</Text>
//         </TouchableOpacity>

//         {/* Register Link */}
//         <TouchableOpacity
//           style={styles.registerLink}
//           onPress={() => navigation.navigate('Register')}
//         >
//           <Text style={styles.registerText}>
//             Don't have an account? Register
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//   },
//   gradientBackground: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: height * 0.4,
//     backgroundColor: '#3B82F6',
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//   },
//   contentCard: {
//     flex: 1,
//     marginTop: height * 0.25,
//     backgroundColor: 'white',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 30,
//     paddingTop: 40,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: -5,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
//   instructionContainer: {
//     backgroundColor: '#F8F9FA',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 25,
//     borderLeftWidth: 4,
//     borderLeftColor: '#3B82F6',
//   },
//   instructionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1F2937',
//     marginBottom: 8,
//   },
//   instructionText: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 2,
//   },
//   inputContainer: {
//     marginBottom: 30,
//   },
//   input: {
//     height: 55,
//     borderColor: '#E5E7EB',
//     borderWidth: 1,
//     borderRadius: 15,
//     paddingHorizontal: 20,
//     marginBottom: 20,
//     fontSize: 16,
//     backgroundColor: '#FAFAFA',
//     color: '#1F2937',
//   },
//   signInButton: {
//     backgroundColor: '#1E293B',
//     paddingVertical: 18,
//     borderRadius: 15,
//     alignItems: 'center',
//     marginBottom: 30,
//     elevation: 3,
//     shadowColor: '#1E293B',
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   signInButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   registerLink: {
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   registerText: {
//     color: '#3B82F6',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

// export default LoginScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to get user data from AsyncStorage
  async function getUserData() {
    try {
      const userData = await AsyncStorage.getItem('usersArray');
      if (userData !== null) {
        return JSON.parse(userData);
      }
      return [];
    } catch (error) {
      console.log('Error retrieving user data:', error);
      return [];
    }
  }

  // Function to authenticate user locally
  async function authenticateUser(email, password) {
    try {
      const users = await getUserData();

      // If users is an array, find the user
      if (Array.isArray(users)) {
        const user = users.find(
          u => u.email === email && u.password === password,
        );
        return user || null;
      }

      // If users is a single object, check directly
      if (users.email === email && users.password === password) {
        return users;
      }

      return null;
    } catch (error) {
      console.log('Error authenticating user:', error);
      return null;
    }
  }

  // Server connection function (keep your original logic)
  async function serverConnection(email, password) {
    try {
      const userdetails = {
        email: email,
        password: password,
      };

      console.log('Sending to server:', userdetails);

      const response = await fetch(
        'http://10.48.140.203:8080/api/v1/user/log-in-user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userdetails),
        },
      );

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Server response:', data);
      return data;
    } catch (error) {
      console.error('Server connection error:', error);
      throw error;
    }
  }

  // Utility function to store data
  async function storeLocalData(key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log('Data stored successfully:', key, data);
    } catch (error) {
      console.log('Error storing data:', error);
    }
  }

  const handleLogin = async function () {
    // Check if fields are empty
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    try {
      // First, try to authenticate locally
      const localUser = await authenticateUser(
        username.trim(),
        password.trim(),
      );

      let userRole = null;
      let userInfo = null;

      if (localUser) {
        // User found locally
        console.log('User authenticated locally:', localUser);
        userRole = localUser.role;
        userInfo = localUser;
      } else {
        // Try server authentication
        try {
          const serverResponse = await serverConnection(
            username.trim(),
            password.trim(),
          );
          if (serverResponse && serverResponse.data) {
            userRole = serverResponse.data.role;
            userInfo = serverResponse.data;

            // Store server response locally for future use
            await storeLocalData('currentUser', serverResponse.data);
          }
        } catch (serverError) {
          Alert.alert(
            'Error',
            'Invalid credentials. Please check your username and password.',
          );
          return;
        }
      }

      if (!userRole) {
        Alert.alert('Error', 'Unable to determine user role');
        return;
      }

      // Store current session data
      await storeLocalData('Username', username.trim());
      await storeLocalData('currentUser', userInfo);

      if (userInfo && userInfo.accessToken) {
        await storeLocalData('token', userInfo.accessToken);
      }

      // Navigate based on role
      switch (userRole) {
        case 'Customer':
          Alert.alert('Success', 'Login successful as Customer!');
          navigation.navigate('CustomerHome');
          break;
        case 'Owner':
          Alert.alert('Success', 'Login successful as Owner!');
          navigation.navigate('OwnerHome');
          break;
        case 'Driver':
          Alert.alert('Success', 'Login successful as Driver!');
          navigation.navigate('DriverHome');
          break;
        default:
          Alert.alert('Error', `Unknown role: ${userRole}`);
          break;
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <View style={styles.gradientBackground} />

      {/* Main Content Card */}
      <View style={styles.contentCard}>
        {/* Login Instructions */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionTitle}>Login Instructions:</Text>
          <Text style={styles.instructionText}>• Enter your email address</Text>
          <Text style={styles.instructionText}>• Enter your password</Text>
          <Text style={styles.instructionText}>
            • Available roles: Customer, Owner, Driver
          </Text>
        </View>

        {/* Input Container */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#0F766E"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#0F766E"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Register Link */}
        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
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
    height: height * 0.4,
    backgroundColor: '#3B82F6',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  contentCard: {
    flex: 1,
    marginTop: height * 0.25,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  instructionContainer: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
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
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#1F2937',
  },
  signInButton: {
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
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  registerLink: {
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginScreen;
