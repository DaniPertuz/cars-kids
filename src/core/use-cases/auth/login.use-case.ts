import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { AuthResponse } from '../../../infrastructure/interfaces';
import { returnUserToken } from './user-token';

export const authLoginUseCase = async (email: string, password: string) => {
  try {
    const { data } = await carskidsApi.post<AuthResponse>('auth/login', {
      email,
      password
    });

    return returnUserToken(data);
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};
