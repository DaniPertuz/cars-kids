import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Snackbar from 'react-native-snackbar';

import { RootStackParams } from '../navigation/MainNavigator';
import { Budget } from '../../core/entities';
import * as BudgetUseCases from '../../core/use-cases/budget';

export const useBudgetData = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState({
    day: '',
    month: '',
    year: ''
  });
  const [dayBudget, setDayBudget] = useState<Budget>({
    _id: "",
    base: -1,
    expenses: -1,
    loans: -1,
    payroll: -1,
    date: ""
  });

  const setBudgetsByDay = async () => {
    const curr = new Date();
    const day = curr.getDate().toString().padStart(2, '0');
    const month = (curr.getMonth() + 1).toString().padStart(2, '0');
    const year = curr.getFullYear().toString();
    const { response } = await BudgetUseCases.getBudgetsByDayUseCase(day, month, year);
    setCurrentDate({ day, month, year });
    setDayBudget(response?.budgets[0] ? response?.budgets[0] : {
      base: 0,
      expenses: 0,
      loans: 0,
      payroll: 0,
      date: `${year}-${month}-${day}`
    });
  };

  const onSubmit = async () => {
    setLoading(true);

    const { day, month, year } = currentDate;
    const dateToString = `${year}-${month}-${day}`;

    const resp = await BudgetUseCases.updateBudgetUseCase({
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
    setBudgetsByDay();
  }, []);

  return {
    loading,
    dayBudget,
    onSubmit,
    setDayBudget
  };
};
