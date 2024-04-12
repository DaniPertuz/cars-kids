import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { BudgetAPIResponse } from '../../../infrastructure/interfaces';
import { Budget } from '../../entities';

export const updateBudgetUseCase = async (budget: Budget): Promise<BudgetAPIResponse> => {
  try {
    const { data } = await carskidsApi.put<BudgetAPIResponse>(`budgets/${budget._id}`, budget);
    return { budget: data.budget };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al actualizar presupuesto');
  }
};
