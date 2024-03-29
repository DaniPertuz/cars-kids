import { useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { AddButton } from '../../ui';
import { AddNewVehicleModal } from '../AddNewVehicleModal';
import { styles } from './styles';

interface Props {
  top: number;
}

export const VehicleAddButton = ({ top }: Props) => {
  const [visible, setVisible] = useState(false);
  return (
    <Layout style={{ marginTop: top, ...styles.container }}>
      <AddButton iconSize={50} onPress={() => setVisible(true)} />
      <AddNewVehicleModal visible={visible} setVisible={setVisible} />
    </Layout>
  );
};
