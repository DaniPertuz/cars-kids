import { useState, useEffect } from 'react';
import * as BudgetUseCases from '../../core/use-cases/budget';
import * as PurchaseUseCases from '../../core/use-cases/purchases';
import * as RentalUseCases from '../../core/use-cases/rentals';
import * as UsersUseCases from '../../core/use-cases/users';
import { Pagination } from '../../infrastructure/interfaces';

interface Props {
  category: string;
  rangeType: string;
  range: { day?: string; month?: string; year?: string; startDate?: string; endDate?: string; };
}

export const useEntityData = ({ category, rangeType, range }: Props) => {
  const [display, setDisplay] = useState(false);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [entityData, setEntityData] = useState<any | undefined>(null);
  const [paginationState, setPaginationState] = useState<Pagination>({ page: 1, limit: 10 });
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      if (!loadingPagination) setDisplay(true);
      let data: any;
      switch (category) {
        case 'Alquileres':
          switch (rangeType) {
            case 'Día':
              data = await RentalUseCases.getRentalsByDayUseCase('rentals/dates/day', range.day!, range.month!, range.year!, paginationState);
              break;
            case 'Mes':
              data = await RentalUseCases.getRentalsByMonthUseCase(`rentals/dates/month`, range.month!, range.year!, paginationState);
              break;
            case 'Personalizado':
              data = await RentalUseCases.getRentalsByPeriodUseCase(`rentals/dates/period`, range.startDate!, range.endDate!, paginationState);
              break;
          }
          break;
        case 'Compras':
          switch (rangeType) {
            case 'Día':
              data = await PurchaseUseCases.getPurchasesByDayUseCase('purchases/dates/day', range.day!, range.month!, range.year!, paginationState);
              break;
            case 'Mes':
              data = await PurchaseUseCases.getPurchasesByMonthUseCase(`purchases/dates/month`, range.month!, range.year!, paginationState);
              break;
            case 'Personalizado':
              data = await PurchaseUseCases.getPurchasesByPeriodUseCase(`purchases/dates/period`, range.startDate!, range.endDate!, paginationState);
              break;
          }
          break;
        case 'Presupuestos':
          switch (rangeType) {
            case 'Día':
              data = await BudgetUseCases.getBudgetsByDayUseCase('budgets/dates/day', range.day!, range.month!, range.year!, paginationState);
              break;
            case 'Mes':
              data = await BudgetUseCases.getBudgetsByMonthUseCase(`budgets/dates/month`, range.month!, range.year!, paginationState);
              break;
            case 'Personalizado':
              data = await BudgetUseCases.getBudgetsByPeriodUseCase(`budgets/dates/period`, range.startDate!, range.endDate!, paginationState);
              break;
          }
          break;
        case 'Usuarios':
          data = await UsersUseCases.getUsersUseCase(`users?page=${paginationState.page}&limit=${paginationState.limit}`);
          break;
      }
      setEntityData(data);
      setDisplay(false);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      if (!loadingPagination) setDisplay(false);
    }
  };

  const fetchNextPage = async () => {
    if (entityData?.response.next) {
      setLoadingPagination(true);
      setPaginationState(prevState => ({ ...prevState, page: prevState.page + 1 }));
    }
  };

  const fetchPrevPage = async () => {
    if (entityData?.response.prev) {
      setLoadingPagination(true);
      setPaginationState(prevState => ({ ...prevState, page: prevState.page - 1 }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [paginationState, entityData]);

  return { entityData, display, error, fetchData, fetchNextPage, fetchPrevPage, setEntityData };
};
