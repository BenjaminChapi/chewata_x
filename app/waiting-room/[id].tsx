import { View, Text, StyleSheet, Animated, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Avatar } from '@/components/chat/Avatar';
import { rooms } from '@/data/rooms';
import { Check, Settings, Users, GamepadIcon, X, Share } from 'lucide-react-native';

export default function WaitingRoom() {
  const { id } = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [isHost] = useState(true); // Replace with actual host check
  const [editMode, setEditMode] = useState(false);

  const players = [
    { id: '1', name: 'Emily Johnson', avatar: 'https://i.pravatar.cc/150?img=1', isHost: true },
    { id: '2', name: 'Alex Mitchell', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '1', name: 'Emily Johnson', avatar: 'https://i.pravatar.cc/150?img=1', isHost: true },
    { id: '2', name: 'Alex Mitchell', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '1', name: 'Emily Johnson', avatar: 'https://i.pravatar.cc/150?img=1', isHost: true },
    { id: '2', name: 'Alex Mitchell', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '1', name: 'Emily Johnson', avatar: 'https://i.pravatar.cc/150?img=1', isHost: true },
    { id: '2', name: 'Alex Mitchell', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '1', name: 'Emily Johnson', avatar: 'https://i.pravatar.cc/150?img=1', isHost: true },
    { id: '2', name: 'Alex Mitchell', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=3' },
  ];

  useEffect(() => {
    const room = rooms.find(r => r.id.toString() === id);
    if (!room || room.status !== 'Waiting') {
      router.back();
      return;
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const [maxPlayers, setMaxPlayers] = useState(8);
  const [gameType, setGameType] = useState('Truth or Dare');
  const [showModal, setShowModal] = useState('');
  const settingsAnim = useRef(new Animated.Value(0)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;

  const gameTypes = ['Truth or Dare', 'Charades', 'Trivia', 'Word Chain'];
  const playerLimits = [4, 5, 6, 7, 8];

  const toggleEditMode = () => {
    Animated.parallel([
      Animated.spring(settingsAnim, {
        toValue: editMode ? 0 : 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: editMode ? 50 : 0,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();
    setEditMode(!editMode);
  };

  const openModal = (type: string) => {
    setShowModal(type);
    Animated.spring(modalAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.spring(modalAnim, {
      toValue: 0,
      friction: 6,
      useNativeDriver: true,
    }).start(() => setShowModal(''));
  };

  const handleOptionSelect = (value: string | number) => {
    if (showModal === 'players') {
      setMaxPlayers(value as number);
    } else if (showModal === 'game') {
      setGameType(value as string);
    }
    closeModal();
  };

  const modalTranslateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0]
  });

  const modalOpacity = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Stack.Screen
          options={{
            title: 'Waiting Room',
            headerStyle: { backgroundColor: '#FFA000' },
            headerTintColor: '#fff',
            headerRight: () => (
              isHost && (
                <TouchableOpacity onPress={toggleEditMode}>
                  <Animated.View style={{
                    transform: [{
                      rotate: settingsAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg']
                      })
                    }]
                  }}>
                    {editMode ? <Check color="#fff" size={24} /> : <Settings color="#fff" size={24} />}
                  </Animated.View>
                </TouchableOpacity>
              )
            ),
          }}
        />

        <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Animated.View style={[
            styles.infoContainer,
            editMode && styles.infoContainerEdit,
            { transform: [{ scale: settingsAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] }) }] }
          ]}>
            <Pressable style={styles.infoItem} onPress={() => editMode && openModal('players')}>
              <Users size={24} color="#FFA000" />
              <Text style={styles.infoText}>{players.length}/{maxPlayers} Players</Text>
              {editMode && <Text style={styles.editHint}>Tap to edit</Text>}
            </Pressable>
            <Pressable style={styles.infoItem} onPress={() => editMode && openModal('game')}>
              <GamepadIcon size={24} color="#FFA000" />
              <Text style={styles.infoText}>{gameType}</Text>
              {editMode && <Text style={styles.editHint}>Tap to edit</Text>}
            </Pressable>
          </Animated.View>

          <View style={styles.playersContainer}>
            <Text style={styles.sectionTitle}>Players</Text>
            <View style={styles.avatarGrid}>
              {players.map((player) => (
                <View key={player.id} style={[styles.playerCard, editMode && styles.playerCardEdit]}>
                  {editMode && !player.isHost && (
                    <TouchableOpacity style={styles.removeButton} onPress={() => {}}>
                      <X size={16} color="#FF5252" />
                    </TouchableOpacity>
                  )}
                  <Avatar uri={player.avatar} size={48} />
                  <Text style={styles.playerName}>{player.name}</Text>
                  {player.isHost && <Text style={styles.hostLabel}>Host</Text>}
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Fixed Start Button */}
      {isHost && (
        <Animated.View style={styles.fixedButtonContainer}>
          <TouchableOpacity 
            style={[styles.startButton, editMode && styles.startButtonDisabled]}
            disabled={editMode}
            onPress={() => {}}
          >
            <Text style={styles.startButtonText}>
              {editMode ? 'Finish Editing to Start' : 'Start Game'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Modal */}
      <Modal visible={!!showModal} transparent animationType="none">
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <Animated.View style={[styles.modalContent, {
            opacity: modalOpacity,
            transform: [{ translateY: modalTranslateY }]
          }]}>
            <Text style={styles.modalTitle}>
              {showModal === 'players' ? 'Select Max Players' : 'Select Game Type'}
            </Text>
            <View style={styles.optionsGrid}>
              {(showModal === 'players' ? playerLimits : gameTypes).map((option) => (
                <Pressable
                  key={option}
                  style={[
                    styles.optionButton,
                    (option === (showModal === 'players' ? maxPlayers : gameType)) && styles.optionButtonSelected
                  ]}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={{ color: '#424242', fontWeight: '600' }}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingBottom: 100 },
  content: { padding: 20 },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF8E1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoContainerEdit: {
    borderWidth: 2,
    borderColor: '#FFA000',
    borderStyle: 'dashed',
    backgroundColor: '#FFF8E1',
    transform: [{ scale: 1.02 }],
  },
  infoItem: { alignItems: 'center' },
  editHint: {
    fontSize: 10,
    color: '#FFA000',
    marginTop: 4,
    fontStyle: 'italic',
  },
  infoText: {
    marginTop: 4,
    color: '#FFA000',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#424242',
  },
  playersContainer: { flex: 1 },
  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  playerCard: {
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 12,
    borderRadius: 12,
    width: '45%',
  },
  playerCardEdit: {
    borderWidth: 1,
    borderColor: '#FFE0B2',
    borderStyle: 'dashed',
  },
  playerName: {
    marginTop: 8,
    fontSize: 14,
    color: '#424242',
  },
  hostLabel: {
    color: '#FFA000',
    fontSize: 12,
    marginTop: 4,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  startButton: {
    backgroundColor: '#FFA000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonDisabled: {
    backgroundColor: '#FFE0B2',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    zIndex: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#424242',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  optionButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF8E1',
    minWidth: '45%',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionButtonSelected: {
    backgroundColor: '#FFD54F',
  },
});
