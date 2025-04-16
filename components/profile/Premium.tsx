import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Premium = () => {
  return (
    <View style={styles.premiumBadge}>
    <Text style={styles.badgeText}>Premium</Text>
    <Text style={styles.badgeIcon}>👑</Text>
  </View>
  )
}

export default Premium

const styles = StyleSheet.create({
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
})