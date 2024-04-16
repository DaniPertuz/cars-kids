import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { PurchaseAPIResponse, PurchaseResponse } from '../../../infrastructure/interfaces';

export const getAllPurchasesUseCase = async (url: string): Promise<PurchaseAPIResponse> => {
  try {
    const { data } = await carskidsApi.post<PurchaseResponse>(url);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al obtener compras' };
  }
};
