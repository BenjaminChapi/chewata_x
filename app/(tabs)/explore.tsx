import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack } from 'expo-router';
import AllRooms from '@/components/rooms/AllRooms';
import OngoingRooms from '@/components/rooms/OngoingRooms';
import WaitingRooms from '@/components/rooms/WaitingRooms';
import ExpiredRooms from '@/components/rooms/ExpiredRooms';

const Tab = createMaterialTopTabNavigator();

export default function Explore() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown:true,
          title: 'Explore Rooms',
          headerStyle: { backgroundColor: '#6200EA' },
          headerTintColor: '#fff',
        }}
      />
      
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#6200EA',
          tabBarInactiveTintColor: '#666',
          tabBarIndicatorStyle: { backgroundColor: '#6200EA' },
          tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
        }}
      >
        <Tab.Screen name="All" component={AllRooms} />
        <Tab.Screen name="Ongoing" component={OngoingRooms} />
        <Tab.Screen name="Waiting" component={WaitingRooms} />
        <Tab.Screen name="Expired" component={ExpiredRooms} />
      </Tab.Navigator>
    </View>
  );
}
