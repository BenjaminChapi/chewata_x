import { View, Text, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Avatar } from './Avatar';
import { TypingIndicator } from './TypingIndicator';

interface ChatBubbleProps {
  message: string;
  time: string;
  user: {
    name: string;
    avatar: string;
  };
  isCurrentUser?: boolean;
  delay?: number;
  isTyping?: boolean;
}

export function ChatBubble({ message, time, user, isCurrentUser, delay = 0, isTyping }: ChatBubbleProps) {
  if (isTyping) {
    return <TypingIndicator user={user} />;
  }
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 20,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        isCurrentUser ? styles.currentUser : styles.otherUser,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {!isCurrentUser && <Avatar uri={user.avatar} size={32} delay={delay} />}
      <View style={[styles.bubble, isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble]}>
        {!isCurrentUser && <Text style={styles.name}>{user.name}</Text>}
        <Text style={[styles.message, isCurrentUser && styles.currentUserMessage]}>{message}</Text>
        <Text style={[styles.time, isCurrentUser && styles.currentUserTime]}>{time}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  currentUser: {
    justifyContent: 'flex-end',
  },
  otherUser: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 16,
    marginLeft: 8,
  },
  currentUserBubble: {
    backgroundColor: '#6200EA',
    borderBottomRightRadius: 4,
  },
  otherUserBubble: {
    backgroundColor: '#F5F5F5',
    borderBottomLeftRadius: 4,
  },
  name: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  message: {
    fontSize: 13,
    color: '#000',
    lineHeight: 18,
  },
  currentUserMessage: {
    color: '#fff',
  },
  time: {
    fontSize: 9,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  currentUserTime: {
    color: 'rgba(255,255,255,0.7)',
  },
});
