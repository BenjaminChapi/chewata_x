import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Avatar } from '@/components/chat/Avatar';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { rooms } from '@/data/rooms';
import { VoiceMessageBubble } from '@/components/chat/VoiceMessageBubble';
import { Audio } from 'expo-av';
import { Mic, Send, StopCircle } from 'lucide-react-native';

interface Message {
  id: string;
  type?: 'voice' | 'text';
  message?: string;
  audioUrl?: string;
  duration?: number;
  time: string;
  user: {
    name: string;
    avatar: string;
  };
  isSystem?: boolean;
}

export default function RoomDetail() {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  useEffect(() => {
    const room = rooms.find(r => r.id.toString() === id);
    if (!room || room.status !== 'Ongoing') {
      router.back();
    }
  }, [id]);

  const messages: Message[] = [
    {
      id: '1',
      type: 'text',
      message: 'Welcome to Friday Fun Night! Game will start when all players are ready.',
      time: '5:49 PM',
      user: {
        name: 'Emily Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      isSystem: true,
    },
    {
      id: '2',
      type: 'text',
      message: 'Hey everyone! Ready for some fun?',
      time: '5:49 PM',
      user: {
        name: 'Emily Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
    },
    {
      id: '3',
      type: 'voice',
      audioUrl: 'your-audio-url',
      duration: 45,
      time: '5:50 PM',
      user: {
        name: 'Emily Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
    },
  ];

  const players = [
    { id: '1', name: 'Emily Johnson', avatar: 'https://i.pravatar.cc/150?img=1', isHost: true },
    { id: '2', name: 'Alex Mitchell', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=3' },
  ];

  const [typingUsers, setTypingUsers] = useState([
    { id: '2', name: 'Alex Mitchell', avatar: 'https://i.pravatar.cc/150?img=2' },
  ]);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);

      // You can push this to a real state array if needed
      console.log('Recorded audio URI:', uri);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Friday Fun Night',
          headerStyle: { backgroundColor: '#6200EA' },
          headerTintColor: '#fff',
          headerTitle: () => (
            <View>
              <Text style={styles.headerTitle}>Friday Fun Night</Text>
              <View style={styles.headerRight}>
                <Text style={styles.playerCount}>5/8 players</Text>
                <View style={styles.gameType}>
                  <Text style={styles.gameTypeText}>Truth or Dare</Text>
                </View>
              </View>
            </View>
          ),
        }}
      />

      <ScrollView style={styles.chatContainer} contentContainerStyle={{ paddingVertical: 16 }}>
        {messages.map((msg, index) => {
          const isCurrentUser = msg.user.name === 'Alex Mitchell';

          if (msg.type === 'voice') {
            return (
              <VoiceMessageBubble
                key={msg.id}
                audioUrl={msg.audioUrl || ''}
                duration={msg.duration || 0}
                isOwn={isCurrentUser}
              />
            );
          }

          return (
            <ChatBubble
              key={msg.id}
              message={msg.message || ''}
              time={msg.time}
              user={msg.user}
              isCurrentUser={isCurrentUser}
              delay={index * 150}
            />
          );
        })}

        {typingUsers.map(user => (
          <ChatBubble key={`typing-${user.id}`} message="" time="" user={user} isTyping={true} />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.players}>
          {players.map((player, index) => (
            <View key={player.id} style={styles.playerItem}>
              <Avatar uri={player.avatar} size={32} online delay={index * 150} />
              {player.isHost && <Text style={styles.hostBadge}>Host</Text>}
            </View>
          ))}
        </ScrollView>

        {!isRecording ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={startRecording}>
              <Mic color="#6200EA" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton}>
            <Send color="#6200EA" size={24} />
          </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <View style={styles.recordingContainer}>
              <Text style={styles.recordingText}>Recording...</Text>
            </View>
            <TouchableOpacity style={[styles.sendButton, styles.recordingButton]} onPress={stopRecording}>
              <StopCircle color="#FF5252" size={24} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  playerCount: { color: '#fff', fontSize: 14 },
  gameType: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gameTypeText: { color: '#fff', fontSize: 12 },
  chatContainer: { flex: 1 },
  footer: { borderTopWidth: 1, borderTopColor: '#eee', padding: 12 },
  players: { marginBottom: 12 },
  playerItem: { marginRight: 12, alignItems: 'center' },
  hostBadge: { fontSize: 10, color: '#6200EA', marginTop: 4 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingText: { color: '#FF5252', fontSize: 16 },
  recordingButton: { backgroundColor: '#FFF0F0' },
});
