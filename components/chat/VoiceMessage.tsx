import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Play, Pause, Mic } from 'lucide-react-native';

export function VoiceMessageBubble({ audioUrl, duration, isPlaying, isOwn }:any) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, isOwn ? styles.ownMessage : styles.otherMessage]}>
      <TouchableOpacity style={styles.playButton}>
        {isPlaying ? <Pause color="#fff" size={24} /> : <Play color="#fff" size={24} />}
      </TouchableOpacity>
      <View style={styles.waveform}>
        {/* Placeholder for waveform visualization */}
        <View style={styles.waveformBar} />
      </View>
      <Text style={styles.duration}>{formatDuration(duration)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
    marginVertical: 4,
  },
  ownMessage: {
    backgroundColor: '#6200EA',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#E8EAF6',
    alignSelf: 'flex-start',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  waveform: {
    flex: 1,
    height: 24,
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  waveformBar: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 1,
  },
  duration: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 8,
  },
});