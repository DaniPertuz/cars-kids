import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { Transaction } from '../../../../infrastructure/interfaces';
import { useTransactionStore } from '../../../store/transactions/useTransactionsStore';
import { PurchasesListContent } from '../../purchases/PurchasesListContent';
import { RentalsListContent } from '../../rentals/RentalsListContent';
import { TransactionTotalMessage } from '../TransactionTotalMessage';

interface Props {
  entity: Transaction;
}

export const TransactionsListComponent = ({ entity }: Props) => {
  const { background } = useCustomTheme();
  const { purchases, rentals } = useTransactionStore();

  return (
    <Layout style={[styles.container, background]}>
      <TransactionTotalMessage entity={entity} purchases={purchases} rentals={rentals} />
      {entity === 'Purchase' ? <PurchasesListContent purchases={purchases} /> : <RentalsListContent rentals={rentals} />}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 15,
    marginHorizontal: 10
  }
});
