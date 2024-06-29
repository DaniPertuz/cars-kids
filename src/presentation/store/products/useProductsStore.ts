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
          const newTotal = resp.response?.total || 0;

          const storedTotal = await AsyncStorage.getItem('products-total');
          const parsedStoredTotal = storedTotal ? JSON.parse(storedTotal) : 0;

          if (newTotal !== parsedStoredTotal) {
            set({ total: newTotal });
            await AsyncStorage.setItem('products-total', JSON.stringify(newTotal));
          } else {
            set({ total: parsedStoredTotal });
          }
        } catch (error) {
          console.error('Error al obtener total de productos:', error);
        }
      },
      fetchProductsData: async () => {
        try {
          const storedProducts = await AsyncStorage.getItem('products-data');
          const { total } = get();
          const resp = await ProductUseCases.getProductsUseCase(`products/status/${IStatus.Active}?limit=${total}`);
          const products = resp.response?.products || [];

          if (storedProducts) {
            const parsedStoredProducts = JSON.parse(storedProducts);
            const hasChanges =
              products.length !== parsedStoredProducts.length ||
              products.some((product, index) =>
                JSON.stringify(product) !== JSON.stringify(parsedStoredProducts[index])
              );

            if (hasChanges) {
              set({ products });
              await AsyncStorage.setItem('products-data', JSON.stringify(products));
            } else {
              set({ products: parsedStoredProducts });
            }
          } else {
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
