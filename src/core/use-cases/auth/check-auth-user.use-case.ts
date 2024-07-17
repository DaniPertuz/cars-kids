import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { AuthResponse } from '../../../infrastructure/interfaces';
import { returnUserToken } from './user-token';
import { User } from '../../entities';

export const checkAuthUserUseCase = async (user: User | null) => {
  try {
    const { data } = await carskidsApi.post<AuthResponse>('auth/check', user ? { user } : {});

    return returnUserToken(data);
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};
