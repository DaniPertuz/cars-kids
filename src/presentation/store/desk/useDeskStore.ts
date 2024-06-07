import { create } from 'zustand';
import { Desk } from '../../../core/entities';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DeskUseCases from '../../../core/use-cases/desks';

interface DeskState {
  desks: Desk[];
  selectedDesk: Desk | undefined;
  getDesks: () => void;
  setSelectedDesk: (desk: Desk) => void;
}

export const useDesksStore = create<DeskState>()(
  persist(
    (set) => ({
      desks: [],
      selectedDesk: undefined,
      getDesks: async () => {
        const resp = await DeskUseCases.getDesksUseCase('desks');
        set({ desks: resp.response?.desks });
      },
      setSelectedDesk: (desk: Desk) => {
        set({ selectedDesk: desk });
      }
    }),
    {
      name: 'desks-storage',
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        }
      }
    }
  )
);
