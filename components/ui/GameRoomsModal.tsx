import React, { useState } from 'react';
import { CreateRoomModal } from './CreateRoomModal';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { X, Plus } from 'lucide-react-native';
import { Button } from './Button';

interface GameRoom {
  id: number;
  title: string;
  host: string;
  players: string;
  status: 'Ongoing' | 'Waiting';
}

interface GameRoomsModalProps {
  visible: boolean;
  onClose: () => void;
  gameType: string;
}

export function GameRoomsModal({ visible, onClose, gameType }: GameRoomsModalProps) {
    const [createRoomVisible, setCreateRoomVisible] = useState(false);
  const rooms: GameRoom[] = [
    {
      id: 1,
      title: 'Friday Fun Night',
      host: 'Emily Johnson',
      players: '5/8',
      status: 'Ongoing',
    },
    {
      id: 2,
      title: 'Truth Masters',
      host: 'Alex Chen',
      players: '3/6',
      status: 'Waiting',
    },
    {
      id: 3,
      title: 'Dare Champions',
      host: 'Sarah Williams',
      players: '2/8',
      status: 'Waiting',
    },
    {
      id: 4,
      title: 'Friday Fun Night',
      host: 'Emily Johnson',
      players: '5/8',
      status: 'Ongoing',
    },
    {
      id: 5,
      title: 'Truth Masters',
      host: 'Alex Chen',
      players: '3/6',
      status: 'Waiting',
    },
    {
      id: 6,
      title: 'Dare Champions',
      host: 'Sarah Williams',
      players: '2/8',
      status: 'Waiting',
    },
  ];

  return (
    <>
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>{gameType} Rooms</Text>
              <TouchableOpacity onPress={onClose}>
                <X size={20} color="#000" />
              </TouchableOpacity>
            </View>

            <Button
              title="Start New Game"
              onPress={() => setCreateRoomVisible(true)}
              style={styles.newGameButton}
              icon={<Plus size={20} color="#fff" />}
            />

            <Text style={styles.subtitle}>Available Rooms</Text>

            <ScrollView style={styles.roomsList} showsVerticalScrollIndicator={false}>
              {rooms.map((room) => (
                <View key={room.id} style={styles.roomItem}>
                  <View>
                    <Text style={styles.roomTitle}>{room.title}</Text>
                    <Text style={styles.hostText}>Hosted by {room.host}</Text>
                    <View style={styles.roomStats}>
                      <Text style={styles.playersText}>👥 {room.players}</Text>
                      <Text style={[
                        styles.statusText,
                        { color: room.status === 'Ongoing' ? '#4CAF50' : '#2196F3' }
                      ]}>⦿ {room.status}</Text>
                    </View>
                  </View>
                  <Button
                    title="Join"
                    onPress={() => {}}
                    style={styles.joinButton}
                    textStyle={styles.joinButtonText}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <CreateRoomModal
        visible={createRoomVisible}
        onClose={() => setCreateRoomVisible(false)}
        gameType={gameType}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    maxHeight: '70%',
    margin: 8,
  },
  roomsList: {
    flexGrow: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  newGameButton: {
    backgroundColor: '#E91E63',
    marginBottom: 24,
    flexDirection: 'row',
    gap: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  roomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 12,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  hostText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  roomStats: {
    flexDirection: 'row',
    gap: 12,
  },
  playersText: {
    fontSize: 14,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  joinButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  joinButtonText: {
    fontSize: 14,
  },
});