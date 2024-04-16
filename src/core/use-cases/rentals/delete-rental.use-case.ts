import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { RentalAPIResponse } from '../../../infrastructure/interfaces';
import { Rental } from '../../entities';

export const deleteBudgetUseCase = async (rental: Rental): Promise<RentalAPIResponse> => {
  try {
    const { data } = await carskidsApi.delete<RentalAPIResponse>(`budgets/${rental._id}`);
    return { status: data.status };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al eliminar alquiler' };
  }
};
