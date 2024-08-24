import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDesksStore } from '../../../store/desk/useDeskStore';
import { DataLayout, CustomDivider, TopNavigation } from '../../ui';
import { DeskListComponent } from '../DeskListComponent';

export const DesksDataContainer = () => {
  const { top } = useSafeAreaInsets();
  const desks = useDesksStore(state => state.desks);
  const getAllDesks = useDesksStore(state => state.getAllDesks);

  useEffect(() => {
    getAllDesks();
  }, []);

  return (
    <DataLayout paddingTop={Platform.OS === 'ios' ? top : top + 20}>
      <TopNavigation top={top} title='Puestos de trabajo' />
      <CustomDivider />
      <DeskListComponent desks={desks} />
    </DataLayout>
  );
};
