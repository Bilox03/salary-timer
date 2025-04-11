import {Colors} from '@/config/colors';
import {useThemeStore} from '@/store/themeStore';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

type CircularTimerProps = {
  progress: number;
  remainingDays: number;
};

const PaydayCircularTimer: React.FC<CircularTimerProps> = ({progress, remainingDays}) => {
  const colors = Colors[useThemeStore(s => s.theme)];

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center'
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
      <AnimatedCircularProgress
        key={remainingDays}
        size={300}
        width={15}
        fill={progress * 100}
        tintColor={colors.PRIMARY}
        backgroundColor={colors.TEXT_BUTTON}
        rotation={0}
        lineCap="round"
      >
        {() => (
          <View style={styles.textContainer}>
            <Text style={styles.timerText}>{Math.ceil(remainingDays)}</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default PaydayCircularTimer;
