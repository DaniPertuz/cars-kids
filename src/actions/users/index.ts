import { AxiosError } from 'axios';
import carskidsApi from '../../config/api/carskidsApi';
import { IUser, UserAPIResponse } from '../../infrastructure/interfaces';

export const updateUserName = async (email: string, name: string): Promise<UserAPIResponse> => {
  try {
    const { data } = await carskidsApi.put<IUser>('users/name', { email, name });
    return { user: data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const updateUserImage = async (email: string, img: string): Promise<UserAPIResponse> => {
  try {
    const { data } = await carskidsApi.put<IUser>('users/image', { email, img });

    return { user: data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const updateUserEmail = async (email: string, newEmail: string): Promise<UserAPIResponse> => {
  try {
    const { data } = await carskidsApi.put<IUser>('users/email', { email, newEmail });

    return { user: data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const updateUserPassword = async (email: string, password: string): Promise<UserAPIResponse> => {
  try {
    const { data } = await carskidsApi.put('/users/password', { email, password });

    return { user: data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};
