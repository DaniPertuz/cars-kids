import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Transaction } from '../../../../infrastructure/interfaces';
import { useTransactionStore } from '../../../store/transactions/useTransactionsStore';
import { PurchasesListContent } from '../../purchases/PurchasesListContent';
import { RentalsListContent } from '../../rentals/RentalsListContent';
import { TransactionTotalMessage } from '../TransactionTotalMessage';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  entity: Transaction;
}

export const TransactionsListComponent = ({ entity }: Props) => {
  const purchases = useTransactionStore(state => state.purchases);
  const rentals = useTransactionStore(state => state.rentals);

  return (
    <Layout style={styles.container}>
      <TransactionTotalMessage entity={entity} purchases={purchases} rentals={rentals} />
      {entity === 'Purchase' ? <PurchasesListContent purchases={purchases} /> : <RentalsListContent rentals={rentals} />}
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
