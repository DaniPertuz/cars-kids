import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { RentalAPIResponse, RentalResponse } from '../../../infrastructure/interfaces';

export const getAllRentalsUseCase = async (url: string): Promise<RentalAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<RentalResponse>(url);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al obtener alquileres');
  }
};
