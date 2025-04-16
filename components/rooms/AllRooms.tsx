import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { RoomCard } from './RoomCard';
import { rooms } from '@/data/rooms';
import { router } from 'expo-router';

export default function AllRooms() {
  const handleRoomPress = (room: any) => {
    switch (room.status) {
      case 'Ongoing':
        router.push(`/room/${room.id}`);
        break;
      case 'Waiting':
        router.push(`/waiting-room/${room.id}`);
        break;
      case 'Expired':
        router.push(`/expired-room/${room.id}`);
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {rooms.map(room => (
        <TouchableOpacity 
          key={room.id} 
          onPress={() => handleRoomPress(room)}
          activeOpacity={0.7}
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