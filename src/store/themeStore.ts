import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark' | 'amoled';

type ThemeStore = {
  theme: Theme;
  setTheme: (newTheme: Theme) => Promise<void>;
  loadTheme: () => Promise<void>;
};

export const useThemeStore = create<ThemeStore>(set => ({
  theme: 'dark',
  setTheme: async (newTheme: Theme) => {
    await AsyncStorage.setItem('theme', newTheme);
    set({theme: newTheme});
  },
  loadTheme: async () => {
    const storedTheme = await AsyncStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      set({theme: storedTheme});
    }
  }
}));
