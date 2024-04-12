import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { AuthResponse } from '../../../infrastructure/interfaces';
import { returnUserToken } from './user-token';

export const authRegisterUseCase = async (name: string, email: string, password: string, role: string) => {
  try {
    const { data } = await carskidsApi.post<AuthResponse>('auth/register', {
      name,
      email,
      password,
      role
    });

    return returnUserToken(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};
