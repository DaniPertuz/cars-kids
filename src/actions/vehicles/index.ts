import { AxiosError } from 'axios';
import carskidsApi from '../../config/api/carskidsApi';
import { VehiclesResponse } from '../../infrastructure/interfaces';

export const getVehicles = async () => {
  try {
    const { data } = await carskidsApi.get<VehiclesResponse>('vehicles');

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};
