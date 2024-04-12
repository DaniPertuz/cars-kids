import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { ProductAPIResponse } from '../../../infrastructure/interfaces';
import { Product } from '../../entities';

export const deleteProductUseCase = async (product: Product): Promise<ProductAPIResponse> => {
  try {
    const { data } = await carskidsApi.delete<ProductAPIResponse>(`products/${product.name}`);
    return { product: data.product };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al eliminar producto');
  }
};
