import { View, Image, StyleSheet } from 'react-native';
import React from 'react';

interface AvatarProps {
  uri: string;
  size?: number;
  online?: boolean;
}

export function Avatar({ uri, size = 40, online }: AvatarProps) {
  return (
    <View>
      <Image
        source={{ uri }}
        style={[
          styles.avatar,
          { width: size, height: size, borderRadius: size / 2 }
        ]}
      />
      {online && <View style={styles.onlineIndicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#eee',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
});