import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Stack } from 'expo-router';
import { QuickActions } from '@/components/ui/QuickActions';
import { RoomCard } from '@/components/ui/RoomCard';
import { ArrowUpDown, Funnel } from 'lucide-react-native';
import { FilterModal } from '@/components/ui/FilterModal';
import { GameRoomsModal } from '@/components/ui/GameRoomsModal';

const FEATURED_GAMES = {
  title: 'Weekend Game Night',
  description: 'Join special room with bonus rewards!',
  // image: require('../../assets/images/featured-game.png'),
};

const QUICK_ACTIONS = [
  { id: 1, title: 'Truth or Dare', icon: '🎲' },
  { id: 2, title: 'Charades', icon: '🎭' },
  { id: 3, title: 'Trivia', icon: '🧩' },
  { id: 4, title: 'Word Games', icon: '📝' },
  { id: 5, title: 'Truth or Dare', icon: '🎲' },
  { id: 6, title: 'Charades', icon: '🎭' },
  { id: 7, title: 'Trivia', icon: '🧩' },
  { id: 8, title: 'Word Games', icon: '📝' },
];

const ACTIVE_ROOMS = [
  {
    id: 1,
    title: 'Friday Fun Night',
    host: 'Emily Johnson',
    players: '5/8',
    status: 'Ongoing',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Movie Buffs Trivia',
    host: 'Michael Chen',
    players: '3/6',
    status: 'Waiting',
    rating: 4.5,
  },
  {
    id: 3,
    title: 'Movie Buffs Trivia',
    host: 'Michael Chen',
    players: '4/4',
    status: 'Full',
    rating: 4.5,
  },
];

export default function Index() {
  const [gameRoomsVisible, setGameRoomsVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');

  const [filterVisible, setFilterVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const measureButton = (event: any, type: 'filter' | 'sort') => {
    event.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
      setButtonPosition({ x: pageX, y: pageY });
      if (type === 'filter') {
        setFilterVisible(true);
      } else {
        setSortVisible(true);
      }
    });
  };

  return (
    <>
     <Stack.Screen
      options={{
        headerStyle: { backgroundColor: '#6200EA' },
        headerTitleStyle: { color: '#fff' },
        headerShown: true,
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleText}>Game Hub</Text>
          </View>
        ),
        headerRight: () => (
          <View style={styles.headerLeftContainer}>
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerDate}>Tue, Apr 12</Text>
              <Text style={styles.headerWelcome}>Welcome Back</Text>
            </View>
            <TouchableOpacity style={styles.avatarButton}>
              <Text style={styles.avatarText}>👤</Text>
            </TouchableOpacity>
          </View>
        ),
      }}
    />
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

      {/* Featured Game */}
      <Text style={styles.sectionTitle}>Featured Game </Text>
      <View style={styles.featuredCard}>
        <Text style={styles.featuredTitle}>{FEATURED_GAMES.title}</Text>
        <Text style={styles.featuredDescription}>{FEATURED_GAMES.description}</Text>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Now</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <QuickActions
          actions={QUICK_ACTIONS}
          onActionPress={(action) => {
            setSelectedGame(action.title);
            setGameRoomsVisible(true);
          }}
        />

      <GameRoomsModal
        visible={gameRoomsVisible}
        onClose={() => setGameRoomsVisible(false)}
        gameType={selectedGame}
      />

      {/* Active Rooms */}
      <View style={styles.roomsHeader}>
        <Text style={styles.sectionTitle}>Active Rooms</Text>
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={(e) => measureButton(e, 'filter')}
          >
            <Funnel size={14} fill={"#000"}/>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={(e) => measureButton(e, 'sort')}
          >
            <ArrowUpDown size={14} fill={"#000"} color={"#000"}/>
            <Text style={styles.filterText}>Sort</Text>
          </TouchableOpacity>
        </View>
      </View>

      {ACTIVE_ROOMS.map((room) => (
        <RoomCard
          key={room.id}
          title={room.title}
          host={room.host}
          players={room.players}
          status={room.status as "Ongoing" | "Waiting" | 'Full'}
          rating={room.rating}
        />
      ))}
    </ScrollView>

    <FilterModal 
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        type="filter"
        position={buttonPosition}
      />
      <FilterModal 
        visible={sortVisible}
        onClose={() => setSortVisible(false)}
        type="sort"
        position={buttonPosition}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutText: {
    color: '#FF5252',
  },
  featuredCard: {
    backgroundColor: '#6200EA',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    height:160,
    justifyContent:'flex-end'
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:4
  },
  featuredDescription: {
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
  },
  joinButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: 100,
  },
  joinButtonText: {
    color: '#6200EA',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quickActions: {
    marginBottom: 24,
  },
  quickActionsContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  actionItem: {
    alignItems: 'center',
    width: 80,
  },
  iconContainer: {
    position: 'relative',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#6200EA',
    borderRadius: 25,
    opacity: 0.1,
  },
  actionIcon: {
    fontSize: 22,
    zIndex: 1,
    backgroundColor:'rgba(98,0,234,0.1)',
    borderRadius: 25,
    padding: 10,
    color: '#6200EA',
  },
  actionTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  roomsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  filterText: {
    fontSize: 14,
    color: '#000',
  },
  seeAll: {
    color: '#6200EA',
  },
  roomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 12,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  roomHost: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  roomStats: {
    flexDirection: 'row',
    gap: 12,
  },
  roomStatus: {
    fontWeight: '500',
  },
  roomRating: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  ratingText: {
    color: '#FFA000',
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 16,
  },
  headerTextWrapper: {
    justifyContent: 'center',
  },
  headerDate: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign:'right'
  },
  headerWelcome: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
  },
});

// Remove the quickActions related styles from this file
