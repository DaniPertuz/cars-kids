import { useState } from 'react';
import { Card, Layout, Modal } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';

import { Callout, PrimaryButton } from '../';
import { deleteProduct } from '../../../../actions/products';
import { Product, Vehicle } from '../../../../core/entities';
import * as VehicleUseCases from '../../../../core/use-cases/vehicles';

import { styles } from './styles';

interface Props {
  product?: Product;
  vehicle?: Vehicle;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const DeleteModal = ({ product, vehicle, visible, setVisible }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteProduct = async () => {
    setLoading(true);

    const resp = await deleteProduct(product!);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    if (resp.product) {
      Snackbar.show({ text: 'Producto eliminado', duration: Snackbar.LENGTH_SHORT });
      setVisible(false);
    }
  };

  const handleDeleteVehicle = async () => {
    setLoading(true);

    const resp = await VehicleUseCases.deleteVehicleUseCase(vehicle!);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    if (resp.status) {
      Snackbar.show({ text: 'Vehículo desactivado', duration: Snackbar.LENGTH_SHORT });
      setVisible(false);
    }
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <Card>
        <Layout style={styles.container}>
          {product && <Callout text={`¿Desea desactivar el producto ${product.name}?`} />}
          {vehicle && <Callout text={`¿Desea desactivar el vehículo ${vehicle.nickname}?`} />}
          <PrimaryButton disabled={loading} text='Desactivar' onPress={product ? handleDeleteProduct : handleDeleteVehicle} />
        </Layout>
      </Card>
    </Modal>
  );
};
