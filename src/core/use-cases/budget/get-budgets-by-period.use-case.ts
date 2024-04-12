import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { BudgetAPIResponse, BudgetResponse } from '../../../infrastructure/interfaces';

export const getBudgetsByPeriodUseCase = async (url: string, startingDate: string, endingDate: string): Promise<BudgetAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<BudgetResponse>(`${url}/${startingDate}/${endingDate}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al obtener presupuestos por periodo' };
  }
};
