import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const PAYDAY = dayjs().startOf('month').add(1, 'month').date(27).hour(0).minute(0).second(0); // prossimo 27

export default function App() {
  const [remaining, setRemaining] = useState(getRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getRemainingTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const progress = 1 - remaining.totalSeconds / getTotalSecondsBetweenNowAndPayday();

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={300}
        width={15}
        fill={progress * 100}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        rotation={0}
        lineCap="round"
      >
        {() => (
          <View style={styles.textContainer}>
            <Text style={styles.timerText}>
              {remaining.weeks}w {remaining.days}d
            </Text>
            <Text style={styles.timerText}>
              {remaining.hours}h {remaining.minutes}m {remaining.seconds}s
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}

function getRemainingTime() {
  const now = dayjs();
  const diff = PAYDAY.diff(now);
  const dur = dayjs.duration(diff);

  return {
    totalSeconds: dur.asSeconds(),
    weeks: Math.floor(dur.asWeeks()),
    days: dur.days(),
    hours: dur.hours(),
    minutes: dur.minutes(),
    seconds: dur.seconds()
  };
}

function getTotalSecondsBetweenNowAndPayday() {
  const now = dayjs();
  const total = PAYDAY.diff(now, 'second', true);
  return total;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e0e0e',
    width: '100%'
  },
  textContainer: {
    alignItems: 'center'
  },
  timerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  }
});
