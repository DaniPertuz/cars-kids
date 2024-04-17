import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { UserAPIResponse, UsersResponse } from '../../../infrastructure/interfaces';

export const getUsersUseCase = async (url: string): Promise<UserAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<UsersResponse>(url);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al obtener usuarios');
  }
};
