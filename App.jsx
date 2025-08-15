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
import SearchBus from './src/screens/searchBus';
import SearchBookings from './src/screens/searchBooking'
import CheckLocation from './src/screens/checkLocation'
import MessageDetails from './src/screens/messageDetails'
import MessageInbox from './src/screens/messageInbox'
import BookingDetailsScreen from './src/screens/bookingDetails';
import BusLocationScreen from './src/screens/busLocationScreen';
import BoockingDate from './src/screens/boockingDate'
import DriverHome from './src/screens/driverHome';
import DriverBooking from './src/screens/driverBookingPage';
import DriverBookingData from './src/screens/driverBookingData';
import DriverMessage from './src/screens/driverMessage';
import SeatAvailability from './src/screens/seatsAvailability';
import BusSetting from './src/screens/busSetting';
import OwnerSettings from './src/screens/ownerSettings';
import CustomerSettings from './src/screens/customerSettings';
import OwnerHome from './src/screens/ownerHome';
import DriverBookingDataPrice from './src/screens/driveBookingDataPrice';
import AddDriverPage from './src/screens/addDriverPage';

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
        <Stack.Screen name='SearchBus' component={SearchBus} />
        <Stack.Screen name='SearchBookings' component={SearchBookings} />
        <Stack.Screen name='CheckLocation' component={CheckLocation} />
        <Stack.Screen name='MessageDetails' component={MessageDetails} />
        <Stack.Screen name='MessageInbox' component={MessageInbox} />
        <Stack.Screen name="BookingDetails" component={BookingDetailsScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="BusLocationScreen" component={BusLocationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BoockingDate" component={BoockingDate} options={{ headerShown: false }} />
        <Stack.Screen name="DriverHome" component={DriverHome} />
        <Stack.Screen name="DriverBooking" component={DriverBooking} />
        <Stack.Screen name="DriverBookingData" component={DriverBookingData} />
        <Stack.Screen name="DriverMessage" component={DriverMessage} />
        <Stack.Screen name="SeatAvailability" component={SeatAvailability} />
        <Stack.Screen name="BusSetting" component={BusSetting} />
        <Stack.Screen name="OwnerSettings" component={OwnerSettings} />
        <Stack.Screen name="CustomerSettings" component={CustomerSettings} />
        <Stack.Screen name="OwnerHome" component={OwnerHome} />
        <Stack.Screen name="DriverBookingDataPrice" component={DriverBookingDataPrice} />
        <Stack.Screen name="AddDriverPage" component={AddDriverPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}