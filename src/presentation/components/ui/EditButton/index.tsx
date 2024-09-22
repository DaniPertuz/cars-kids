import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { Budget, Desk, Product, Purchase, Rental, User, Vehicle } from '../../../../core/entities';
import { BudgetEntryModal } from '../../budget/BudgetEntryModal';
import { DeskEntryModal } from '../../desks/DeskEntryModal';
import { ProductEntryModal } from '../../products/ProductEntryModal';
import { TransactionEntryModal } from '../../transactions/TransactionEntryModal';
import { UserEntryModal } from '../../users/UserEntryModal';
import { VehicleEntryModal } from '../../vehicles/VehicleEntryModal';
import { CustomIcon } from '../';

import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  iconSize: number;
  budget?: Budget;
  updateDesk?: Desk;
  desk?: Desk;
  product?: Product;
  purchase?: Purchase;
  rental?: Rental;
  user?: User;
  vehicle?: Vehicle;
}

export const EditButton = ({ iconSize, budget, desk, updateDesk, product, purchase, rental, user, vehicle }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => setVisible(true)}>
      <Layout style={styles.container}>
        <CustomIcon name='edit-outline' size={{ height: iconSize, width: iconSize }} fillColor={globalColors.white} />
        {budget && <BudgetEntryModal budget={budget} visible={visible} setVisible={setVisible} />}
        {updateDesk && <DeskEntryModal desk={desk} visible={visible} setVisible={setVisible} />}
        {product && <ProductEntryModal product={product} visible={visible} setVisible={setVisible} />}
        {purchase && <TransactionEntryModal visible={visible} setVisible={setVisible} purchase={purchase} desk={desk!} transaction={'Purchase'} />}
        {rental && <TransactionEntryModal visible={visible} setVisible={setVisible} rental={rental} desk={desk!} transaction={'Rental'} />}
        {user && <UserEntryModal user={user} visible={visible} setVisible={setVisible} />}
        {vehicle && <VehicleEntryModal vehicle={vehicle} visible={visible} setVisible={setVisible} />}
      </Layout>
    </TouchableOpacity>
  );
};
