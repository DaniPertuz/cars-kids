import { useEffect, useState } from 'react';
import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
import { Transaction } from '../../infrastructure/interfaces';
import { useDesksStore } from '../store/desk/useDeskStore';
import { useTransactionStore } from '../store/transactions/useTransactionsStore';

export const useMainScreenHeaderData = ({ transaction }: { transaction: Transaction; }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { desks, selectedDesk, getDesksTotal, setSelectedDesk } = useDesksStore();
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

  const uploadTransaction = async () => {
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

  useEffect(() => {
    getDesksTotal();
  }, []);

  return {
    desks,
    loading,
    selectedDesk,
    visible,
    handleDesk,
    uploadTransaction,
    setVisible,
    showTransactionModal
  };
};
