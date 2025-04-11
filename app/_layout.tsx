import {Stack} from 'expo-router';
import {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import AppBar from '@/components/AppBar';
import NotificationManager from '@/components/NotificationManager';
import {Colors} from '@/config/colors';
import {usePaydayStore} from '@/store/paydayStore';
import {useThemeStore} from '@/store/themeStore';
import {useLanguageStore} from '@/store/languageStore';
import i18n from '@/config/i18n';

const Layout = () => {
  const {loadLanguage} = useLanguageStore();
  const colors = Colors[useThemeStore(s => s.theme)];
  const {theme, loadTheme} = useThemeStore();

  const {loadPayday} = usePaydayStore();

  useEffect(() => {
    i18n.init();
    loadPayday();
    loadLanguage();
    loadTheme();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.BACKGROUND}}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colors.BACKGROUND} />

      <NotificationManager />

      <AppBar />

      <Stack screenOptions={{headerShown: false, animation: 'flip'}} />
    </View>
  );
};

export default Layout;
