import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Purchase } from '../../../../core/entities';
import { useDeskData } from '../../../hooks';
import { EditButton, DeleteButton } from '../../ui';
import { globalColors } from '../../../theme/globalColors';

export const PurchaseActions = ({ purchase }: { purchase: Purchase; }) => {
  const { selectedDesk } = useDeskData();

  return (
    <Layout style={styles.container}>
      <EditButton iconSize={25} desk={selectedDesk!} purchase={purchase} />
      <DeleteButton iconName='trash-outline' iconSize={25} purchase={purchase} />
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
