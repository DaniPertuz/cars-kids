import { Layout } from '@ui-kitten/components';
import { NumericInput } from '../../forms';
import { Callout } from '../../ui';
import { styles } from './styles';

interface Props {
  value: number;
  onChangeText: (value: number) => void;
}

export const BudgetPayroll = ({ value, onChangeText }: Props) => {
  return (
    <Layout style={styles.baseContainer}>
      <Callout text='Nómina' />
      <Layout style={styles.baseItemContainer}>
        <NumericInput placeholder='Nómina' value={value} onChangeText={onChangeText} />
      </Layout>
    </Layout>
  );
};
