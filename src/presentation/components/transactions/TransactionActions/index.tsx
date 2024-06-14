import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Purchase, Rental } from '../../../../core/entities';
import { useDeskData } from '../../../hooks';
import { EditButton, DeleteButton } from '../../ui';
import { globalColors } from '../../../theme/globalColors';

interface Props {
  purchase?: Purchase;
  rental?: Rental;
}

export const TransactionActions = ({ purchase, rental }: Props) => {
  const { selectedDesk } = useDeskData();

  return (
    <Layout style={styles.container}>
      <EditButton iconSize={25} desk={selectedDesk!} purchase={purchase} rental={rental} />
      <DeleteButton iconName='trash-outline' iconSize={25} purchase={purchase} rental={rental} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  }
});
