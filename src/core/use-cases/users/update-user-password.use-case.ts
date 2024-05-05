import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { UserAPIResponse } from '../../../infrastructure/interfaces';

export const updateUserPasswordUseCase = async (email: string, password: string): Promise<UserAPIResponse> => {
  try {
    const { data } = await carskidsApi.put('users/password', { email, password });

    return { user: data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al actualizar contraseña de usuario' };
  }
};
