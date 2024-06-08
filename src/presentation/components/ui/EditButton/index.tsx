import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { Budget, Desk, Product, Purchase, User, Vehicle } from '../../../../core/entities';
import { BudgetEntryModal } from '../../budget/BudgetEntryModal';
import { DeskEntryModal } from '../../desks/DeskEntryModal';
import { ProductEntryModal } from '../../products/ProductEntryModal';
import { PurchaseEntryModal } from '../../purchases/PurchaseEntryModal';
import { UserEntryModal } from '../../users/UserEntryModal';
import { VehicleEntryModal } from '../../vehicles/VehicleEntryModal';
import { CustomIcon } from '../';

import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  iconSize: number;
  budget?: Budget;
  desk?: Desk;
  product?: Product;
  purchase?: Purchase;
  user?: User;
  vehicle?: Vehicle;
}

export const EditButton = ({ iconSize, budget, desk, product, purchase, user, vehicle }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <TouchableOpacity activeOpacity={1.0} onPress={() => setVisible(true)}>
      <Layout style={styles.container}>
        <CustomIcon name='edit-outline' size={{ height: iconSize, width: iconSize }} fillColor={globalColors.white} />
        {budget && <BudgetEntryModal budget={budget} visible={visible} setVisible={setVisible} />}
        {desk && <DeskEntryModal desk={desk} visible={visible} setVisible={setVisible} />}
        {product && <ProductEntryModal product={product} visible={visible} setVisible={setVisible} />}
        {purchase && <PurchaseEntryModal visible={visible} setVisible={setVisible} purchase={purchase} desk={desk!} />}
        {user && <UserEntryModal user={user} visible={visible} setVisible={setVisible} />}
        {vehicle && <VehicleEntryModal vehicle={vehicle} visible={visible} setVisible={setVisible} />}
      </Layout>
    </TouchableOpacity>
  );
};
