import { useState } from 'react';
import { Card, Layout, Modal } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';

import { Callout, PrimaryButton } from '../';
import { useVehiclesData } from '../../../hooks';
import { IStatus, IVehicle } from '../../../../infrastructure/interfaces';
import { useVehicleStore } from '../../../store/vehicles/useVehicleStore';

import { styles } from './styles';

interface Props {
  vehicle?: IVehicle;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const DeleteModal = ({ vehicle, visible, setVisible }: Props) => {
  const [loading, setLoading] = useState(false);
  const { updateVehicleStatus } = useVehiclesData();

  const { deleteVehicle } = useVehicleStore();

  const handleDeleteVehicle = async () => {
    setLoading(true);

    const resp = await deleteVehicle(vehicle!);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    Snackbar.show({ text: 'Vehículo desactivado', duration: Snackbar.LENGTH_SHORT });
    setVisible(false);

    const updatedVehicle = { ...vehicle!, status: IStatus.Inactive };
    updateVehicleStatus(updatedVehicle);
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <Card>
        <Layout style={styles.container}>
          <Callout text={`¿Desea desactivar el vehículo ${vehicle?.nickname}?`} />
          <PrimaryButton disabled={loading} text='Desactivar' onPress={handleDeleteVehicle} />
        </Layout>
      </Card>
    </Modal>
  );
};
