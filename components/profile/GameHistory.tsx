import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GameHistory = ({game}:any) => {
  return (
    <View key={game.id} style={styles.gameCard}>
    <View style={styles.gameIcon}>
      <Text style={styles.gameIconText}>{game.icon}</Text>
    </View>
    <View style={styles.gameInfo}>
      <Text style={styles.gameTitle}>{game.title}</Text>
      <Text style={styles.gameScore}>Score: {game.score}</Text>
    </View>
    <Text style={styles.gameTime}>{game.time}</Text>
  </View>
  )
}

export default GameHistory

const styles = StyleSheet.create({
    gameCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 12,
        borderRadius: 12,
      },
      gameIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8F5E9',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
      },
      gameIconText: {
        fontSize: 20,
      },
      gameInfo: {
        flex: 1,
      },
      gameTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
      },
      gameScore: {
        fontSize: 14,
        color: '#666',
      },
      gameTime: {
        fontSize: 12,
        color: '#666',
      },
})