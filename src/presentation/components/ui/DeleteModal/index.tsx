import { useState } from 'react';
import { Card, Layout, Modal } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';

import { Callout, PrimaryButton } from '../';
import { Desk, Product, Purchase, Rental, User, Vehicle } from '../../../../core/entities';
import * as DeskUseCases from '../../../../core/use-cases/desks';
import * as ProductUseCases from '../../../../core/use-cases/products';
import * as UserUseCases from '../../../../core/use-cases/users';
import * as VehicleUseCases from '../../../../core/use-cases/vehicles';
import { IStatus } from '../../../../infrastructure/interfaces';
import { useTransactionStore } from '../../../store/transactions/useTransactionsStore';

import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

interface Props {
  desk?: Desk;
  product?: Product;
  purchase?: Purchase;
  rental?: Rental;
  user?: User;
  vehicle?: Vehicle;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const DeleteModal = ({ desk, product, purchase, rental, user, vehicle, visible, setVisible }: Props) => {
  const [loading, setLoading] = useState(false);
  const purchases = useTransactionStore(state => state.purchases);
  const removeTransaction = useTransactionStore(state => state.removeTransaction);

  const handleDeleteDesk = async () => {
    setLoading(true);

    const resp = await DeskUseCases.deleteDeskUseCase(desk!);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    if (resp.desk) {
      setLoading(false);
      Snackbar.show({ text: `${desk?.name} eliminado`, duration: Snackbar.LENGTH_SHORT });
      setVisible(false);
      return;
    }
  }

  const handleDeleteProduct = async () => {
    setLoading(true);

    const resp = await ProductUseCases.deleteProductUseCase(product!);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    if (resp.product) {
      setLoading(false);
      Snackbar.show({ text: `Producto ${product?.name} eliminado`, duration: Snackbar.LENGTH_SHORT });
      setVisible(false);
      return;
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);

    const resp = user?.status === IStatus.Inactive ? await UserUseCases.updateUserStatusUseCase(user.email, IStatus.Active) : await UserUseCases.deactivateUserUseCase(user?.email!);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    if (resp.user) {
      setLoading(false);
      Snackbar.show({ text: `Usuario ${user?.name} reactivado`, duration: Snackbar.LENGTH_SHORT });
      setVisible(false);
      return;
    }

    if (resp.status) {
      setLoading(false);
      Snackbar.show({ text: `Usuario ${user?.name} desactivado`, duration: Snackbar.LENGTH_SHORT });
      setVisible(false);
      return;
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
      setLoading(false);
      Snackbar.show({ text: `Vehículo ${vehicle?.nickname} desactivado`, duration: Snackbar.LENGTH_SHORT });
      setVisible(false);
      return;
    }
  };

  const handleDeleteTransaction = () => {
    const index = purchases.indexOf(purchase!);
    removeTransaction(index, purchase ? 'Purchase' : 'Rental');
    Snackbar.show({ text: purchase ? 'Compra eliminada' : 'Alquiler eliminado', duration: Snackbar.LENGTH_SHORT });
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <Card style={globalStyles.mainBackground}>
        <Layout style={styles.container}>
          {desk && <Callout text={`¿Desea eliminar ${desk.name}?`} />}
          {product && <Callout text={`¿Desea desactivar el producto ${product.name}?`} />}
          {purchase && <Callout text={'¿Desea eliminar esta compra?'} />}
          {user && <Callout text={`¿Desea ${user.status === IStatus.Active ? 'desactivar' : 'reactivar'} el usuario ${user.name}?`} />}
          {vehicle && <Callout text={`¿Desea desactivar el vehículo ${vehicle.nickname}?`} />}
          <PrimaryButton disabled={loading} text={(purchase || desk || rental) ? 'Eliminar' : user?.status === IStatus.Inactive ? 'Reactivar' : 'Desactivar'} onPress={desk ? handleDeleteDesk : product ? handleDeleteProduct : rental ? handleDeleteTransaction : user ? handleDeleteUser : purchase ? handleDeleteTransaction : handleDeleteVehicle} />
        </Layout>
      </Card>
    </Modal>
  );
};
