import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { EmptyListMessage } from '../../ui';
import { PurchasesList } from '../PurchasesList';
import { globalStyles } from '../../../styles/global.styles';
import { usePurchasesStore } from '../../../store/purchases/usePurchasesStore';

export const PurchasesListComponent = () => {
  const purchases = usePurchasesStore(state => state.purchases);

  return (
    <Layout style={styles.container}>
      {purchases.length === 0
        ?
        <EmptyListMessage heightBy={0.75} text='No hay compras' />
        :
        <PurchasesList purchases={purchases} />
      }
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 15,
    marginHorizontal: 20,
    ...globalStyles.mainBackground
  }
});
