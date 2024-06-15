import { useState } from 'react';
import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
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
    SnackbarAdapter.showSnackbar(message);
  };

  const uploadPurchase = async () => {
    const isPurchaseTransaction = transaction === 'Purchase';

    if (isPurchaseTransaction && purchasesList.length === 0) {
      SnackbarAdapter.showSnackbar('No hay compras para cargar');
      return;
    }

    if (!isPurchaseTransaction && rentalsList.length === 0) {
      SnackbarAdapter.showSnackbar('No hay alquileres para cargar');
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
