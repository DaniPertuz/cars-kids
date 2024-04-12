import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { VehicleAPIResponse } from '../../../infrastructure/interfaces';
import { Vehicle } from '../../entities';

export const addVehicleUseCase = async (vehicle: Vehicle): Promise<VehicleAPIResponse> => {
  try {
    const { data } = await carskidsApi.post<VehicleAPIResponse>('vehicles', vehicle);
    return { vehicle: data.vehicle };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al agregar vehículo');
  }
};
