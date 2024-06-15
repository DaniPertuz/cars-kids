import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Purchase, Rental } from '../../../../core/entities';
import { Transaction } from '../../../../infrastructure/interfaces';
import { HeaderSix, CustomIcon } from '..';
import { globalStyles } from '../../../styles/global.styles';
import { globalColors } from '../../../theme/globalColors';

export const ModalTitle = ({ purchase, rental, transaction }: { purchase?: Purchase, rental?: Rental, transaction: Transaction; }) => {
  return (
    <Layout style={styles.container}>
      <HeaderSix text={`${(purchase || rental) ? 'Editar' : 'Agregar'} ${transaction === 'Purchase' ? 'compra' : 'alquiler'}`} />
      <CustomIcon name='shopping-cart-outline' size={{ height: 35, width: 35 }} fillColor={globalColors.secondaryRed} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...globalStyles.mainBackground
  }
});
