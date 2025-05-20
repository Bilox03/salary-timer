import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PaydayStore = {
  payday: number | null;
  setPayday: (newPayday: number) => void;
  loadPayday: () => Promise<void>;
};

export const usePaydayStore = create<PaydayStore>(set => ({
  payday: null,
  setPayday: async (newPayday: number) => {
    await AsyncStorage.setItem('payday', newPayday.toString());
    set({payday: newPayday});
  },
  loadPayday: async () => {
    const savedPayday = await AsyncStorage.getItem('payday');
    if (savedPayday !== null) {
      set({payday: parseInt(savedPayday, 10)});
    }
  }
}));
