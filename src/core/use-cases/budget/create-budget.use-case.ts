import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { BudgetAPIResponse } from '../../../infrastructure/interfaces';
import { Budget } from '../../entities';

export const createBudgetUseCase = async (budget: Budget): Promise<BudgetAPIResponse> => {
  try {
    const { data } = await carskidsApi.post<BudgetAPIResponse>('budgets', budget);
    return { budget: data.budget };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al crear presupuesto' };
  }
};
