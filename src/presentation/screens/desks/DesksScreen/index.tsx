import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainLayout } from '../../../components/ui';
import { AddDeskButton } from '../../../components/desks/AddDeskButton';
import { DesksDataContainer } from '../../../components/desks/DesksDataContainer';

export const DesksScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <MainLayout>
      <DesksDataContainer />
      <AddDeskButton top={top} />
    </MainLayout>
  );
};
