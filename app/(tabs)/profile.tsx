import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { router, Stack } from 'expo-router';
import { Settings } from 'lucide-react-native';
import Level from '@/components/profile/Level';
import Premium from '@/components/profile/Premium';
import RecentAchievements from '@/components/profile/RecentAchievements';
import GameHistory from '@/components/profile/GameHistory';
import GameStatus from '@/components/profile/GameStatus';

interface Achievement {
  id: string;
  title: string;
  icon: string;
  color: string;
}

interface GameHistory {
  id: string;
  title: string;
  score: number;
  time: string;
  icon: string;
}

export default function Profile() {
  const achievements: Achievement[] = [
    { id: '1', title: 'Quick Thinker', icon: '⚡', color: 'rgba(255,160,0,0.2)' },
    { id: '2', title: 'Word Master', icon: '📚', color: 'rgba(144,202,249,0.2)' },
    { id: '3', title: 'Team Player', icon: '👥', color: 'rgba(165,214,167,0.2)' },
    { id: '4', title: 'Quiz Champion', icon: '🏆', color: 'rgba(225,190,231,0.2)' },
  ];

  const gameHistory: GameHistory[] = [
    { id: '1', title: 'Movie Trivia', score: 850, time: '2h ago', icon: '🏆' },
    { id: '2', title: 'Word Chain', score: 620, time: '5h ago', icon: '❌' },
    { id: '3', title: 'Emoji Quiz', score: 940, time: 'Yesterday', icon: '🏆' },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'GameHub',
          headerShown: true,
          headerStyle: { backgroundColor: '#6200EA' },
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity style={{marginRight:10}} onPress={() => router.push('/settings')}>
              <Settings color="#fff" size={24} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            style={styles.avatar}
          />
          <Text style={styles.username}>Alex Mitchell</Text>
          <Text style={styles.handle}>@alexmitchell</Text>
          
          <View style={styles.badges}>
            <Level level={40}/>
            <Premium/>
          </View>
          <GameStatus Gameplayed={30} WinRate={30} Rating={4.5}/>
        </View>

        <Text style={styles.sectionTitle}>Recent Achievements</Text>
        <View style={styles.achievements}>
          {achievements.map(achievement => (
            <RecentAchievements achievement={achievement}/>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Game History</Text>
        <View style={styles.gameHistory}>
          {gameHistory.map(game => (
            <GameHistory game={game}/>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical:10
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  handle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  badges: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 8,
    borderRadius: 20,
    gap: 4,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  badgeIcon: {
    fontSize: 16,
  },
  badgeValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  achievements: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  gameHistory: {
    gap: 12,
  },
});