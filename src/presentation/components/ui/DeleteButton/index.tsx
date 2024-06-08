import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { CustomIcon, DeleteModal } from '../';
import { Desk, Product, Purchase, User, Vehicle } from '../../../../core/entities';
import { IStatus } from '../../../../infrastructure/interfaces';
import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  iconName: string;
  iconSize: number;
  desk?: Desk;
  product?: Product;
  purchase?: Purchase;
  user?: User;
  vehicle?: Vehicle;
}

export const DeleteButton = ({ iconName, iconSize, desk, product, purchase, user, vehicle }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout style={[styles.container, { backgroundColor: user?.status === IStatus.Inactive ? globalColors.successLight : globalColors.primaryRed }]}>
      <TouchableOpacity activeOpacity={1.0} onPress={() => setVisible(true)}>
        <CustomIcon name={iconName} size={{ height: iconSize, width: iconSize }} fillColor={globalColors.white} />
      </TouchableOpacity>
      <DeleteModal visible={visible} setVisible={setVisible} desk={desk} product={product} vehicle={vehicle} user={user} purchase={purchase} />
    </Layout>
  );
};
