import { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { Budget } from '../../core/entities';
import * as BudgetUseCases from '../../core/use-cases/budget';

interface Props {
  budget: Budget;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useBudgetEntryModalData = ({ budget, visible, setVisible }: Props) => {
  const init: Budget = {
    base: 0,
    loans: 0,
    expenses: 0,
    payroll: 0,
    date: new Date()
  }

  const [loading, setLoading] = useState(false);
  const [budgetState, setBudgetState] = useState<Budget>({
    _id: budget._id || '',
    base: budget.base || 0,
    loans: budget.loans || 0,
    expenses: budget.expenses || 0,
    payroll: budget.payroll || 0,
    date: budget.date || new Date()
  });

  const handleFieldChange = (fieldName: keyof Budget, value: string | number) => {
    setBudgetState(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const onSubmit = async () => {
    setLoading(true);

    const resp = await BudgetUseCases.updateBudgetUseCase(budgetState);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    setLoading(false);
    Snackbar.show({ text: 'Presupuesto actualizado exitosamente', duration: Snackbar.LENGTH_SHORT });
    setVisible(false);
    setBudgetState(init);
  };

  return {
    budgetState,
    loading,
    visible,
    handleFieldChange,
    onSubmit
  }
}
