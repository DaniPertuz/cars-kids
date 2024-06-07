import { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { usePurchasesStore } from '../store/purchases/usePurchasesStore';
import { useDeskData } from './useDeskData';

export const useMainScreenHeaderData = ({ purchases }: { purchases: boolean; }) => {
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

  const handleUpload = async () => {
    if (purchases && purchasesList.length === 0) {
      Snackbar.show({ text: 'No hay compras para cargar', duration: Snackbar.LENGTH_LONG });
      return;
    }

    if (purchases && purchasesList.length > 0) {
      setLoading(true);
      const success = await uploadPurchases(handleSnackbarMessage);
      if (!success) {
        handleSnackbarMessage('Error al cargar las compras.');
        return;
      }
      setLoading(false);
    }
  };

  return {
    desks,
    loading,
    selectedDesk,
    visible,
    handleDesk,
    handleUpload,
    setVisible,
    showPurchaseModal
  }
}
