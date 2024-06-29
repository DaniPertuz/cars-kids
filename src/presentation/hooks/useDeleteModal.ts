import { useState } from 'react';
import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
import { Desk, Product, Purchase, Rental, User, Vehicle } from '../../core/entities';
import * as DeskUseCases from '../../core/use-cases/desks';
import * as ProductUseCases from '../../core/use-cases/products';
import * as UserUseCases from '../../core/use-cases/users';
import * as VehicleUseCases from '../../core/use-cases/vehicles';
import { IStatus } from '../../infrastructure/interfaces';
import { useTransactionStore } from '../store/transactions/useTransactionsStore';

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

export const useDeleteModal = ({ desk, product, purchase, rental, user, vehicle, visible, setVisible }: Props) => {
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

  return {
    loading,
    handleDeleteDesk,
    handleDeleteProduct,
    handleDeleteTransaction,
    handleDeleteUser,
    handleDeleteVehicle
  }
}
