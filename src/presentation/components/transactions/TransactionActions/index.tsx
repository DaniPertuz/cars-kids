import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Purchase, Rental } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';
import { EditButton, DeleteButton } from '../../ui';

interface Props {
  purchase?: Purchase;
  rental?: Rental;
}

export const TransactionActions = ({ purchase, rental }: Props) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  return (
    <Layout style={[styles.container, platinumItemBackgroundColor]}>
      <EditButton iconSize={25} purchase={purchase} rental={rental} />
      <DeleteButton iconName='trash-outline' iconSize={25} purchase={purchase} rental={rental} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  }
});
