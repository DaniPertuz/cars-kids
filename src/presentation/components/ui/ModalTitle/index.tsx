import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Budget, Purchase, Rental } from '../../../../core/entities';
import { Transaction } from '../../../../infrastructure/interfaces';
import { useCustomTheme } from '../../../hooks';
import { BasicButton, HeaderSix } from '..';
import { globalColors } from '../../../theme/globalColors';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  budget?: Budget;
  purchase?: Purchase;
  rental?: Rental;
  transaction?: Transaction;
  setVisible: () => void;
}

export const ModalTitle = ({ budget, purchase, rental, transaction, setVisible }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[styles.container, background]}>
      <HeaderSix text={`${transaction ? (purchase || rental ? 'Editar' : 'Agregar') : budget ? 'Actualizar' : 'Agregar'} ${transaction ? (transaction === 'Purchase' ? 'compra' : 'alquiler') : budget ? 'presupuesto' : 'puesto de trabajo'}`} />
      <BasicButton activeOpacity={1.0} iconName={'close-circle-outline'} fillColor={globalColors.primaryRed} size={{ height: 35, width: 35 }} onPress={setVisible} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.alignCenterRowSpaceBetween
  }
});
