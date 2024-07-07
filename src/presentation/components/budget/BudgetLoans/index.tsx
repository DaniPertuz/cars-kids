import { Layout } from '@ui-kitten/components';
import { NumericInput } from '../../forms';
import { Callout } from '../../ui';
import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  value: number;
  onChangeText: (value: number) => void;
}

export const BudgetLoans = ({ value, onChangeText }: Props) => {
  return (
    <Layout style={styles.loanContainer}>
      <Callout text='Préstamos' textColor={globalColors.dark} />
      <Layout style={styles.loanItemContainer}>
        <NumericInput placeholder='Préstamos' value={value} onChangeText={onChangeText} />
      </Layout>
    </Layout>
  );
};
