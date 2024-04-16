import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { RentalAPIResponse, RentalResponse } from '../../../infrastructure/interfaces';

export const getRentalsByMonthUseCase = async (url: string, month: string, year: string): Promise<RentalAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<RentalResponse>(`${url}/${month}/${year}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al obtener alquileres por mes' };
  }
};
