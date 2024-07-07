import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../../hooks';
import { Callout } from '../../../ui';
import { TransactionIconTotal } from './TransactionIconTotal';

interface Props {
  cashTotal: number;
  transferTotal: number;
  total: number;
  count: number;
}

export const TransactionTotalMessageBody = ({ cashTotal, count, total, transferTotal }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[styles.mainContainer, background]}>
      <TransactionIconTotal transaction='cash' total={cashTotal} />
      <TransactionIconTotal transaction='transfers' total={transferTotal} />
      <Callout text={`Total: ${total}`} />
      <Callout text={`# ${count}`} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10
  }
});
