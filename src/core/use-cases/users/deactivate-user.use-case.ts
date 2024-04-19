import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { UserAPIResponse } from '../../../infrastructure/interfaces';

export const deactivateUserUseCase = async (email: string): Promise<UserAPIResponse> => {
  try {
    const { data } = await carskidsApi.delete<UserAPIResponse>('users', { data: { email } });
    return { status: data.status };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data.error };
    }
    return { error: 'Error desconocido al desactivar usuario' };
  }
};
