import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useThemeStore} from '@/store/themeStore';
import {Colors} from '@/config/colors';
import {usePathname, useRouter} from 'expo-router';
import {useTranslation} from 'react-i18next';

const AppBar = () => {
  const colors = Colors[useThemeStore(s => s.theme)];
  const {t} = useTranslation();

  const router = useRouter();
  const pathName = usePathname();

  const TITLES: Record<string, string> = {
    '/': '',
    '/settings': t('settings')
  };

  const styles = StyleSheet.create({
    appBar: {
      height: 60,
      backgroundColor: colors.BACKGROUND,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 25,
      justifyContent: 'space-between'
    },
    leftSection: {width: '20%'},
    centerSection: {
      width: '60%',
      color: colors.TEXT_PRIMARY,
      fontSize: 22,
      textAlign: 'center'
    },
    rightSection: {width: '20%'}
  });

  return (
    <View style={styles.appBar}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => (pathName === '/settings' ? router.back() : router.push('/settings'))}>
          <Ionicons
            name={pathName === '/settings' ? 'arrow-undo-outline' : 'settings-outline'}
            size={24}
            color={colors.TEXT_PRIMARY}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.centerSection}>{TITLES[pathName]}</Text>

      <View style={styles.rightSection}></View>
    </View>
  );
};

export default AppBar;
