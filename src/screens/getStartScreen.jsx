import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getLocalDataTime() {
  try {
    const data = await AsyncStorage.getItem('selectedRoute');
    if (data !== null) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.log('Error reading route:', error);
  }
}

// connection
async function connection(url, method) {
  const response = fetch(url, {
    method: { method },
    headers: {
      'content-Type': 'application/json',
      Authorization: '',
    },
    body: JSON.stringify(),
  });

  if (!(await response).ok) {
    throw new Error('Error');
  }

  const data = (await response).json();
  Alert.alert('Success');
  return data;
}

const GetStartScreen = ({ navigation }) => {
  const buttonScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/startBackgroundImage.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        translucent
        backgroundColor="transparent"
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={styles.button}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.8}
              onPress={navigateToLogin}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '126%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '80%',
  },
  content: {
    marginBottom: Platform.OS === 'ios' ? 40 : 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'rgba(30, 42, 120, 0.9)',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
});

export default GetStartScreen;
