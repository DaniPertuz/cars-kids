import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { CustomIcon, DeleteModal } from '../';
import { Product, User, Vehicle } from '../../../../core/entities';
import { IStatus } from '../../../../infrastructure/interfaces';
import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  iconName: string;
  iconSize: number;
  product?: Product;
  user?: User;
  vehicle?: Vehicle;
}

export const DeleteButton = ({ iconName, iconSize, product, user, vehicle }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout style={[styles.container, { backgroundColor: user?.status === IStatus.Inactive ? globalColors.successLight : globalColors.primaryRed }]}>
      <TouchableOpacity activeOpacity={1.0} onPress={() => setVisible(true)}>
        <CustomIcon name={iconName} size={{ height: iconSize, width: iconSize }} fillColor={globalColors.white} />
      </TouchableOpacity>
      <DeleteModal visible={visible} setVisible={setVisible} product={product} vehicle={vehicle} user={user} />
    </Layout>
  );
};
