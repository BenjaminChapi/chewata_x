import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const RecentAchievements = ({achievement}:any) => {
  return (
    <TouchableOpacity key={achievement.id} style={styles.achievementCard}>
    <View style={[styles.iconContainer, { backgroundColor: achievement.color }]}>
      <Text style={styles.achievementIcon}>{achievement.icon}</Text>
    </View>
    <Text style={styles.achievementTitle}>{achievement.title}</Text>
  </TouchableOpacity>
  )
}

export default RecentAchievements

const styles = StyleSheet.create({
    achievementCard: {
        alignItems: 'center',
        width: '23%',
      },
      iconContainer: {
        padding: 12,
        borderRadius:50,
        marginBottom: 8,
      },
      achievementIcon: {
        fontSize: 24,
      },
      achievementTitle: {
        fontSize: 12,
        textAlign: 'center',
        color: '#666',
      },
})