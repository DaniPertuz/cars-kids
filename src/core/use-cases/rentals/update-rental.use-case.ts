import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { RentalAPIResponse } from '../../../infrastructure/interfaces';
import { Rental } from '../../entities';

export const updatePurchaseUseCase = async (rental: Rental): Promise<RentalAPIResponse> => {
  try {
    const { data } = await carskidsApi.put<RentalAPIResponse>(`rentals/${rental._id}`, rental);
    return { rental: data.rental };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al actualizar alquiler');
  }
};
