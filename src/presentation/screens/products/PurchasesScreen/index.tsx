import { CustomDivider, MainLayout, MainScreenHeader } from '../../../components/ui';
import { PurchasesListComponent } from '../../../components/purchases/PurchasesListComponent';
import { PurchaseEntryModal } from '../../../components/purchases/PurchaseEntryModal';

export const PurchasesScreen = () => {
  return (
    <MainLayout>
      <MainScreenHeader ModalComponent={PurchaseEntryModal} purchases />
      <CustomDivider />
      <PurchasesListComponent />
    </MainLayout>
  );
};
