import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { BudgetAPIResponse, BudgetResponse, Pagination } from '../../../infrastructure/interfaces';

export const getBudgetsByMonthUseCase = async (url: string, month: string, year: string, pagination: Pagination): Promise<BudgetAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<BudgetResponse>(`${url}/${month}/${year}?page=${pagination.page}&limit=${pagination.limit}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al obtener presupuestos por mes' };
  }
};
