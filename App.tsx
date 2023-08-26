import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import UpdateProfileScreen from './src/screens/UpdateProfileScreen';
import UpdatePassword from './src/screens/UpdatePassword';
import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';
import ConnectionScreen from './src/screens/ConnectionScreen';

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    checkUserLoginStatus();
  }, []);

  const checkUserLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking user login status:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isUserLoggedIn ? 'BottomTabsNavigator' : 'WelcomeScreen'}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        <Stack.Screen name='SignupScreen' component={SignupScreen} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
        <Stack.Screen name='UpdateProfileScreen' component={UpdateProfileScreen} />
        <Stack.Screen name='UpdatePassword' component={UpdatePassword} />
        <Stack.Screen name='ConnectionScreen' component={ConnectionScreen} />
        <Stack.Screen name="BottomTabsNavigator" component={BottomTabsNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App