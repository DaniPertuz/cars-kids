import { AxiosError } from 'axios';
import carskidsApi from '../../config/api/carskidsApi';
import { IUser } from '../../infrastructure/interfaces';

export const updateUserName = async (email: string, name: string) => {
  try {
    const { data } = await carskidsApi.put<IUser>('users/name', { email, name });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const updateUserEmail = async (email: string, newEmail: string) => {
  try {
    const { data } = await carskidsApi.put<IUser>('users/email', { email, newEmail });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const updateUserPassword = async (email: string, password: string) => {
  try {
    const { data } = await carskidsApi.put('/users/password', { email, password })

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
}
