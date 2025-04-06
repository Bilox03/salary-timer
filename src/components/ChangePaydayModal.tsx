import React, {useState} from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // Assicurati di installare questa libreria
import {Colors} from 'src/config/colors';
import {useThemeStore} from 'src/store/themeStore';

interface ChangePaydayModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (newPayday: number) => void;
  currentPayday: number;
}

const ChangePaydayModal: React.FC<ChangePaydayModalProps> = ({visible, onClose, onSave, currentPayday}) => {
  const {theme} = useThemeStore();
  const colors = Colors[theme];

  const [selectedDay, setSelectedDay] = useState<number>(currentPayday);

  const handleSave = () => {
    onSave(selectedDay);
    onClose();
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContainer: {
      width: '80%',
      backgroundColor: colors.BACKGROUND,
      borderRadius: 10,
      padding: 20,
      alignItems: 'center'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.PRIMARY
    },
    pickerContainer: {
      width: '100%',
      borderWidth: 1,
      borderColor: colors.PRIMARY,
      borderRadius: 5,
      marginBottom: 20
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
      backgroundColor: colors.PRIMARY,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center'
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold'
    }
  });

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Cambia Giorno dello Stipendio</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={selectedDay} onValueChange={itemValue => setSelectedDay(itemValue)} mode="dropdown">
              {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                <Picker.Item
                  key={day.toString()}
                  label={day.toString()}
                  value={day.toString()}
                  color={colors.TEXT_PRIMARY}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Annulla</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Salva</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChangePaydayModal;
