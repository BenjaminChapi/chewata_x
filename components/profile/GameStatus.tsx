import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GameStatus = ({Gameplayed,WinRate,Rating}:any) => {
  return (
    <View style={styles.stats}>
    <View style={styles.stat}>
      <Text style={styles.statValue}>{Gameplayed}</Text>
      <Text style={styles.statLabel}>Games Played</Text>
    </View>
    <View style={styles.stat}>
      <Text style={styles.statValue}>{WinRate}%</Text>
      <Text style={styles.statLabel}>Win Rate</Text>
    </View>
    <View style={styles.stat}>
      <Text style={styles.statValue}>{Rating}</Text>
      <Text style={styles.statLabel}>Rating</Text>
    </View>
  </View>
  )
}

export default GameStatus

const styles = StyleSheet.create({
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
      },
      stat: {
        alignItems: 'center',
      },
      statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      statLabel: {
        fontSize: 14,
        color: '#666',
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
      },
})