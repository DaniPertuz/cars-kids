import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParams } from '../navigation/MainNavigator';
import { adaptApiResponse } from '../../config/adapters/api-response-adapter';
import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
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
    date: new Date()
  });

  const setBudgetsByDay = async () => {
    const curr = new Date();
    const day = curr.getDate().toString().padStart(2, '0');
    const month = (curr.getMonth() + 1).toString().padStart(2, '0');
    const year = curr.getFullYear().toString();
    const { response } = await BudgetUseCases.getBudgetsByDayUseCase('budgets/dates/day', day, month, year, { page: 1, limit: 1 });
    setCurrentDate({ day, month, year });
    const resp = adaptApiResponse(response);
    setDayBudget(resp.data[0] ? resp.data[0] as Budget : {
      base: 0,
      expenses: 0,
      loans: 0,
      payroll: 0,
      date: new Date(`${year}-${month}-${day}`)
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
      date: new Date(dateToString)
    });

    if (resp.error) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(resp.error);
      return;
    }

    setLoading(false);
    SnackbarAdapter.showSnackbar('Presupuesto actualizado');
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
