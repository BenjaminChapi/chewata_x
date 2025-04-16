import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'filter' | 'sort';
  position: { x: number; y: number };
}

export function FilterModal({ visible, onClose, type, position }: FilterModalProps) {
  const options = type === 'sort' ? [
    { id: 1, label: 'Newest First' },
    { id: 2, label: 'Most Popular' },
    { id: 3, label: 'Player Count (High to Low)' },
    { id: 4, label: 'Rating (High to Low)' },
    { id: 5, label: 'Alphabetical (A-Z)' },
  ] : [
    { id: 1, label: 'All Games' },
    { id: 2, label: 'Truth or Dare' },
    { id: 3, label: 'Charades' },
    { id: 4, label: 'Trivia' },
    { id: 5, label: 'Word Games' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View 
          style={[
            styles.modalContent,
            {
              top: position.y + 40,
              right: 16,
            }
          ]}
        >
          {options.map((option) => (
            <TouchableOpacity 
              key={option.id} 
              style={styles.option}
              onPress={() => {
                // Handle option selection
                onClose();
              }}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
});