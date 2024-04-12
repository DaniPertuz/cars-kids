import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { ProductAPIResponse, ProductResponse } from '../../../infrastructure/interfaces';

export const getProductsUseCase = async (url: string): Promise<ProductAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<ProductResponse>(url);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al obtener productos');
  }
};
