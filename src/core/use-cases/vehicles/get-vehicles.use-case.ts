import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { VehicleAPIResponse, VehiclesResponse } from '../../../infrastructure/interfaces';

export const getVehiclesUseCase = async (url: string): Promise<VehicleAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<VehiclesResponse>(url);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al obtener vehículos');
  }
};
