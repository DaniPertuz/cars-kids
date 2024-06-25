import { useState } from 'react';
import { Card, Layout, Modal } from '@ui-kitten/components';

import { Callout, PrimaryButton } from '../';
import { SnackbarAdapter } from '../../../../config/adapters/snackbar.adapter';
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
      SnackbarAdapter.showSnackbar(resp.error);
      return;
    }

    if (resp.desk) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(`${desk?.name} eliminado`);
      setVisible(false);
      return;
    }
  };

  const handleDeleteProduct = async () => {
    setLoading(true);

    const resp = await ProductUseCases.deleteProductUseCase(product!);

    if (resp.error) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(resp.error);
      return;
    }

    if (resp.product) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(`Producto ${product?.name} eliminado`);
      setVisible(false);
      return;
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);

    const resp = user?.status === IStatus.Inactive ? await UserUseCases.updateUserStatusUseCase(user.email, IStatus.Active) : await UserUseCases.deactivateUserUseCase(user?.email!);

    if (resp.error) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(resp.error);
      return;
    }

    if (resp.user) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(`Usuario ${user?.name} reactivado`);
      setVisible(false);
      return;
    }

    if (resp.status) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(`Usuario ${user?.name} desactivado`);
      setVisible(false);
      return;
    }
  };

  const handleDeleteVehicle = async () => {
    setLoading(true);

    const resp = await VehicleUseCases.deleteVehicleUseCase(vehicle!);

    if (resp.error) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(resp.error);
      return;
    }

    if (resp.status) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(`Vehículo ${vehicle?.nickname} desactivado`);
      setVisible(false);
      return;
    }
  };

  const handleDeleteTransaction = () => {
    const index = purchases.indexOf(purchase!);
    removeTransaction(index, purchase ? 'Purchase' : 'Rental');
    SnackbarAdapter.showSnackbar(purchase ? 'Compra eliminada' : 'Alquiler eliminado');
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
          {rental && <Callout text={'¿Desea eliminar este alquiler?'} />}
          {user && <Callout text={`¿Desea ${user.status === IStatus.Active ? 'desactivar' : 'reactivar'} el usuario ${user.name}?`} />}
          {vehicle && <Callout text={`¿Desea desactivar el vehículo ${vehicle.nickname}?`} />}
          <PrimaryButton activeOpacity={0.6} disabled={loading} text={(purchase || desk || rental) ? 'Eliminar' : user?.status === IStatus.Inactive ? 'Reactivar' : 'Desactivar'} onPress={desk ? handleDeleteDesk : product ? handleDeleteProduct : (purchase || rental) ? handleDeleteTransaction : user ? handleDeleteUser : handleDeleteVehicle} />
        </Layout>
      </Card>
    </Modal>
  );
};
