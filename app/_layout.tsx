import {Redirect, Stack, usePathname} from 'expo-router';
import {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
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
  const pathname = usePathname();

  const {loadPayday, payday} = usePaydayStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    try {
      setIsLoading(true);

      console.log('Caricamento payday...');
      await loadPayday();

      console.log('Inizializzazione i18n...');
      await i18n.init();

      console.log('Caricamento lingua...');
      await loadLanguage();

      console.log('Caricamento tema...');
      await loadTheme();

      console.log('Inizializzazione completata.');
    } catch (error) {
      console.error("Errore durante l'inizializzazione:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isWelcome = pathname === '/welcome';

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.BACKGROUND}}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.BACKGROUND}}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colors.BACKGROUND} />

      {!isWelcome && (
        <>
          <AppBar />
          <NotificationManager />
        </>
      )}

      {!payday && pathname !== '/welcome' && <Redirect href="/welcome" />}

      <Stack screenOptions={{headerShown: false, animation: 'flip'}} />
    </View>
  );
};

export default Layout;
