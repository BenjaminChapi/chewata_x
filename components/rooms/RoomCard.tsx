import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { useRouter } from 'expo-router';

interface Room {
  id: number;
  title: string;
  host: string;
  players: string;
  status: 'Ongoing' | 'Waiting' | 'Expired';
  gameType: string;
  lastActive?: string;
}

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const router = useRouter();

  const handlePress = () => {
    switch (room.status) {
      case 'Ongoing':
        router.push({
          pathname: "/room/[id]",
          params: { id: room.id }
        });
        break;
      case 'Waiting':
        router.push({
          pathname: "/waiting-room/[id]",
          params: { id: room.id }
        });
        break;
      case 'Expired':
        router.push({
          pathname: "/expired-room/[id]",
          params: { id: room.id }
        });
        break;
    }
  };

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ongoing': return '#4CAF50';
      case 'Waiting': return '#2196F3';
      case 'Expired': return '#9E9E9E';
      default: return '#000';
    }
  };

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[
        styles.roomCard,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        <View style={styles.roomHeader}>
          <Text style={styles.roomTitle}>{room.title}</Text>
          <Text style={[styles.statusBadge, { color: getStatusColor(room.status) }]}>
            ⦿ {room.status}
          </Text>
        </View>
        
        <Text style={styles.gameType}>{room.gameType}</Text>
        <Text style={styles.hostText}>Hosted by {room.host}</Text>
        
        <View style={styles.roomFooter}>
          <Text style={styles.playersText}>👥 {room.players}</Text>
          <Text style={styles.lastActive}>{room.lastActive}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  roomCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    height: 140, // Increased height
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusBadge: {
    fontSize: 14,
    fontWeight: '500',
  },
  gameType: {
    fontSize: 14,
    color: '#6200EA',
    marginBottom: 4,
  },
  hostText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 12,
  },
  roomFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playersText: {
    fontSize: 14,
  },
  lastActive: {
    fontSize: 12,
    color: '#666',
  },
});