import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { BudgetAPIResponse } from '../../../infrastructure/interfaces';
import { Budget } from '../../entities';

export const deleteBudgetUseCase = async (budget: Budget): Promise<BudgetAPIResponse> => {
  try {
    const { data } = await carskidsApi.delete<BudgetAPIResponse>(`budgets/${budget._id}`);
    return { status: data.status };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al eliminar presupuesto' };
  }
};
