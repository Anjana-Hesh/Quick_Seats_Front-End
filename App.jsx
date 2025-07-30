import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';

import GetStartScreen from './src/screens/getStartScreen';
import LoginPage from './src/screens/loginPage';
import Register from './src/screens/registrationPage';
import BusSignUp from './src/screens/busSignUp';
import BusData from './src/screens/busData';
import CustomerHome from './src/screens/customerHome';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (replace with your actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Show splash screen while loading
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        {/* Alternatively, you can render your custom splash screen component */}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="GetStart" 
        screenOptions={{ 
          headerShown: false,
          animation: 'fade' // Smooth transition between screens
        }}
      >
        <Stack.Screen name="GetStart" component={GetStartScreen} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="BusSignUp" component={BusSignUp} />
        <Stack.Screen name="BusData" component={BusData} />
        <Stack.Screen name="CustomerHome" component={CustomerHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}