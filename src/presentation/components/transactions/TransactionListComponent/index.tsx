import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { IPayment, IStatus, IUserRole, IVehicleCategory, IVehicleSize, Transaction } from '../../../../infrastructure/interfaces';
import { usePurchasesStore } from '../../../store/purchases/usePurchasesStore';
import { PurchasesList } from '../../purchases/PurchasesList';
import { EmptyListMessage } from '../../ui';
import { Rental } from '../../../../core/entities';
import { RentalsList } from '../../rentals/RentalsList';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  entity: Transaction;
}

export const TransactionsListComponent = ({ entity }: Props) => {
  const purchases = usePurchasesStore(state => state.purchases);
  const rentals: Rental[] = [{
    client: '',
    time: 15,
    date: new Date(),
    vehicle: {
      nickname: 'Vehículo 1',
      category: IVehicleCategory.Car,
      color: '#1DCFA1',
      size: IVehicleSize.Large
    },
    payment: IPayment.Cash,
    amount: 10000,
    desk: {
      name: 'Puesto 1'
    },
    user: {
      email: 'usuario@test.com',
      name: 'Usuario Test',
      role: IUserRole.Admin,
      status: IStatus.Active
    }
  }]

  return (
    <Layout style={styles.container}>
      {entity === 'Purchase'
        ?
        <>
          {purchases.length === 0
            ?
            <EmptyListMessage heightBy={0.75} text='No hay compras' />
            :
            <PurchasesList purchases={purchases} />
          }
        </>
        :
        <>
          {rentals.length === 0
            ?
            <EmptyListMessage heightBy={0.75} text='No hay alquileres' />
            :
            <RentalsList rentals={rentals} />
          }
        </>
      }
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 15,
    marginHorizontal: 20,
    ...globalStyles.mainBackground
  }
});
