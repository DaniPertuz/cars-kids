import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { PurchaseAPIResponse } from '../../../infrastructure/interfaces';
import { Purchase } from '../../entities';

export const updatePurchaseUseCase = async (purchase: Purchase): Promise<PurchaseAPIResponse> => {
  try {
    const { data } = await carskidsApi.put<PurchaseAPIResponse>(`purchases/${purchase._id}`, purchase);
    return { purchase: data.purchase };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al actualizar compra');
  }
};
