import React, {useState} from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import {Colors} from '@/config/colors';
import {useThemeStore} from '@/store/themeStore';
import {usePaydayStore} from '@/store/paydayStore';
import CustomButton from '@/components/CustomButton';
import ScrollPicker from '@/components/ScrollPicker';
import {useTranslation} from 'react-i18next';

interface ChangePaydayModalProps {
  visible: boolean;
  onClose: () => void;
}

const ChangePaydayModal: React.FC<ChangePaydayModalProps> = ({visible, onClose}) => {
  const colors = Colors[useThemeStore(s => s.theme)];
  const {t} = useTranslation();

  const {payday, setPayday} = usePaydayStore();

  const [selectedPayday, setSelectedPayday] = useState(payday);

  const days = Array.from({length: 31}, (_, i) => (i + 1).toString());

  const handleSave = () => {
    setPayday(selectedPayday);
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
      height: 150,
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    pickerText: {
      fontSize: 22,
      color: colors.TEXT_PRIMARY
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      gap: 10
    },
    button: {
      flex: 1
    }
  });

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{t('choose_payday')}</Text>

          <View style={styles.pickerContainer}>
            <ScrollPicker
              data={days}
              defaultIndex={payday - 1}
              onValueChange={val => setSelectedPayday(Number(val))}
              itemHeight={40}
              visibleItems={5}
            />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton title={t('cancel')} onPress={onClose} variant="secondary" style={styles.button} />
            <CustomButton title={t('save')} onPress={handleSave} variant="primary" style={styles.button} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChangePaydayModal;
