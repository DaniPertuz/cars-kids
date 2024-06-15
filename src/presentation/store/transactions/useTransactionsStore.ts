import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction } from '../../../infrastructure/interfaces';
import { Purchase, Rental } from '../../../core/entities';
import * as PurchasesUseCases from '../../../core/use-cases/purchases';
import * as RentalsUseCases from '../../../core/use-cases/rentals';

interface TransactionState {
  purchases: Purchase[];
  rentals: Rental[];
  addTransaction: (transaction: Purchase | Rental, type: Transaction) => void;
  updateTransaction: (index: number, updatedTransaction: Purchase | Rental, type: Transaction) => void;
  uploadTransactions: (type: Transaction, handleMessage: (message: string) => void) => Promise<boolean>;
  removeTransaction: (index: number, type: Transaction) => void;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      purchases: [],
      rentals: [],
      addTransaction: (transaction, type) => {
        set((state) => ({
          [type === 'Purchase' ? 'purchases' : 'rentals']: [...state[type === 'Purchase' ? 'purchases' : 'rentals'], transaction],
        }));
      },
      updateTransaction: (index, updatedTransaction, type) => {
        set((state) => {
          const transactions = [...state[type === 'Purchase' ? 'purchases' : 'rentals']];
          if (index >= 0 && index < transactions.length) {
            transactions[index] = updatedTransaction;
          }
          return { [type === 'Purchase' ? 'purchases' : 'rentals']: transactions };
        });
      },
      uploadTransactions: async (type, handleMessage) => {
        const transactions = useTransactionStore.getState()[type === 'Purchase' ? 'purchases' : 'rentals'];
        let success = true;
        const promises = transactions.map(async (transaction, index) => {
          try {
            const resp = type === 'Purchase'
              ? await PurchasesUseCases.createPurchaseUseCase(transaction as Purchase)
              : await RentalsUseCases.createRentalUseCase(transaction as Rental);
            if (resp) {
              success = true;
            }
          } catch (error: any) {
            success = false;
            if (error instanceof AxiosError) {
              const errorMessage = `Error al cargar ${type === 'Purchase' ? 'las compras' : 'los alquileres'} ${index + 1}: ${error.response?.data}`;
              handleMessage(errorMessage);
            } else {
              const errorMessage = `Error desconocido al cargar ${type === 'Purchase' ? 'las compras' : 'los alquileres'} ${index + 1}: ${error}`;
              handleMessage(errorMessage);
            }
          }
        });

        try {
          await Promise.all(promises);
          if (success) {
            handleMessage(`${type === 'Purchase' ? 'Compras cargadas' : 'Alquileres cargados'} exitosamente`);
            set({ [type === 'Purchase' ? 'purchases' : 'rentals']: [] });
            return true;
          } else {
            return false;
          }
        } catch (error) {
          handleMessage(`Error al cargar ${type === 'Purchase' ? 'las compras' : 'los alquileres'}: ${error}`);
          return false;
        }
      },
      removeTransaction: (index, type) => {
        set((state) => {
          const transactions = [...state[type === 'Purchase' ? 'purchases' : 'rentals']];
          transactions.splice(index, 1);
          return { [type === 'Purchase' ? 'purchases' : 'rentals']: transactions };
        });
      },
    }),
    {
      name: 'transactions-storage',
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
        },
      },
    }
  )
);
