import { Layout } from '@ui-kitten/components';
import { Image, StyleSheet } from 'react-native';
import { Callout, CustomIcon } from '../../../../ui';
import { globalStyles } from '../../../../../styles/global.styles';

interface Props {
  transaction: 'cash' | 'transfers';
  total: number;
}

export const TransactionIconTotal = ({ transaction, total }: Props) => {
  return (
    <Layout style={styles.container}>
      {transaction === 'cash'
        ?
        <Image source={require('../../../../../../assets/money.png')} style={styles.iconSize} />
        :
        <CustomIcon name="credit-card-outline" size={styles.iconSize} />
      }
      <Callout text={`${total}`} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    ...globalStyles.mainBackground
  },
  iconSize: {
    height: 25,
    width: 25
  }
});
