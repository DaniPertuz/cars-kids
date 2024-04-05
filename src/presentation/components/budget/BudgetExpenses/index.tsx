import { Layout } from '@ui-kitten/components';
import { NumericInput } from '../../forms';
import { Callout } from '../../ui';
import { styles } from './styles';

interface Props {
  value: number;
  onChangeText: (value: number) => void;
}

export const BudgetExpenses = ({ value, onChangeText }: Props) => {
  return (
    <Layout style={styles.expenseContainer}>
      <Callout text='Gastos' />
      <Layout style={styles.expenseItemContainer}>
        <NumericInput placeholder='Gastos' value={value} onChangeText={onChangeText} />
      </Layout>
    </Layout>
  );
};
