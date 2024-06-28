import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Purchase, Rental } from '../../../../core/entities';
import { Transaction } from '../../../../infrastructure/interfaces';
import { HeaderSix, ModalCloseButton } from '..';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  purchase?: Purchase;
  rental?: Rental;
  transaction?: Transaction;
  setVisible: () => void;
}

export const ModalTitle = ({ purchase, rental, transaction, setVisible }: Props) => {
  return (
    <Layout style={styles.container}>
      <HeaderSix text={`${transaction ? (purchase || rental ? 'Editar' : 'Agregar') : 'Agregar'} ${transaction ? (transaction === 'Purchase' ? 'compra' : 'alquiler') : 'puesto de trabajo'}`} />
      <ModalCloseButton onPress={setVisible} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.alignCenterRowSpaceBetween,
    ...globalStyles.mainBackground
  }
});
