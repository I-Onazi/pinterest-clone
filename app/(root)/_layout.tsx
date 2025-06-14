import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown: false}}>
        <Tabs.Screen name='index'
        options={{
            tabBarIcon:({color, size})=><Ionicons name="home-outline" size={size} color={color} />,
            tabBarLabel: 'Home',
        }}/>
        <Tabs.Screen name='Profile'
        options={{
            tabBarIcon:({color, size})=><Ionicons name="person-circle-outline" size={size} color={color} />,
            tabBarLabel: 'Profile',
        }}/>
    </Tabs>
  )
}
