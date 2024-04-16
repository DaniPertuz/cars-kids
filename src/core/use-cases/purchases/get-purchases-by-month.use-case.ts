import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { PurchaseAPIResponse, PurchaseResponse } from '../../../infrastructure/interfaces';

export const getPurchasesByMonthUseCase = async (url: string, month: string, year: string): Promise<PurchaseAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<PurchaseResponse>(`${url}/${month}/${year}`);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al obtener compras por mes' };
  }
};
