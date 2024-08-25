import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DataLayout, CustomDivider, TopNavigation } from '../../ui';
import { DeskListComponent } from '../DeskListComponent';

export const DesksDataContainer = () => {
  const { top } = useSafeAreaInsets();

  return (
    <DataLayout paddingTop={Platform.OS === 'ios' ? top : top + 20}>
      <TopNavigation top={top} title='Puestos de trabajo' />
      <CustomDivider />
      <DeskListComponent />
    </DataLayout>
  );
};
