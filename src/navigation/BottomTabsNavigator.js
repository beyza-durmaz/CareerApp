import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MyIcon from '../components/MyIcon';
import ConnectionScreen from '../screens/ConnectionScreen';
import ShareScreen from '../screens/ShareScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='HomeScreen' screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
    }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <MyIcon name="home" color="black" size={25} />
          ),
        }} />
      <Tab.Screen
        name="ConnectionScreen"
        component={ConnectionScreen}
        options={{
          tabBarIcon: () => (
            <MyIcon name="people" color="black" size={25} />
          ),
        }} />
      <Tab.Screen
        name="ShareScreen"
        component={ShareScreen}
        options={{
          tabBarIcon: () => (
            <MyIcon name="add-circle" color="black" size={25} />
          ),
        }} />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <MyIcon name="person-circle-outline" color="black" size={25} />
          ),
        }} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
