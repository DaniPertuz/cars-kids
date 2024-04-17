import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { Pagination, RentalAPIResponse, RentalResponse } from '../../../infrastructure/interfaces';

export const getRentalsByDayUseCase = async (url: string, day: string, month: string, year: string, pagination: Pagination): Promise<RentalAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<RentalResponse>(`${url}/${day}/${month}/${year}?page=${pagination.page}&limit=${pagination.limit}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al obtener alquileres por día');
  }
};
