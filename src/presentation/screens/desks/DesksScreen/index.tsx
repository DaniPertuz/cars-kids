import { AddDeskButton } from '../../../components/desks/AddDeskButton';
import { DesksDataContainer } from '../../../components/desks/DesksDataContainer';
import { MainLayout } from '../../../components/ui';

export const DesksScreen = () => {
  return (
    <MainLayout>
      <DesksDataContainer />
      <AddDeskButton />
    </MainLayout>
  );
};
