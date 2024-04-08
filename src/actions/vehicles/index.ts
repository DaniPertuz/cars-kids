import { AxiosError } from 'axios';
import carskidsApi from '../../config/api/carskidsApi';
import { IVehicle, VehicleAPIResponse, VehiclesResponse } from '../../infrastructure/interfaces';

export const getVehicles = async (url: string): Promise<VehicleAPIResponse> => {
  try {
    const { data } = await carskidsApi.get<VehiclesResponse>(url);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const addVehicle = async (vehicle: IVehicle): Promise<VehicleAPIResponse> => {
  try {
    const { data } = await carskidsApi.post<VehicleAPIResponse>('vehicles', vehicle);
    return { vehicle: data.vehicle };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const updateVehicle = async (vehicleNickname: string, vehicle: IVehicle): Promise<VehicleAPIResponse> => {
  try {
    const { data } = await carskidsApi.put<VehicleAPIResponse>(`vehicles/${vehicleNickname}`, vehicle);
    return { vehicle: data.vehicle };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};

export const deleteVehicle = async (vehicle: IVehicle): Promise<VehicleAPIResponse> => {
  try {
    const { data } = await carskidsApi.delete<VehicleAPIResponse>(`vehicles/${vehicle.nickname}`);
    return { status: data.status };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return { error: 'Error desconocido al realizar la solicitud' };
  }
};
