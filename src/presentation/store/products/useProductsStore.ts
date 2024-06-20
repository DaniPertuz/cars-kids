import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../../../core/entities';
import * as ProductUseCases from '../../../core/use-cases/products';
import { IStatus } from '../../../infrastructure/interfaces';

interface ProductsState {
  products: Product[];
  total: number;
  setProducts: (products: Product[]) => void;
  fetchTotalProducts: () => Promise<void>;
  fetchProductsData: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],
      total: 0,
      setProducts: (products: Product[]) => {
        set({ products });
      },
      fetchTotalProducts: async () => {
        try {
          const resp = await ProductUseCases.getProductsUseCase(`products/status/${IStatus.Active}`);
          set({ total: resp.response?.total || 0 });
        } catch (error) {
          console.error('Error al obtener total de productos:', error);
        }
      },
      fetchProductsData: async () => {
        try {
          const { total } = get();
          const resp = await ProductUseCases.getProductsUseCase(`products/status/${IStatus.Active}?limit=${total}`);
          set({ products: resp.response?.products || [] });
        } catch (error) {
          console.error('Error al obtener productos:', error);
        }
      }
    }),
    {
      name: 'products-storage',
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
