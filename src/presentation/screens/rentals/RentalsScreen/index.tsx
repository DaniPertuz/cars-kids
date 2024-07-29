import { useEffect, useState } from 'react';
import KeepAwake from 'react-native-keep-awake';
import { adaptApiResponse } from '../../../../config/adapters/api-response-adapter';
import { Budget } from '../../../../core/entities';
import * as BudgetUseCases from '../../../../core/use-cases/budget';
import { padTo2Digits } from '../../../../utils';
import { CustomDivider, MainLayout, MainScreenHeader } from '../../../components/ui';
import { TransactionEntryModal } from '../../../components/transactions/TransactionEntryModal';
import { TransactionsListComponent } from '../../../components/transactions/TransactionListComponent';
import { BudgetEntryModal } from '../../../components/budget/BudgetEntryModal';

export const RentalsScreen = () => {
  const [budget, setBudget] = useState<Budget>();
  const [visibility, setVisibility] = useState(false);

  const checkBudget = async () => {
    const curr = new Date();
    const day = padTo2Digits(curr.getDate());
    const month = padTo2Digits(curr.getMonth() + 1);
    const year = curr.getFullYear().toString();
    const { response } = await BudgetUseCases.getBudgetsByDayUseCase('budgets/dates/day', day, month, year, { page: 1, limit: 1 });
    setBudget(adaptApiResponse(response).data[0] as Budget);

    if (!budget) {
      setVisibility(true);
    }
  };

  useEffect(() => {
    checkBudget();
  }, []);

  useEffect(() => {
    KeepAwake.activate();

    return () => {
      KeepAwake.deactivate();
    };
  }, []);

  return (
    <>
      <MainLayout>
        <MainScreenHeader title='Alquileres' transaction={'Rental'} ModalComponent={TransactionEntryModal} />
        <CustomDivider />
        <TransactionsListComponent entity='Rental' />
      </MainLayout>
      {!budget && <BudgetEntryModal budget={{ base: 0, expenses: 0, loans: 0, payroll: 0, date: new Date() }} visible={visibility} setVisible={setVisibility} />}
    </>
  );
};
