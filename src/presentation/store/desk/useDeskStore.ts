import { create } from 'zustand';
import { Desk } from '../../../core/entities';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DeskUseCases from '../../../core/use-cases/desks';
import { DeskResponse } from '../../../infrastructure/interfaces';

interface DeskState {
  desks: Desk[];
  desksData: DeskResponse;
  selectedDesk: Desk | undefined;
  getDesks: (limit?: number) => void;
  setSelectedDesk: (desk: Desk) => void;
}

export const useDesksStore = create<DeskState>()(
  persist(
    (set) => ({
      desks: [],
      desksData: {
        page: 0,
        limit: 0,
        total: 0,
        next: null,
        prev: null,
        desks: []
      },
      selectedDesk: undefined,
      getDesks: async (limit?: number) => {
        const query = limit ? `desks?limit=${limit}` : 'desks';
        const resp = await DeskUseCases.getDesksUseCase(query);
        set({ desks: resp.response?.desks });
        set({ desksData: resp.response });
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
