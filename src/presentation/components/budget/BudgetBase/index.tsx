import { Layout } from '@ui-kitten/components';
import { NumericInput } from '../../forms';
import { Callout } from '../../ui';
import { styles } from './styles';

interface Props {
  value: number;
  onChangeText: (value: number) => void;
}

export const BudgetBase = ({ value, onChangeText }: Props) => {
  return (
    <Layout style={styles.baseContainer}>
      <Callout text='Base' />
      <Layout style={styles.baseItemContainer}>
        <NumericInput placeholder='Base' value={value} onChangeText={onChangeText} />
      </Layout>
    </Layout>
  );
};
