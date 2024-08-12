import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { useDesksStore } from '../../../store/desk/useDeskStore';
import { DataLayout, CustomDivider, TopNavigation, EmptyListMessage } from '../../ui';
import { DeskListComponent } from '../DeskListComponent';

export const DesksDataContainer = () => {
  const { background } = useCustomTheme();
  const { bottom, top } = useSafeAreaInsets();
  const desks = useDesksStore(state => state.desks);
  const getAllDesks = useDesksStore(state => state.getAllDesks);
  const totalDesks = desks.length === 0;

  useEffect(() => {
    getAllDesks();
  }, []);

  return (
    <DataLayout paddingTop={Platform.OS === 'ios' ? top : top + 20}>
      <TopNavigation top={top} title='Puestos de trabajo' />
      <CustomDivider />
      <Layout style={[{ paddingBottom: bottom + 50 }, background]}>
        {totalDesks
          ?
          <EmptyListMessage heightBy={0.9} text='No hay puestos de trabajo' />
          :
          <DeskListComponent bottom={bottom} desks={desks} />
        }
      </Layout>
    </DataLayout>
  );
};
