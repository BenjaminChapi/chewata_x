import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Play, Pause } from 'lucide-react-native';
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';

interface VoiceMessageProps {
  audioUrl: string;
  duration: number;
  isOwn: boolean;
}

export function VoiceMessageBubble({ audioUrl, duration, isOwn }: VoiceMessageProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, isOwn ? styles.ownMessage : styles.otherMessage]}>
      <TouchableOpacity style={styles.playButton} onPress={playSound}>
        {isPlaying ? (
          <Pause color={isOwn ? "#fff" : "#6200EA"} size={20} />
        ) : (
          <Play color={isOwn ? "#fff" : "#6200EA"} size={20} />
        )}
      </TouchableOpacity>
      
      <View style={styles.waveform}>
        <View style={[
          styles.waveformBar,
          isOwn ? styles.ownWaveform : styles.otherWaveform
        ]} />
      </View>
      
      <Text style={[
        styles.duration,
        isOwn ? styles.ownDuration : styles.otherDuration
      ]}>
        {formatDuration(duration)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    maxWidth: '70%',
    marginVertical: 4,
    marginHorizontal: 16,
  },
  ownMessage: {
    backgroundColor: '#6200EA',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-start',
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveform: {
    flex: 1,
    height: 24,
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  waveformBar: {
    height: 2,
    borderRadius: 1,
  },
  ownWaveform: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  otherWaveform: {
    backgroundColor: 'rgba(98,0,234,0.5)',
  },
  duration: {
    fontSize: 12,
    marginLeft: 8,
  },
  ownDuration: {
    color: '#fff',
  },
  otherDuration: {
    color: '#666',
  },
});