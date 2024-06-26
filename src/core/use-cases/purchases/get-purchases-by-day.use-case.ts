import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { Pagination, PurchaseAPIResponse, PurchaseResponse } from '../../../infrastructure/interfaces';

export const getPurchasesByDayUseCase = async (url: string, day: string, month: string, year: string, pagination: Pagination): Promise<PurchaseAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<PurchaseResponse>(`${url}/${day}/${month}/${year}?page=${pagination.page}&limit=${pagination.limit}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al obtener compras por día');
  }
};
