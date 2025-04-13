import React from 'react';
import {Text, View, Pressable, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {Colors} from '@/config/colors';
import {Theme, useThemeStore} from '@/store/themeStore';
import {useTranslation} from 'react-i18next';
import {useLanguageStore} from '@/store/languageStore';

const Settings: React.FC = () => {
  const {theme, setTheme} = useThemeStore();
  const colors = Colors[theme];
  const {language, setLanguage} = useLanguageStore();
  const {t} = useTranslation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      gap: 20,
      backgroundColor: colors.BACKGROUND
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.TEXT_PRIMARY
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.TEXT_PRIMARY,
      marginBottom: 10
    },
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 20,
      marginBottom: 30
    },
    card: {
      padding: 15,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      width: Dimensions.get('window').width / 3 - 30,
      minHeight: 70,
      overflow: 'hidden'
    },
    selectedCard: {
      borderWidth: 2,
      borderColor: colors.PRIMARY,
      padding: 13
    },
    cardText: {
      marginTop: 4,
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    link: {
      fontSize: 16,
      color: colors.PRIMARY,
      marginTop: 20
    }
  });

  return (
    <View style={styles.container}>
      {/* Theme */}
      <View>
        <Text style={styles.sectionTitle}>{t('theme')}</Text>
        <View style={styles.cardContainer}>
          {[
            {icon: '☀️', label: t('light'), value: 'light', colors: Colors.light},
            {icon: '🌙', label: t('dark'), value: 'dark', colors: Colors.dark},
            {icon: '📱', label: t('amoled'), value: 'amoled', colors: Colors.amoled}
          ].map(({icon, label, value, colors}) => (
            <TouchableOpacity key={value} onPress={() => setTheme(value as Theme)}>
              <View style={[styles.card, theme === value && styles.selectedCard, {backgroundColor: colors.BACKGROUND}]}>
                <Text style={{fontSize: 24}}>{icon}</Text>
                <Text style={[styles.cardText, {color: colors.TEXT_PRIMARY}]}>{label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Language */}
      <View>
        <Text style={styles.sectionTitle}>{t('language')}</Text>
        <View style={styles.cardContainer}>
          {[
            {icon: '🇮🇹', value: 'it'},
            {icon: '🇬🇧', value: 'en'},
            {icon: '🇪🇸', value: 'es'}
          ].map(({icon, value}) => (
            <TouchableOpacity key={value} onPress={() => setLanguage(value)}>
              <View
                style={[styles.card, language === value && styles.selectedCard, {backgroundColor: colors.BACKGROUND}]}
              >
                <Text style={{fontSize: 24}}>{icon}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Pressable onPress={() => {}}>
        <Text style={styles.link}>📜 Privacy Policy</Text>
      </Pressable>
    </View>
  );
};

export default Settings;
