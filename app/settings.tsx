import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, router, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);

  const { signOut,session } = useAuth();
  const router = useRouter();

    useEffect(() => {
      if (!session) {
        router.replace('/(auth)/signIn');
      }
    }, [session]);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout from your account?",
      [
        {
          text: "No, stay",
          style: "cancel",
        },
        {
          text: "Yes, logout",
          onPress: async () => {
            try {
              await signOut(); // Only logs out
              router.replace('/(auth)/signIn'); // Now handle routing here safely
            } catch (error) {
              Alert.alert("Error", "Failed to log out");
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Settings',
        }}
      />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Dark Mode</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#767577', true: '#6200EA' }}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: '#6200EA' }}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Sound Effects</Text>
            <Switch
              value={soundEffectsEnabled}
              onValueChange={setSoundEffectsEnabled}
              trackColor={{ false: '#767577', true: '#6200EA' }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Privacy Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Button
            title='Log out'
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#6200EA',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF5252',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});