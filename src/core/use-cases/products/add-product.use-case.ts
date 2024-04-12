import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { ProductAPIResponse } from '../../../infrastructure/interfaces';
import { Product } from '../../entities';

export const addProductUseCase = async (product: Product): Promise<ProductAPIResponse> => {
  try {
    const { data } = await carskidsApi.post<ProductAPIResponse>('products', product);
    return { product: data.product };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al agregar producto');
  }
};
