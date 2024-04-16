import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { PurchaseAPIResponse } from '../../../infrastructure/interfaces';
import { Purchase } from '../../entities';

export const deletePurchaseUseCase = async (purchase: Purchase): Promise<PurchaseAPIResponse> => {
  try {
    const { data } = await carskidsApi.delete<PurchaseAPIResponse>(`purchases/${purchase._id}`);
    return { purchase: data.purchase };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al eliminar presupuesto' };
  }
};
