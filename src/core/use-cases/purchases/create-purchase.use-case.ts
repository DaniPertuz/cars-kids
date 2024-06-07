import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { IPayment, PurchaseAPIResponse } from '../../../infrastructure/interfaces';
import { Purchase } from '../../entities';

export const createPurchaseUseCase = async (purchase: Purchase): Promise<PurchaseAPIResponse> => {
  try {
    const { desk, payment, price, purchaseDate, quantity, user } = purchase;
    const purchaseObj = {
      product: purchase.product._id,
      quantity,
      price,
      payment: payment as IPayment,
      purchaseDate,
      user: user._id,
      desk: desk._id
    };

    const { data } = await carskidsApi.post<PurchaseAPIResponse>('purchases', purchaseObj);

    return { purchase: data as Purchase };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al crear compra' };
  }
};
