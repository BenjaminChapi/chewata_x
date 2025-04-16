import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';

interface QuickAction {
  id: number;
  title: string;
  icon: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
  onActionPress?: (action: QuickAction) => void;
}

export function QuickActions({ actions, onActionPress }: QuickActionsProps) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickActionsContainer}
      >
        {actions.map((action) => (
          <TouchableOpacity 
            key={action.id} 
            style={styles.actionItem}
            onPress={() => onActionPress?.(action)}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={styles.actionTitle}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickActionsContainer: {
    flexDirection: 'row',
  },
  actionItem: {
    alignItems: 'center',
    width: 80,
  },
  actionIcon: {
    fontSize: 22,
    zIndex: 1,
    backgroundColor: 'rgba(98,0,234,0.1)',
    borderRadius: 25,
    padding: 10,
    color: '#6200EA',
  },
  actionTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    marginTop: 8,
  },
});