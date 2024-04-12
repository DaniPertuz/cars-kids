import { AxiosError } from 'axios';
import carskidsApi from '../../../config/api/carskidsApi';
import { VehicleAPIResponse } from '../../../infrastructure/interfaces';
import { Vehicle } from '../../entities';

export const deleteVehicleUseCase = async (vehicle: Vehicle): Promise<VehicleAPIResponse> => {
  try {
    const { data } = await carskidsApi.delete<VehicleAPIResponse>(`vehicles/${vehicle.nickname}`);
    return { status: data.status };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    throw new Error('Error desconocido al desactivar vehículo');
  }
};
