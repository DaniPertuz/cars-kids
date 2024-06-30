import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { Rental } from '../../entities';
import { RentalAPIResponse } from '../../../infrastructure/interfaces';

export const createRentalUseCase = async (rental: Rental): Promise<RentalAPIResponse> => {
  try {
    const { desk, user, vehicle } = rental;
    const rentalObj = {
      ...rental,
      desk: desk._id,
      user: user._id,
      vehicle: vehicle._id
    };

    const { data } = await carskidsApi.post<RentalAPIResponse>('rentals', rentalObj);
    return { rental: data as Rental };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al crear alquiler' };
  }
};
