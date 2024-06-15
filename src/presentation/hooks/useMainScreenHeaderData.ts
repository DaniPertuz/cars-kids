import { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { Transaction } from '../../infrastructure/interfaces';
import { useTransactionStore } from '../store/transactions/useTransactionsStore';
import { useDeskData } from './useDeskData';

export const useMainScreenHeaderData = ({ transaction }: { transaction: Transaction; }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { desks, selectedDesk, setSelectedDesk } = useDeskData();
  const uploadTransactions = useTransactionStore(state => state.uploadTransactions);
  const purchasesList = useTransactionStore(state => state.purchases);
  const rentalsList = useTransactionStore(state => state.rentals);

  const showTransactionModal = () => {
    setVisible(true);
  };

  const handleDesk = (value: string) => {
    const selectedDesk = desks.find(d => d.name === value);
    if (selectedDesk) {
      setSelectedDesk(selectedDesk);
    }
  };

  const handleSnackbarMessage = (message: string) => {
    Snackbar.show({ text: message, duration: Snackbar.LENGTH_LONG });
  };

  const uploadPurchase = async () => {
    const isPurchaseTransaction = transaction === 'Purchase';

    if (isPurchaseTransaction && purchasesList.length === 0) {
      Snackbar.show({ text: 'No hay compras para cargar', duration: Snackbar.LENGTH_LONG });
      return;
    }

    if (!isPurchaseTransaction && rentalsList.length === 0) {
      Snackbar.show({ text: 'No hay alquileres para cargar', duration: Snackbar.LENGTH_LONG });
      return;
    }

    setLoading(true);
    const success = await uploadTransactions(isPurchaseTransaction ? 'Purchase' : 'Rental', handleSnackbarMessage);
    if (!success) {
      handleSnackbarMessage('Error al cargar las compras.');
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  return {
    desks,
    loading,
    selectedDesk,
    visible,
    handleDesk,
    uploadPurchase,
    setVisible,
    showTransactionModal
  };
};
