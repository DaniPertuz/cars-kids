import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Desk } from '../../../../core/entities';
import { DataLayout, CustomDivider, TopNavigation } from '../../ui';
import { DeskListComponent } from '../DeskListComponent';

export const DesksDataContainer = ({ desks }: { desks: Desk[]; }) => {
  const { bottom, top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  return (
    <DataLayout paddingTop={height * 0.042}>
      <TopNavigation top={top} title='Puestos de trabajo' />
      <CustomDivider />
      <DeskListComponent bottom={bottom} desks={desks} />
    </DataLayout>
  );
};
