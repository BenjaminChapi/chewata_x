import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { rooms } from '@/data/rooms';
import { Avatar } from '@/components/chat/Avatar';
import { Clock, Users } from 'lucide-react-native';
import { ChatBubble } from '@/components/chat/ChatBubble';

export default function ExpiredRoom() {
  const { id } = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const membersFade = useRef(new Animated.Value(0)).current;
  const chatFade = useRef(new Animated.Value(0)).current;

  const [roomData, setRoomData] = useState<any>(null);

  useEffect(() => {
    const room = rooms.find(r => r.id.toString() === id);
    if (!room || room.status !== 'Expired') {
      router.back();
      return;
    }
    setRoomData({
      ...room,
      members: [
        { id: '1', name: 'Emily Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: '2', name: 'Alex Mitchell', avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: '3', name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=3' },
        { id: '1', name: 'Emily Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: '2', name: 'Alex Mitchell', avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: '3', name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=3' },
        { id: '1', name: 'Emily Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: '2', name: 'Alex Mitchell', avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: '3', name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=3' },
      ],
      chats: [
        { id: '1', sender: 'Emily Johnson', message: 'That was a fun game!', timestamp: '20:30' },
        { id: '2', sender: 'Alex Mitchell', message: 'We should play again sometime', timestamp: '20:31' },
        { id: '3', sender: 'Michael Chen', message: 'Definitely! Great game everyone', timestamp: '20:32' },
        { id: '1', sender: 'Emily Johnson', message: 'That was a fun game!', timestamp: '20:30' },
        { id: '2', sender: 'Alex Mitchell', message: 'We should play again sometime', timestamp: '20:31' },
        { id: '3', sender: 'Michael Chen', message: 'Definitely! Great game everyone', timestamp: '20:32' },
        { id: '1', sender: 'Emily Johnson', message: 'That was a fun game!', timestamp: '20:30' },
        { id: '2', sender: 'Alex Mitchell', message: 'We should play again sometime', timestamp: '20:31' },
        { id: '3', sender: 'Michael Chen', message: 'Definitely! Great game everyone', timestamp: '20:32' },
        { id: '1', sender: 'Emily Johnson', message: 'That was a fun game!', timestamp: '20:30' },
        { id: '2', sender: 'Alex Mitchell', message: 'We should play again sometime', timestamp: '20:31' },
        { id: '3', sender: 'Michael Chen', message: 'Definitely! Great game everyone', timestamp: '20:32' },
        { id: '1', sender: 'Emily Johnson', message: 'That was a fun game!', timestamp: '20:30' },
        { id: '2', sender: 'Alex Mitchell', message: 'We should play again sometime', timestamp: '20:31' },
        { id: '3', sender: 'Michael Chen', message: 'Definitely! Great game everyone', timestamp: '20:32' },
      ]
    });

    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(membersFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        delay: 200,
      }),
      Animated.timing(chatFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        delay: 200,
      }),
    ]).start();
  }, [id]);

  if (!roomData) return null;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Expired Room',
          headerStyle: { backgroundColor: '#9E9E9E' },
          headerTintColor: '#fff',
          headerRight: () => (
            <View style={styles.headerRight}>
              <Clock size={24} color="#fff" />
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerExpiredText}>Room Expired</Text>
                <Text style={styles.headerSubText}>Game session has ended</Text>
              </View>
            </View>
          ),
        }}
      />

      <View style={styles.scrollContainer}>
        {/* Members Section - Horizontal Scroll */}
        <Animated.View style={[styles.section, { opacity: membersFade }]}>
          <View style={styles.sectionHeader}>
            <Users size={24} color="#9E9E9E" />
            <Text style={styles.sectionTitle}>Previous Members</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.membersContent}
          >
            {roomData.members.map((member: any) => (
              <View key={member.id} style={styles.memberCardHorizontal}>
                <Avatar uri={member.avatar} size={32} />
                <Text style={styles.memberNameHorizontal}>{member.name}</Text>
              </View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Chat Section - Vertical Scroll */}
        <Animated.View style={[styles.section, { opacity: chatFade, flex: 1 }]}>
          <Text style={styles.sectionTitle}>Game Chat History</Text>
          <ScrollView 
            style={styles.chatScroll}
            showsVerticalScrollIndicator={false}
          >
            {roomData.chats.map((chat: any, index: number) => (
              <ChatBubble
                key={`${chat.id}-${index}`}
                message={chat.message}
                time={chat.timestamp}
                user={{
                  name: chat.sender,
                  avatar: roomData.members.find((m: any) => m.name === chat.sender)?.avatar || '',
                }}
                delay={index * 500}
              />
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </View>
  );
}

// Add new styles for headerRight component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20, // Add padding to ensure content is scrollable
  },
  content: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  expiredText: {
    fontSize: 24,
    color: '#9E9E9E',
    marginTop: 16,
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#757575',
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#424242',
    fontWeight: '600',
    marginLeft: 8,
    marginBottom:10
  },
  membersHorizontal: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  memberCardHorizontal: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  memberNameHorizontal: {
    marginTop: 4,
    fontSize: 12,
    color: '#424242',
  },
  chatItem: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  chatSender: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 4,
  },
  chatMessage: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 4,
  },
  chatTime: {
    fontSize: 12,
    color: '#9E9E9E',
    alignSelf: 'flex-end',
  },
  chatContainer: {
    maxHeight: 300, // Adjust the height as needed
    overflow: 'hidden',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  headerTextContainer: {
    marginLeft: 8,
  },
  headerExpiredText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerSubText: {
    fontSize: 12,
    color: '#fff',
  },
  membersContent: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  chatScroll: {
    flex: 1,
    paddingHorizontal: 8,
    marginTop: 10,
  },
});