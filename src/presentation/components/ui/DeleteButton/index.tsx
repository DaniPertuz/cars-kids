import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { CustomIcon, DeleteModal } from '../';
import { IVehicle } from '../../../../infrastructure/interfaces';
import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  iconSize: number;
  vehicle: IVehicle;
}

export const DeleteButton = ({ iconSize, vehicle }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout style={styles.container}>
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => setVisible(true)}
      >
        <CustomIcon name='trash-outline' size={{ height: iconSize, width: iconSize }} fillColor={globalColors.white} />
      </TouchableOpacity>
      <DeleteModal visible={visible} setVisible={setVisible} vehicle={vehicle} />
    </Layout>
  );
};
