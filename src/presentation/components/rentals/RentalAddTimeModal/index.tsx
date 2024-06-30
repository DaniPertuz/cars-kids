import { useState } from 'react';
import { Card, Layout, Modal } from '@ui-kitten/components';
import { SnackbarAdapter } from '../../../../config/adapters/snackbar.adapter';
import { Rental } from '../../../../core/entities';
import { useTransactionStore } from '../../../store/transactions/useTransactionsStore';
import { DefaultInput, NumericInput } from '../../forms';
import { HeaderFive, PrimaryButton } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  index: number;
  rental: Rental;
  visible: boolean;
  advanceTime: (timeToAdd: number) => void;
  setVisible: (value: boolean) => void;
}

export const RentalAddTimeModal = ({ index, rental, visible, advanceTime, setVisible }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(0);
  const [exception, setException] = useState<string>('');
  const updateRental = useTransactionStore(state => state.updateTransaction);

  const onSubmit = () => {
    setLoading(true);
    if (minutes === 0 || exception.length === 0) {
      SnackbarAdapter.showSnackbar('Datos incompletos para agregar minutos');
      setLoading(false);
      return;
    }

    advanceTime((minutes * 60) * -1);
    updateRental(index, { ...rental, exception }, 'Rental');
    setLoading(false);
    setVisible(false);
    setMinutes(0);
  };

  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <Card style={globalStyles.mainBackground}>
        <Layout style={globalStyles.modalContainer}>
          <HeaderFive text='Agregar minutos' />
          <NumericInput placeholder='Minutos adicionales' value={minutes} onChangeText={setMinutes} />
          <DefaultInput placeholder='Observación' value={exception} onChangeText={setException} />
          <PrimaryButton disabled={loading} text={'Agregar'} onPress={onSubmit} />
        </Layout>
      </Card>
    </Modal>
  );
};
