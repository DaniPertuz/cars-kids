import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { UserAPIResponse, UsersResponse } from '../../../infrastructure/interfaces';
import { useAuthStore } from '../../../presentation/store/auth/useAuthStore';

export const getUsersUseCase = async (url: string): Promise<UserAPIResponse> => {
  const { token } = useAuthStore.getState();
  try {
    const { data } = await carskidsApi.get<UsersResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al obtener usuarios');
  }
};
