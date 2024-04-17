import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { BudgetAPIResponse, BudgetResponse, Pagination } from '../../../infrastructure/interfaces';

export const getBudgetsByPeriodUseCase = async (url: string, startingDate: string, endingDate: string, pagination: Pagination): Promise<BudgetAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<BudgetResponse>(`${url}/${startingDate}/${endingDate}?page=${pagination.page}&limit=${pagination.limit}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al obtener presupuestos por periodo' };
  }
};
