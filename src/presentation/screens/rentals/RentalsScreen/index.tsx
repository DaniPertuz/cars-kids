import { CustomDivider, MainLayout, MainScreenHeader } from '../../../components/ui';
import { TransactionEntryModal } from '../../../components/transactions/TransactionEntryModal';
import { TransactionsListComponent } from '../../../components/transactions/TransactionListComponent';

export const RentalsScreen = () => {
  return (
    <MainLayout>
      <MainScreenHeader title='Alquileres' transaction={'Rental'} ModalComponent={TransactionEntryModal} />
      <CustomDivider />
      <TransactionsListComponent entity='Rental' />
    </MainLayout>
  );
};
