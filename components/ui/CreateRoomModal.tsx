import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { X } from 'lucide-react-native';
import { Button } from './Button';
import DropDownPicker from 'react-native-dropdown-picker';

interface CreateRoomModalProps {
  visible: boolean;
  onClose: () => void;
  gameType: string;
}

export function CreateRoomModal({ visible, onClose, gameType }: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState('');
  const [playerLimit, setPlayerLimit] = useState('4');
  const [isPublic, setIsPublic] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(gameType);
  
  const [gameTypes] = useState([
    { label: 'Truth or Dare', value: 'Truth or Dare' },
    { label: 'Charades', value: 'Charades' },
    { label: 'Trivia', value: 'Trivia' },
    { label: 'Word Games', value: 'Word Games' },
  ]);

  const isFormValid = roomName.trim() !== '' && 
    playerLimit !== '' && 
    parseInt(playerLimit) > 1 && 
    selectedGame !== '';

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Create New Room</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Room Name</Text>
              <TextInput 
                style={styles.input}
                placeholder="Enter room name"
                value={roomName}
                onChangeText={setRoomName}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Game Type</Text>
              <DropDownPicker
                open={open}
                value={selectedGame}
                items={gameTypes}
                setOpen={setOpen}
                setValue={setSelectedGame}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                placeholder="Select a game type"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Player Limit</Text>
              <TextInput 
                style={styles.input}
                value={playerLimit}
                onChangeText={setPlayerLimit}
                keyboardType="numeric"
                placeholder="Minimum 2 players"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Privacy Settings</Text>
              <View style={styles.privacyOptions}>
                <TouchableOpacity
                  style={[styles.privacyOption, isPublic && styles.privacyOptionSelected]}
                  onPress={() => setIsPublic(true)}
                >
                  <Text style={[styles.privacyText, isPublic && styles.privacyTextSelected]}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.privacyOption, !isPublic && styles.privacyOptionSelected]}
                  onPress={() => setIsPublic(false)}
                >
                  <Text style={[styles.privacyText, !isPublic && styles.privacyTextSelected]}>Private</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.actions}>
            <Button
              title="Cancel"
              onPress={onClose}
              style={styles.cancelButton}
              textStyle={styles.cancelButtonText}
            />
            <Button
              title="Create Room"
              onPress={() => {}}
              style={[
                styles.createButton,
                !isFormValid && styles.createButtonDisabled
              ]}
              disabled={!isFormValid}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  privacyOptions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  privacyOption: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    minWidth: 80,
  },
  dropdown: {
    borderColor: '#ddd',
    borderRadius: 8,
  },
  dropdownContainer: {
    borderColor: '#ddd',
    borderRadius: 8,
  },
  createButtonDisabled: {
    backgroundColor: '#B39DDB',
    opacity: 0.7,
  },
});