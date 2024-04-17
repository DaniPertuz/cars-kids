import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { BudgetAPIResponse, BudgetResponse, Pagination } from '../../../infrastructure/interfaces';

export const getBudgetsByDayUseCase = async (url: string, day: string, month: string, year: string, pagination: Pagination): Promise<BudgetAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<BudgetResponse>(`${url}/${day}/${month}/${year}?page=${pagination.page}&limit=${pagination.limit}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al obtener presupuesto por día');
  }
};
