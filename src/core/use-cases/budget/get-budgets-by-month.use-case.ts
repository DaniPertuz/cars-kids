import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { BudgetAPIResponse, BudgetResponse } from '../../../infrastructure/interfaces';

export const getBudgetsByMonthUseCase = async (url: string, date: string): Promise<BudgetAPIResponse> => {
  try {
    const split = date.split('-');
    const { data } = await carskidsApi.get<BudgetResponse>(`${url}/${split[1]}/${split[2]}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al obtener presupuestos por mes' };
  }
};
