import { CustomDivider, MainLayout, MainScreenHeader } from '../../../components/ui';
import { PurchaseEntryModal } from '../../../components/purchases/PurchaseEntryModal';
import { TransactionsListComponent } from '../../../components/transactions/TransactionListComponent';

export const RentalsScreen = () => {
  return (
    <MainLayout>
      <MainScreenHeader title='Alquileres' transaction={'Rental'} ModalComponent={PurchaseEntryModal} />
      <CustomDivider />
      <TransactionsListComponent entity='Rental' />
    </MainLayout>
  );
};
