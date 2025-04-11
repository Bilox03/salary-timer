import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/config/i18n';

type LanguageStore = {
  language: string;
  setLanguage: (newLanguage: string) => Promise<void>;
  loadLanguage: () => Promise<void>;
};

export const useLanguageStore = create<LanguageStore>(set => ({
  language: 'en',
  setLanguage: async (newLanguage: string) => {
    await AsyncStorage.setItem('language', newLanguage);
    i18n.changeLanguage(newLanguage);
    set({language: newLanguage});
  },
  loadLanguage: async () => {
    const storedLanguage = await AsyncStorage.getItem('language');
    const language = storedLanguage || 'en';
    i18n.changeLanguage(language);
    set({language});
  }
}));
