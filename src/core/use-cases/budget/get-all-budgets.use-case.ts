import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { BudgetAPIResponse, BudgetResponse } from '../../../infrastructure/interfaces';

export const getAllBudgetsUseCase = async (url: string): Promise<BudgetAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<BudgetResponse>(url);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al obtener presupuestos');
  }
};
