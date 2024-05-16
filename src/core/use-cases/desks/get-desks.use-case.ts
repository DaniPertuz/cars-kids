import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { DeskAPIResponse, DeskResponse } from '../../../infrastructure/interfaces';

export const getDesksUseCase = async (url: string): Promise<DeskAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<DeskResponse>(url);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al obtener puestos de trabajo');
  }
};
