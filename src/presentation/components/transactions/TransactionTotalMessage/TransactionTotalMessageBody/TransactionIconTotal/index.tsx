import { Layout } from '@ui-kitten/components';
import { Image, StyleSheet } from 'react-native';
import { useCustomTheme } from '../../../../../hooks';
import { Callout, CustomIcon } from '../../../../ui';
import { globalStyles } from '../../../../../styles/global.styles';

interface Props {
  transaction: 'cash' | 'transfers';
  total: number;
}

export const TransactionIconTotal = ({ transaction, total }: Props) => {
  const { background, isDarkMode } = useCustomTheme();
  return (
    <Layout style={[styles.container, background]}>
      {transaction === 'cash'
        ?
        <Image source={isDarkMode ? require('../../../../../../assets/money_dark.png') : require('../../../../../../assets/money.png')} style={globalStyles.iconSize} />
        :
        <CustomIcon name="credit-card-outline" size={globalStyles.iconSize} />
      }
      <Callout text={`${total}`} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10
  }
});
