import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Level({level}:any) {
  return (
    <View style={styles.levelBadge}>
    <Text style={styles.badgeIcon}>🎮</Text>
    <Text style={styles.badgeText}>Level</Text>
    <Text style={styles.badgeValue}>{level}</Text>
  </View>
  )
}
const styles = StyleSheet.create({
    levelBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
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
})
