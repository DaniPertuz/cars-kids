import { useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { FAB } from '../../ui';
import { VehicleEntryModal } from '../VehicleEntryModal';
import { styles } from './styles';

export const VehicleAddButton = () => {
  const [visible, setVisible] = useState(false);
  const { background } = useCustomTheme();
  return (
    <Layout style={[styles.container, background]}>
      <FAB iconName='plus-circle-outline' iconSize={50} onPress={() => setVisible(true)} />
      <VehicleEntryModal visible={visible} setVisible={setVisible} />
    </Layout>
  );
};
