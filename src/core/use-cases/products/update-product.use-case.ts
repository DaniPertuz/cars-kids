import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { ProductAPIResponse } from '../../../infrastructure/interfaces';
import { Product } from '../../entities';

export const updateProductUseCase = async (productName: string, product: Product): Promise<ProductAPIResponse> => {
  try {
    const { data } = await carskidsApi.put<ProductAPIResponse>(`products/${productName}`, product);
    return { product: data.product };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al actualizar producto');
  }
};
