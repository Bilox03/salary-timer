import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import {useThemeStore} from '@/store/themeStore';
import {Colors} from '@/config/colors';

type PaydayCardProps = {
  payday: number; // Numero del giorno dello stipendio
};

const PaydayCard: React.FC<PaydayCardProps> = ({payday}) => {
  const colors = Colors[useThemeStore(s => s.theme)];

  // Calcola la prossima data dello stipendio
  const today = dayjs();
  let nextPayday = today.date(payday);
  if (today.isAfter(nextPayday, 'day')) {
    nextPayday = today.add(1, 'month').date(payday);
  }

  const styles = StyleSheet.create({
    paydayCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      width: '75%',
      borderWidth: 2,
      borderColor: colors.BORDER,
      borderRadius: 8,
      marginTop: 80,
      backgroundColor: colors.BACKGROUND
    },
    paydaySquare: {
      width: 80,
      height: 80,
      backgroundColor: colors.PRIMARY,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      marginRight: 16
    },
    paydaySquareText: {
      color: colors.TEXT_BUTTON,
      fontSize: 50,
      fontWeight: 'bold'
    },
    paydayCardText: {
      fontSize: 16,
      color: colors.TEXT_SECONDARY,
      fontWeight: '600'
    },
    paydayCardDate: {
      fontSize: 20,
      color: colors.PRIMARY,
      fontWeight: '800',
      marginTop: 4
    }
  });

  return (
    <View style={styles.paydayCard}>
      <View style={styles.paydaySquare}>
        <Text style={styles.paydaySquareText}>{payday}</Text>
      </View>

      <View>
        <Text style={styles.paydayCardText}>Prossimo stipendio:</Text>
        <Text style={styles.paydayCardDate}>{nextPayday.format('DD / MM / YYYY')}</Text>
      </View>
    </View>
  );
};

export default PaydayCard;
