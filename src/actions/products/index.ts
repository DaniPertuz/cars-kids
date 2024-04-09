import { AxiosError } from 'axios';
import carskidsApi from '../../config/api/carskidsApi';
import { IProduct, ProductAPIResponse, ProductResponse } from '../../infrastructure/interfaces';

export const getProducts = async (): Promise<ProductAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<ProductResponse>('products');
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const addProduct = async (product: IProduct): Promise<ProductAPIResponse> => {
  try {
    const { data } = await carskidsApi.post<ProductAPIResponse>('products', product);
    return { product: data.product };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const updateProduct = async (productName: string, product: IProduct): Promise<ProductAPIResponse> => {
  try {
    const { data } = await carskidsApi.put<ProductAPIResponse>(`products/${productName}`, product);
    return { product: data.product };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const deleteProduct = async (product: IProduct): Promise<ProductAPIResponse> => {
  try {
    const { data } = await carskidsApi.delete<ProductAPIResponse>(`products/${product.name}`);
    return { product: data.product };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};
