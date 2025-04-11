import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useThemeStore} from '@/store/themeStore';
import {Colors} from '@/config/colors';
import {usePathname, useRouter} from 'expo-router';

const AppBar = () => {
  const colors = Colors[useThemeStore(s => s.theme)];

  const router = useRouter();
  const pathName = usePathname();
  const isSettingsPage = pathName === '/settings';

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

  const TITLES = {
    '/': '',
    '/settings': 'IMPOSTAZIONI'
  };

  return (
    <View style={styles.appBar}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => (isSettingsPage ? router.back() : router.push('/settings'))}>
          <Ionicons name={isSettingsPage ? 'home-outline' : 'settings-outline'} size={24} color={colors.TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>

      <Text style={styles.centerSection}>{TITLES[pathName]}</Text>

      <View style={styles.rightSection}></View>
    </View>
  );
};

export default AppBar;
