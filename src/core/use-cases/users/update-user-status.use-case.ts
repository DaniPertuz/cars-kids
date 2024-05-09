import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { IStatus, UserAPIResponse } from '../../../infrastructure/interfaces';
import { User } from '../../entities';

export const updateUserStatusUseCase = async (email: string, status: IStatus): Promise<UserAPIResponse> => {
  try {
    const { data } = await carskidsApi.put<User>('users/status', { email, status });
    return { user: data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al actualizar estado de usuario' };
  }
};
