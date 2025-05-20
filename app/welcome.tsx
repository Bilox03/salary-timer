import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, Easing, Image} from 'react-native';
import {usePaydayStore} from '@/store/paydayStore';
import ScrollPicker from '@/components/ScrollPicker';
import CustomButton from '@/components/CustomButton';
import {Colors} from '@/config/colors';
import {useThemeStore} from '@/store/themeStore';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import Images from '@/config/images';

const Welcome: React.FC = () => {
  const {t} = useTranslation();
  const colors = Colors[useThemeStore(s => s.theme)];
  const {setPayday} = usePaydayStore();
  const router = useRouter();

  const [selectedPayday, setSelectedPayday] = useState(15);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleSave = () => {
    setPayday(selectedPayday);
    router.replace('/');
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true
    }).start();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.BACKGROUND,
      padding: 20,
      opacity: fadeAnim
    },
    introText: {
      fontSize: 16,
      color: colors.TEXT_SECONDARY,
      textAlign: 'center',
      marginBottom: 50,
      paddingHorizontal: 10
    },
    messageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 50
    },
    paydayTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20
    },
    calendarIcon: {
      marginRight: 10
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.TEXT_PRIMARY
    },
    paydayTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.TEXT_PRIMARY
    },
    pickerContainer: {
      width: Dimensions.get('window').width * 0.7,
      height: 200,
      marginBottom: 30
    },
    button: {
      marginTop: 50,
      width: Dimensions.get('window').width * 0.7
    },
    buttonText: {
      fontSize: 30
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 20
    }
  });

  return (
    <View style={{flex: 1, backgroundColor: colors.BACKGROUND}}>
      <Animated.View style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />

        <Text style={styles.title}>{t('welcome_title')}</Text>

        <View style={styles.messageContainer}>
          <Text style={styles.introText}>{t('welcome_message')}</Text>
        </View>

        <View style={styles.paydayTitleContainer}>
          <Ionicons name="calendar-outline" size={28} color={colors.TEXT_PRIMARY} style={styles.calendarIcon} />
          <Text style={styles.paydayTitle}>{t('choose_payday')}</Text>
        </View>

        <View style={styles.pickerContainer}>
          <ScrollPicker
            data={Array.from({length: 31}, (_, i) => (i + 1).toString())}
            defaultIndex={14}
            onValueChange={val => setSelectedPayday(Number(val))}
            visibleItems={5}
            itemHeight={40}
          />
        </View>

        <CustomButton
          title={t('welcome_button')}
          onPress={handleSave}
          variant="primary"
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </Animated.View>
    </View>
  );
};

export default Welcome;
