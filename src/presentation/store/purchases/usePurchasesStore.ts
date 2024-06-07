import { AxiosError } from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Purchase } from '../../../core/entities';
import * as PurchasesUseCases from '../../../core/use-cases/purchases';

interface PurchaseState {
  purchases: Purchase[];
  addPurchase: (purchase: Purchase) => void;
  updatePurchase: (index: number, updatedPurchase: Purchase) => void;
  uploadPurchases: (handleMessage: (message: string) => void) => Promise<boolean>;
  removePurchase: (index: number) => void;
}

export const usePurchasesStore = create<PurchaseState>()(
  persist(
    (set) => ({
      purchases: [],
      addPurchase: (purchase) => {
        set((state) => ({
          purchases: [...state.purchases, purchase]
        }));
      },
      updatePurchase: (index, updatedPurchase) => {
        set((state) => {
          const newPurchases = [...state.purchases];
          if (index >= 0 && index < newPurchases.length) {
            newPurchases[index] = updatedPurchase;
          }
          return { purchases: newPurchases };
        });
      },
      uploadPurchases: async (handleMessage) => {
        const { purchases } = usePurchasesStore.getState();
        let success = true;
        const promises = purchases.map(async (purchase, index) => {
          try {
            const resp = await PurchasesUseCases.createPurchaseUseCase(purchase);
            if (resp) {
              success = true;
            }
          } catch (error: any) {
            success = false;
            if (error instanceof AxiosError) {
              const errorMessage = `Error al cargar la compra ${index + 1}: ${error.response?.data}`;
              handleMessage(errorMessage);
            } else {
              const errorMessage = `Error desconocido al cargar la compra ${index + 1}: ${error}`;
              handleMessage(errorMessage);
            }
          }
        });

        try {
          await Promise.all(promises);
          if (success) {
            handleMessage('Compras cargadas exitosamente');
            set({ purchases: [] }); // Clear purchases only on success
            return true;
          } else {
            return false;
          }
        } catch (error) {
          handleMessage(`Error al cargar las compras: ${error}`);
          return false;
        }
      },
      removePurchase: (index) => {
        set((state) => {
          const newPurchases = [...state.purchases];
          newPurchases.splice(index, 1);
          return { purchases: newPurchases };
        });
      }
    }),
    {
      name: 'purchases-storage',
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
