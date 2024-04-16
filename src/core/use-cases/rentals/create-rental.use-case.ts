import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { Rental } from '../../entities';
import { RentalAPIResponse } from '../../../infrastructure/interfaces';

export const createRentalUseCase = async (rental: Rental): Promise<RentalAPIResponse> => {
  try {
    const { data } = await carskidsApi.post<RentalAPIResponse>('rentals', rental);
    return { rental: data.rental };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al crear alquiler' };
  }
};
