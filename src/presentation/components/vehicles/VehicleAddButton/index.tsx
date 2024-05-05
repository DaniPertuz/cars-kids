import { useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { FAB } from '../../ui';
import { VehicleEntryModal } from '../VehicleEntryModal';
import { styles } from './styles';

interface Props {
  top: number;
}

export const VehicleAddButton = ({ top }: Props) => {
  const [visible, setVisible] = useState(false);
  return (
    <Layout style={{ marginTop: top, ...styles.container }}>
      <FAB iconName='plus-circle-outline' iconSize={50} onPress={() => setVisible(true)} />
      <VehicleEntryModal visible={visible} setVisible={setVisible} />
    </Layout>
  );
};
