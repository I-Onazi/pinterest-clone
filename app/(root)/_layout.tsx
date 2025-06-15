import React from 'react'
import { Tabs } from 'expo-router'
// import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarShowLabel:false}}>
        <Tabs.Screen name='index'
        options={{
            tabBarIcon:({color, size})=><FontAwesome name="home" size={size} color={color} />,
            tabBarLabel: 'Home',
        }}/>
        <Tabs.Screen name='CreatePin'
        options={{
            tabBarIcon:({color, size})=><FontAwesome name="plus" size={size} color={color} />,
            tabBarLabel: 'Home',
        }}/>
        <Tabs.Screen name='Profile'
        options={{
            tabBarIcon:({color, size})=><FontAwesome name="user" size={size} color={color} />,
            tabBarLabel: 'Profile',
        }}/>
    </Tabs>
  )
}
