import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { RentalAPIResponse, RentalResponse } from '../../../infrastructure/interfaces';

export const getRentalsByDayUseCase = async (day: string, month: string, year: string): Promise<RentalAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<RentalResponse>(`rentals/dates/day/${day}/${month}/${year}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al obtener alquileres por día');
  }
};
