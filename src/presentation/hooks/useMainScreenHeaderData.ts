import { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { usePurchasesStore } from '../store/purchases/usePurchasesStore';
import { useDeskData } from './useDeskData';

export const useMainScreenHeaderData = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { desks, selectedDesk, setSelectedDesk } = useDeskData();
  const uploadPurchases = usePurchasesStore(state => state.uploadPurchases);
  const purchasesList = usePurchasesStore(state => state.purchases);

  const showPurchaseModal = () => {
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
    if (purchasesList.length === 0) {
      Snackbar.show({ text: 'No hay compras para cargar', duration: Snackbar.LENGTH_LONG });
      return;
    }

    setLoading(true);
    const success = await uploadPurchases(handleSnackbarMessage);
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
    showPurchaseModal
  };
};
