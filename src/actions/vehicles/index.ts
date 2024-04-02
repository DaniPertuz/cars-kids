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
    const { data } = await carskidsApi.post<VehiclesResponse>('vehicles', vehicle);

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const updateVehicle = async (vehicleNickname: string, vehicle: IVehicle) => {
  try {
    const { data } = await carskidsApi.put<VehiclesResponse>(`vehicles/${vehicleNickname}`, vehicle);

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const deleteVehicle = async (vehicle: IVehicle) => {
  try {
    const { data } = await carskidsApi.delete<VehiclesResponse>(`vehicles/${vehicle.nickname}`);

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};
