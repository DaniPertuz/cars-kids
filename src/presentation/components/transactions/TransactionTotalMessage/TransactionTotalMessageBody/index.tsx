import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Callout } from '../../../ui';
import { TransactionIconTotal } from './TransactionIconTotal';
import { globalStyles } from '../../../../styles/global.styles';

export const TransactionTotalMessageBody = (cashTotal: number, transferTotal: number, total: number) => (
  <Layout style={styles.mainContainer}>
    <TransactionIconTotal transaction='cash' total={cashTotal} />
    <TransactionIconTotal transaction='transfers' total={transferTotal} />
    <Callout text={`Total: ${total}`} />
  </Layout>
);

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    ...globalStyles.mainBackground
  }
});
