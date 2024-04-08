import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Snackbar from 'react-native-snackbar';

import { getBudgetsByDay, updateBudget } from '../../actions/budgets';
import { IBudget } from '../../infrastructure/interfaces';
import { RootStackParams } from '../navigation/MainNavigator';

export const useBudgetData = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState({
    day: '',
    month: '',
    year: ''
  });
  const [dayBudget, setDayBudget] = useState<IBudget>({
    _id: "",
    base: -1,
    expenses: -1,
    loans: -1,
    payroll: -1,
    date: ""
  });

  const { base, loans, expenses, payroll } = dayBudget;

  const setBudgets = async () => {
    const curr = new Date();
    const day = curr.getDate().toString().padStart(2, '0');
    const month = (curr.getMonth() + 1).toString().padStart(2, '0');
    const year = curr.getFullYear().toString();
    const { budgets } = await getBudgetsByDay(day, month, year);
    setCurrentDate({ day, month, year });
    setDayBudget(budgets[0]);
  };

  const onSubmit = async () => {
    setLoading(true);

    const { day, month, year } = currentDate;
    const dateToString = `${year}-${month}-${day}`;

    const resp = await updateBudget({
      _id: dayBudget._id,
      base: dayBudget.base,
      loans: dayBudget.loans,
      expenses: dayBudget.expenses,
      payroll: dayBudget.payroll,
      date: dateToString
    });

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    setLoading(false);
    Snackbar.show({ text: 'Presupuesto actualizado', duration: Snackbar.LENGTH_SHORT });
    navigation.goBack();
  };

  useEffect(() => {
    setBudgets();
  }, []);

  return {
    loading,
    dayBudget,
    base,
    loans,
    expenses,
    payroll,
    onSubmit,
    setDayBudget
  };
};
