import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { CustomIcon } from '../';
import { IVehicle } from '../../../../infrastructure/interfaces';
import { VehicleEntryModal } from '../../vehicles/VehicleEntryModal';

import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  iconSize: number;
  vehicle: IVehicle;
}

export const EditButton = ({ iconSize, vehicle }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <TouchableOpacity activeOpacity={1.0} onPress={() => setVisible(true)}>
      <Layout style={styles.container}>
        <CustomIcon name='edit-outline' size={{ height: iconSize, width: iconSize }} fillColor={globalColors.white} />
        <VehicleEntryModal vehicle={vehicle} visible={visible} setVisible={setVisible} />
      </Layout>
    </TouchableOpacity>
  );
};
