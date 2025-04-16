import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { RoomCard } from './RoomCard';
import { rooms } from '@/data/rooms';
import { router } from 'expo-router';

export default function OngoingRooms() {
  const allRooms = rooms;
  
  const handleRoomPress = (room: any) => {
    router.push({
      pathname: "/room/[id]",
      params: { id: room.id }
    });
  };

  return (
    <ScrollView style={styles.container}>
      {allRooms.map(room => (
        <TouchableOpacity 
          key={room.id} 
          onPress={() => handleRoomPress(room)}
        >
          <RoomCard room={room} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});