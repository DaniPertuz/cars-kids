import { CustomDivider, MainLayout, MainScreenHeader } from '../../../components/ui';
import { PurchaseEntryModal } from '../../../components/purchases/PurchaseEntryModal';
import { TransactionsListComponent } from '../../../components/transactions/TransactionListComponent';

export const PurchasesScreen = () => {
  return (
    <MainLayout>
      <MainScreenHeader title={'Compras'} ModalComponent={PurchaseEntryModal} transaction={'Purchase'} />
      <CustomDivider />
      <TransactionsListComponent entity={'Purchase'} />
    </MainLayout>
  );
};
