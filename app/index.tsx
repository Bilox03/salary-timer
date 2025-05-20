import React, {useEffect, useState, useRef, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@/config/colors';
import {useThemeStore} from '@/store/themeStore';
import CustomButton from '@/components/CustomButton';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import PaydayCircularTimer from '@/components/payday/PaydayCircularTimer';
import ChangePaydayModal from '@/components/payday/ChangePaydayModal';
import PaydayCard from '@/components/payday/PaydayCard';
import {getRemainingTimeDays} from '@/utils/getRemainingTimeDays';
import {getElapsedTimeDays} from '@/utils/getElapsedTimeDays';
import {usePaydayStore} from '@/store/paydayStore';
import {getNextPayDate} from '@/utils/getNextPayDate';
import {getPreviousPayDate} from '@/utils/getPreviousPayDate';
import {useTranslation} from 'react-i18next';

dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.locale('it');

const Home = (): JSX.Element => {
  const colors = Colors[useThemeStore(s => s.theme)];
  const {t} = useTranslation();

  const {payday} = usePaydayStore();

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [remainingDays, setRemainingDays] = useState<number>();
  const [elapsedDays, setElapsedDays] = useState<number>();

  const nextPayDate = useMemo(() => getNextPayDate(payday!), [payday]);
  const previousPayDate = useMemo(() => getPreviousPayDate(payday!), [payday]);

  const totalDaysInit = useRef(nextPayDate.diff(previousPayDate, 'days', true)).current;

  useEffect(() => {
    setRemainingDays(getRemainingTimeDays(nextPayDate));
    setElapsedDays(getElapsedTimeDays(previousPayDate));
  }, [nextPayDate, previousPayDate]);

  const progress = Math.max(0, Math.min(1, elapsedDays! / totalDaysInit));

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.BACKGROUND,
      width: '100%'
    },
    changePaydayButton: {
      marginTop: 50
    }
  });

  return (
    <>
      <ChangePaydayModal visible={isModalVisible} onClose={() => setModalVisible(false)} />

      <View style={styles.container}>
        <PaydayCircularTimer progress={progress} remainingDays={remainingDays!} />

        <PaydayCard payday={payday!} />

        <CustomButton
          title={t('change_day')}
          onPress={() => setModalVisible(true)}
          variant="outline"
          buttonStyle={styles.changePaydayButton}
        />
      </View>
    </>
  );
};

export default Home;
