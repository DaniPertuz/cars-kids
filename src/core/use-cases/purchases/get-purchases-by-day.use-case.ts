import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { PurchaseAPIResponse, PurchaseResponse } from '../../../infrastructure/interfaces';

export const getPurchasesByDayUseCase = async (day: string, month: string, year: string): Promise<PurchaseAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<PurchaseResponse>(`purchases/dates/day/${day}/${month}/${year}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al obtener compras por día');
  }
};
