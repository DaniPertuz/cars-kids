import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DataLayout, CustomDivider, TopNavigation } from '../../ui';
import { DeskListComponent } from '../DeskListComponent';
import { LoadingScreen } from '../../../screens/LoadingScreen';
import { useDesksStore } from '../../../store/desk/useDeskStore';

export const DesksDataContainer = () => {
  const { bottom, top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const desks = useDesksStore(state => state.desks);
  const getAllDesks = useDesksStore(state => state.getAllDesks);
  const totalDesks = desks.length === 0;

  useEffect(() => {
    getAllDesks();
  }, []);

  return (
    <DataLayout paddingTop={height * 0.042}>
      <TopNavigation top={top} title='Puestos de trabajo' />
      <CustomDivider />
      {totalDesks
        ? <LoadingScreen />
        : <DeskListComponent bottom={bottom} desks={desks} />
      }
    </DataLayout>
  );
};
