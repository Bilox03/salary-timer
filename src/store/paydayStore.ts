import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PaydayStore = {
  payday: number;
  setPayday: (newPayday: number) => void;
  loadPayday: () => Promise<void>;
};

export const usePaydayStore = create<PaydayStore>(set => ({
  payday: 15,
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
