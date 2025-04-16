import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RoomStatus = ({status}:any) => {
  return (
    <View style={{borderRadius:10,paddingHorizontal:4,backgroundColor: status === 'Ongoing' ? 'rgba(76,175,80,0.1)' : status === 'Waiting' ? 'rgba(255,160,0,0.1)' : '#fff'}}>
            <Text style={[
                styles.roomStatus,
                { color: status === 'Ongoing' ? '#4CAF50' : status === 'Waiting' ? '#FFA000' : '#999999' }
            ]}>
                ⦿ {status}
            </Text>
          </View>
  )
}

export default RoomStatus

const styles = StyleSheet.create({
    roomStatus: {
        fontWeight: '500',
      },
})