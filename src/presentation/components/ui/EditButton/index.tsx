import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { CustomIcon } from '../';
import { BudgetEntryModal } from '../../budget/BudgetEntryModal';
import { ProductEntryModal } from '../../products/ProductEntryModal';
import { UserEntryModal } from '../../users/UserEntryModal';
import { VehicleEntryModal } from '../../vehicles/VehicleEntryModal';
import { Budget, Product, User, Vehicle } from '../../../../core/entities';

import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  iconSize: number;
  budget?: Budget;
  product?: Product;
  user?: User;
  vehicle?: Vehicle;
}

export const EditButton = ({ iconSize, budget, product, user, vehicle }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <TouchableOpacity activeOpacity={1.0} onPress={() => setVisible(true)}>
      <Layout style={styles.container}>
        <CustomIcon name='edit-outline' size={{ height: iconSize, width: iconSize }} fillColor={globalColors.white} />
        {budget && <BudgetEntryModal budget={budget} visible={visible} setVisible={setVisible} />}
        {product && <ProductEntryModal product={product} visible={visible} setVisible={setVisible} />}
        {user && <UserEntryModal user={user} visible={visible} setVisible={setVisible} />}
        {vehicle && <VehicleEntryModal vehicle={vehicle} visible={visible} setVisible={setVisible} />}
      </Layout>
    </TouchableOpacity>
  );
};
