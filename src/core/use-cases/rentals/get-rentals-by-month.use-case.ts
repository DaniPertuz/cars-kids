import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { Pagination, RentalAPIResponse, RentalResponse } from '../../../infrastructure/interfaces';

export const getRentalsByMonthUseCase = async (url: string, month: string, year: string, pagination: Pagination): Promise<RentalAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<RentalResponse>(`${url}/${month}/${year}?page=${pagination.page}&limit=${pagination.limit}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al obtener alquileres por mes' };
  }
};
