import { useEffect, useState } from 'react';
import { Layout, TranslationWidth } from '@ui-kitten/components';

import { EditSelectedDate } from '../EditSelectedDate';
import { Footnote, SelectComponent } from '../../ui';
import { i18n } from '../../../../utils';
import { adaptApiResponse } from '../../../../config/adapters/api-response-adapter';
import { Budget, Purchase, Rental } from '../../../../core/entities';
import * as BudgetsUseCases from '../../../../core/use-cases/budget';
import * as PurchasesUseCases from '../../../../core/use-cases/purchases';
import * as RentalsUseCases from '../../../../core/use-cases/rentals';

import { styles } from './styles';

interface Props {
  handleMonthYear: (type: "month" | "year", value: string) => void;
}

export const MonthPicker = ({ handleMonthYear }: Props) => {
  const [monthDate, setMonthDate] = useState('');
  const [yearDate, setYearDate] = useState('');
  const [years, setYears] = useState<number[]>([]);

  const fetchYears = async () => {
    try {
      const budgetsPromise = BudgetsUseCases.getAllBudgetsUseCase('/budgets');
      const purchasesPromise = PurchasesUseCases.getAllPurchasesUseCase('/purchases');
      const rentalsPromise = RentalsUseCases.getAllRentalsUseCase('/rentals');

      const [budgetsResponse, purchasesResponse, rentalsResponse] = await Promise.all([budgetsPromise, purchasesPromise, rentalsPromise]);

      const budgetsData = adaptApiResponse(budgetsResponse.response);
      const purchasesData = adaptApiResponse(purchasesResponse.response);
      const rentalsData = adaptApiResponse(rentalsResponse.response);

      const combinedData = adaptEntityApiResponse((budgetsData.data as Budget[]), (purchasesData.data as Purchase[]), (rentalsData.data as Rental[]));

      const years = combinedData.map(item => item.getFullYear());
      const uniqueYears = Array.from(new Set(years)).sort((a, b) => a - b);

      setYears(uniqueYears ?? [new Date().getFullYear()]);
    } catch (err: any) {
      setYears([new Date().getFullYear()]);
    }
  };

  const adaptEntityApiResponse = (budgets: Budget[], purchases: Purchase[], rentals: Rental[]) => {
    return [
      ...budgets.map(b => new Date(b.date)),
      ...purchases.map(p => new Date(p.purchaseDate)),
      ...rentals.map(r => new Date(r.date))
    ];
  };

  const onMonthChange = (value: string) => {
    handleMonthYear('month', value);
    setMonthDate(value);
  };

  const onYearChange = (value: string) => {
    handleMonthYear('year', value);
    setYearDate(value);
  };

  const reset = () => {
    setMonthDate('');
    setYearDate('');
  };

  useEffect(() => {
    fetchYears();
  }, []);

  return (
    <Layout style={styles.container}>
      {monthDate !== '' && yearDate !== ''
        ?
        <Layout style={styles.resetDataContainer}>
          <Footnote text={'Mes'} />
          <EditSelectedDate text={`${monthDate} de ${yearDate}`} onPress={reset} />
        </Layout>
        :
        <Layout style={styles.selectsContainer}>
          <SelectComponent placeholder='Mes' options={i18n.monthNames[TranslationWidth.LONG]!} initialValue='' handleSelection={onMonthChange} />
          <SelectComponent placeholder='Año' options={years.map(String)} initialValue='' handleSelection={onYearChange} />
        </Layout>
      }
    </Layout>
  );
};
