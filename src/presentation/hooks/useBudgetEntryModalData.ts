import { useState } from 'react';
import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
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
  };

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

    const resp = (JSON.stringify(budget) === JSON.stringify(init)) ? await BudgetUseCases.updateBudgetUseCase(budgetState) : await BudgetUseCases.createBudgetUseCase(budgetState);

    if (resp.error) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(resp.error);
      return;
    }

    setLoading(false);
    SnackbarAdapter.showSnackbar('Presupuesto actualizado exitosamente');
    setVisible(false);
    setBudgetState(init);
  };

  return {
    budgetState,
    loading,
    visible,
    handleFieldChange,
    onSubmit
  };
};
