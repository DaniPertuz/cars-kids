import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { UserAPIResponse } from '../../../infrastructure/interfaces';
import { User } from '../../entities';

export const updateUserNameUseCase = async (email: string, name: string): Promise<UserAPIResponse> => {
  try {
    const { data } = await carskidsApi.put<User>('users/name', { email, name });
    return { user: data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al actualizar nombre de usuario' };
  }
};
