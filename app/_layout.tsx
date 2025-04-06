import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {Colors} from 'src/config/colors';
import {useThemeStore} from 'src/store/themeStore';
import CustomButton from 'src/components/CustomButton';
import ChangePaydayModal from 'src/components/ChangePaydayModal';

dayjs.extend(duration);
dayjs.extend(customParseFormat);

const PAYDAY_NUMBER = 15;

function getPayday() {
  const today = dayjs();
  // Imposta la data di questo mese con il giorno PAYDAY_NUMBER
  let payday = today.date(PAYDAY_NUMBER);
  // Se oggi è già passato quel giorno, il payday sarà nel mese successivo
  if (today.isAfter(payday)) {
    payday = today.add(1, 'month').date(PAYDAY_NUMBER);
  }
  return payday;
}

const PAYDAY = getPayday();

function getRemainingTimeDays() {
  const now = dayjs();
  // Restituisce il numero di giorni rimanenti (come numero reale)
  return PAYDAY.diff(now, 'days', true);
}

const Home = (): JSX.Element => {
  const theme = useThemeStore(s => s.theme);
  const colors = Colors[theme];

  const [isModalVisible, setModalVisible] = useState(false);
  const [remainingDays, setRemainingDays] = useState(getRemainingTimeDays());
  const totalDaysInit = useRef(getRemainingTimeDays()).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingDays(getRemainingTimeDays());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSavePayday = (newPayday: number) => {
    console.log(newPayday);
  };

  const progress = 1 - remainingDays / totalDaysInit;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.BACKGROUND,
      width: '100%'
    },
    textContainer: {
      alignItems: 'center'
    },
    timerText: {
      color: colors.PRIMARY,
      fontSize: 80,
      fontWeight: 'bold',
      fontFamily: 'Lato-Bold'
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.BACKGROUND} />

      <AnimatedCircularProgress
        size={300}
        width={15}
        fill={progress * 100}
        tintColor={colors.PRIMARY}
        backgroundColor={colors.BACKGROUND}
        rotation={0}
        lineCap="round"
      >
        {() => (
          <View style={styles.textContainer}>
            <Text style={styles.timerText}>{Math.ceil(remainingDays)}</Text>
          </View>
        )}
      </AnimatedCircularProgress>

      <CustomButton title="Cambia giorno" onPress={() => setModalVisible(true)} variant="secondary" />

      <ChangePaydayModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSavePayday}
        currentPayday={PAYDAY.date()}
      />
    </View>
  );
};

export default Home;
