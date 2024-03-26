import { AxiosError } from 'axios';
import carskidsApi from '../../config/api/carskidsApi';
import { AuthResponse } from '../../infrastructure/interfaces';

const returnUserToken = async (data: AuthResponse) => {
  const { user, token } = data;

  return {
    user,
    token
  };
};

export const authLogin = async (email: string, password: string) => {
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

export const authRegister = async (name: string, email: string, password: string) => {
  try {
    const { data } = await carskidsApi.post<AuthResponse>('auth/register', {
      name,
      email,
      password
    });

    return returnUserToken(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};
