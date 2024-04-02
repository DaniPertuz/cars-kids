import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { BudgetBase, BudgetExpenses, BudgetLoans } from '../../../components/budget';
import { Back, HeaderFive, PrimaryButton } from '../../../components/ui';

import { styles } from './styles';

export const BudgetScreen = () => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState({
    base: '',
    loans: '',
    expenses: ''
  });

  const { base, loans, expenses } = budget;

  const onSubmit = () => {
    setLoading(true);
    setLoading(false);
  }

  return (
    <Layout style={{ paddingTop: height * 0.042, ...styles.container }}>
      <Back top={top} />
      <HeaderFive text={'Presupuesto'} />
      <BudgetBase value={base} onChangeText={(base: string) => setBudget({ ...budget, base })} />
      <BudgetLoans value={loans} onChangeText={(loans: string) => setBudget({ ...budget, loans })} />
      <BudgetExpenses value={expenses} onChangeText={(expenses: string) => setBudget({ ...budget, expenses })} />
      <PrimaryButton text='Actualizar' onPress={onSubmit} disabled={loading} />
    </Layout>
  );
};
