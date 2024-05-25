import { CustomDivider, MainLayout, MainScreenHeader } from '../../../components/ui';
import { PurchasesListComponent } from '../../../components/purchases/PurchasesListComponent';

export const PurchasesScreen = () => {
  return (
    <MainLayout>
      <MainScreenHeader />
      <CustomDivider />
      <PurchasesListComponent />
    </MainLayout>
  );
};
