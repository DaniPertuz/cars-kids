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
          const storedTotal = await AsyncStorage.getItem('products-total');
          if (storedTotal) {
            set({ total: JSON.parse(storedTotal) });
          } else {
            const resp = await ProductUseCases.getProductsUseCase(`products/status/${IStatus.Active}`);
            const total = resp.response?.total || 0;
            set({ total });
            await AsyncStorage.setItem('products-total', JSON.stringify(total));
          }
        } catch (error) {
          console.error('Error al obtener total de productos:', error);
        }
      },
      fetchProductsData: async () => {
        try {
          const { total } = get();
          const storedProducts = await AsyncStorage.getItem('products-data');
          if (storedProducts) {
            set({ products: JSON.parse(storedProducts) });
          } else {
            const resp = await ProductUseCases.getProductsUseCase(`products/status/${IStatus.Active}?limit=${total}`);
            const products = resp.response?.products || [];
            set({ products });
            await AsyncStorage.setItem('products-data', JSON.stringify(products));
          }
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
