import { CustomDivider, MainLayout, MainScreenHeader } from '../../../components/ui';
import { TransactionEntryModal } from '../../../components/transactions/TransactionEntryModal';
import { TransactionsListComponent } from '../../../components/transactions/TransactionListComponent';

export const PurchasesScreen = () => {
  return (
    <MainLayout>
      <MainScreenHeader title={'Compras'} ModalComponent={TransactionEntryModal} transaction={'Purchase'} />
      <CustomDivider />
      <TransactionsListComponent entity={'Purchase'} />
    </MainLayout>
  );
};
