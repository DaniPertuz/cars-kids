import { CustomDivider, MainLayout, MainScreenHeader } from '../../../components/ui';
import { RentalEntryModal } from '../../../components/rentals/RentalEntryModal';
import { TransactionsListComponent } from '../../../components/transactions/TransactionListComponent';

export const RentalsScreen = () => {
  return (
    <MainLayout>
      <MainScreenHeader title='Alquileres' transaction={'Rental'} ModalComponent={RentalEntryModal} />
      <CustomDivider />
      <TransactionsListComponent entity='Rental' />
    </MainLayout>
  );
};
