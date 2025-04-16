import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import {House, MessagesSquare, User} from 'lucide-react-native'

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
        tabBarActiveTintColor:'#000'
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <House size={24} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Room',
          tabBarIcon: ({ color }) => <MessagesSquare size={24} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} fill={color}/>,
        }}
      />
    </Tabs>
  );
}
