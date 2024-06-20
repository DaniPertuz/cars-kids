import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Purchase, Rental } from '../../../../core/entities';
import { Transaction } from '../../../../infrastructure/interfaces';
import { HeaderSix, CustomIcon } from '..';
import { globalStyles } from '../../../styles/global.styles';
import { globalColors } from '../../../theme/globalColors';

interface Props {
  purchase?: Purchase;
  rental?: Rental;
  transaction: Transaction;
  setVisible: () => void;
}

export const ModalTitle = ({ purchase, rental, transaction, setVisible }: Props) => {
  return (
    <Layout style={styles.container}>
      <HeaderSix text={`${(purchase || rental) ? 'Editar' : 'Agregar'} ${transaction === 'Purchase' ? 'compra' : 'alquiler'}`} />
      <TouchableOpacity activeOpacity={1.0} onPress={setVisible}>
        <CustomIcon name={'close-circle-outline'} size={{ height: 35, width: 35 }} fillColor={globalColors.secondaryRed} />
      </TouchableOpacity>
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
