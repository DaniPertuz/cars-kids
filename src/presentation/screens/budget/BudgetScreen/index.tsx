import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { BudgetBase, BudgetExpenses, BudgetLoans, BudgetPayroll } from '../../../components/budget';
import { PrimaryButton, TopNavigation } from '../../../components/ui';
import { useBudgetData, useCustomTheme } from '../../../hooks';
import { LoadingScreen } from '../../LoadingScreen';

import { styles } from './styles';

export const BudgetScreen = () => {
  const { background } = useCustomTheme();
  const { top } = useSafeAreaInsets();

  const { loading, dayBudget, onSubmit, setDayBudget } = useBudgetData();

  const { base, loans, expenses, payroll } = dayBudget;

  return (
    <Layout style={{ paddingTop: Platform.OS === 'ios' ? top : top + 20, ...styles.container, ...background }}>
      <TopNavigation top={top} title='Presupuesto' />
      {(!dayBudget) || (base === -1 && loans === -1 && expenses === -1)
        ?
        <LoadingScreen />
        :
        <>
          <BudgetBase value={base} onChangeText={(newBase: number) => setDayBudget(prev => ({ ...prev, base: newBase }))} />
          <BudgetLoans value={loans} onChangeText={(newLoans: number) => setDayBudget(prev => ({ ...prev, loans: newLoans }))} />
          <BudgetExpenses value={expenses} onChangeText={(newExpenses: number) => setDayBudget(prev => ({ ...prev, expenses: newExpenses }))} />
          <BudgetPayroll value={payroll} onChangeText={(newPayroll: number) => setDayBudget(prev => ({ ...prev, payroll: newPayroll }))} />
          <PrimaryButton text='Actualizar' onPress={onSubmit} disabled={loading} />
        </>
      }
    </Layout>
  );
};
