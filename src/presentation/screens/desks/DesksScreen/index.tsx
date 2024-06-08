import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainLayout } from '../../../components/ui';
import { AddDeskButton } from '../../../components/desks/AddDeskButton';
import { DesksDataContainer } from '../../../components/desks/DesksDataContainer';
import { useDeskData } from '../../../hooks';
import { LoadingScreen } from '../../LoadingScreen';

export const DesksScreen = () => {
  const { top } = useSafeAreaInsets();
  const { desks } = useDeskData();
  const totalDesks = desks.length === 0;

  return (
    <MainLayout>
      {totalDesks
        ? <LoadingScreen />
        :
        <>
          <DesksDataContainer desks={desks} />
          <AddDeskButton top={top} />
        </>
      }
    </MainLayout>
  );
};
