import { Layout } from '@ui-kitten/components';
import { NumericInput } from '../../forms';
import { Callout } from '../../ui';
import { styles } from './styles';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
}

export const BudgetLoans = ({ value, onChangeText }: Props) => {
  return (
    <Layout style={styles.loanContainer}>
      <Callout text='Préstamos' />
      <Layout style={styles.loanItemContainer}>
        <NumericInput placeholder='Préstamos' value={value} onChangeText={onChangeText} />
      </Layout>
    </Layout>
  );
};
