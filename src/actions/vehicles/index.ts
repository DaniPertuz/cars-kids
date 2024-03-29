import { AxiosError } from 'axios';
import carskidsApi from '../../config/api/carskidsApi';
import { IVehicle, VehiclesResponse } from '../../infrastructure/interfaces';

export const getVehicles = async (url: string) => {
  try {
    const { data } = await carskidsApi.get<VehiclesResponse>(url);

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const addVehicle = async (vehicle: IVehicle) => {
  try {
    const { data } = await carskidsApi.post<VehiclesResponse>('/vehicles', { vehicle });

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
}
