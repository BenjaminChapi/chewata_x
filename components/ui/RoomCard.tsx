import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import RoomStatus from '../small/RoomStatus';

interface RoomCardProps {
  title: string;
  host: string;
  players: string;
  status: 'Ongoing' | 'Waiting' | 'Full';
  rating: number;
}

export function RoomCard({ title, host, players, status, rating }: RoomCardProps) {
  return (
    <View style={styles.roomCard}>
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <Text style={styles.roomTitle}>{title}</Text>
          <Text style={styles.ratingText}>★ {rating}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.roomHost}>Hosted by {host}</Text>
          <RoomStatus status={status}/>
        </View>

        <View style={styles.row}>
          <View style={styles.categoryContainer}>
            <View style={styles.iconContainer}>
              <Text style={styles.categoryIcon}>🎭</Text>
            </View>
            <Text style={styles.categoryText}>Travel</Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.roomStats}>
              <Text>👥 {players}</Text>
            </View>
            <Button
              title='Join'
              onPress={() => {}}
              disabled={status === 'Full'}
              style={{
                backgroundColor: status === 'Full' ? 'rgba(153,153,153,0.4)' : 'blue',
                paddingVertical: 4,
                paddingHorizontal: 14,
                borderRadius: 8,
                minHeight: 28,
              }}
              textStyle={{
                fontSize: 12,
                fontWeight: '600',
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  roomCard: {
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 12,
    marginBottom: 12,
  },
  contentContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    padding: 3,
    backgroundColor: 'rgba(0,0,255,0.08)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 12,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop:5
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  roomHost: {
    color: '#666',
    fontSize: 13,
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
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  ratingText: {
    color: '#FFA000',
    fontWeight: 'bold',
  },
});