import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { UserAPIResponse } from '../../../infrastructure/interfaces';
import { User } from '../../entities';

export const updateUserImageUseCase = async (email: string, img: string): Promise<UserAPIResponse> => {
  try {
    const { data } = await carskidsApi.put<User>('users/image', { email, img });

    return { user: data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al actualizar imagen de usuario' };
  }
};
