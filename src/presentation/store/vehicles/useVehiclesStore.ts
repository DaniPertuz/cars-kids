import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Vehicle } from '../../../core/entities';
import * as VehicleUseCases from '../../../core/use-cases/vehicles';

interface VehiclesState {
  vehicles: Vehicle[];
  total: number;
  setVehicles: (vehicles: Vehicle[]) => void;
  fetchTotalVehicles: () => Promise<void>;
  fetchVehiclesData: () => Promise<void>;
}

export const useVehiclesStore = create<VehiclesState>()(
  persist(
    (set, get) => ({
      vehicles: [],
      total: 0,
      setVehicles: (vehicles: Vehicle[]) => {
        set({ vehicles });
      },
      fetchTotalVehicles: async () => {
        try {
          const resp = await VehicleUseCases.getVehiclesUseCase('vehicles/status/active');
          set({ total: resp.response?.total || 0 });
        } catch (error) {
          console.error('Error al obtener total de vehículos:', error);
        }
      },
      fetchVehiclesData: async () => {
        try {
          const { total } = get();
          const resp = await VehicleUseCases.getVehiclesUseCase(`vehicles/status/active?limit=${total}`);
          set({ vehicles: resp.response?.vehicles || [] });
        } catch (error) {
          console.error('Error al obtener vehículos:', error);
        }
      }
    }),
    {
      name: 'vehicles-storage',
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
