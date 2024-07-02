import { create } from 'zustand';
import { Desk } from '../../../core/entities';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DeskUseCases from '../../../core/use-cases/desks';

interface DeskState {
  desks: Desk[];
  selectedDesk: Desk | undefined;
  total: number;
  setSelectedDesk: (desk: Desk) => void;
  getDesksTotal: () => Promise<void>;
  getAllDesks: (limit?: number) => Promise<void>;
  clearStorage: () => void;
}

export const useDesksStore = create<DeskState>()(
  persist(
    (set, get) => ({
      desks: [],
      selectedDesk: undefined,
      total: 0,
      setSelectedDesk: (desk: Desk) => {
        set({ selectedDesk: desk });
      },
      getDesksTotal: async () => {
        const resp = await DeskUseCases.getDesksUseCase('desks');
        const total = resp.response?.total || 0;
        set({ total });

        if (get().desks.length !== get().total) {
          await get().getAllDesks(total);
        }
      },
      getAllDesks: async (limit?: number) => {
        const query = limit ? `desks?limit=${limit}` : 'desks';
        const resp = await DeskUseCases.getDesksUseCase(query);
        set({ desks: resp.response?.desks || [] });
      },
      clearStorage: () => {
        AsyncStorage.removeItem('desks-storage');
        set({ desks: [], selectedDesk: undefined, total: 0 });
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
