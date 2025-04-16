export interface Room {
    id: number;
    title: string;
    host: string;
    players: string;
    status: 'Ongoing' | 'Waiting' | 'Expired';
    gameType: string;
    lastActive?: string;
    maxPlayers: number;
    currentPlayers: number;
  }

export const rooms : Room[]=  [
  {
    id: 1,
    title: 'Friday Fun Night',
    maxPlayers: 8,
    currentPlayers: 5,
    host: 'Emily Johnson',
    players: '5/8',
    status: 'Ongoing',
    gameType: 'Truth or Dare',
    lastActive: '2 min ago'
  },
  {
    id: 2,
    maxPlayers: 6,
    currentPlayers: 3,
    title: 'Movie Buffs Unite',
    host: 'Alex Chen',
    players: '3/6',
    status: 'Waiting',
    gameType: 'Trivia',
    lastActive: 'Just now'
  },
  {
    id: 3,
    title: 'Weekend Warriors',
    maxPlayers: 4,
    currentPlayers: 4,
    host: 'Sarah Williams',
    players: '4/4',
    status: 'Expired',
    gameType: 'Word Games',
    lastActive: '2 hours ago'
  },
];