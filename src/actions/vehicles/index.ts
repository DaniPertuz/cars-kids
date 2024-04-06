import { AxiosError } from 'axios';
import carskidsApi from '../../config/api/carskidsApi';
import { IVehicle, VehicleAPIResponse } from '../../infrastructure/interfaces';

export const getVehicles = async (url: string) => {
  try {
    const { data } = await carskidsApi.get<VehicleAPIResponse>(url);
    return { response: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const addVehicle = async (vehicle: IVehicle) => {
  try {
    const { data } = await carskidsApi.post<VehicleAPIResponse>('vehicles', vehicle);
    return { vehicle: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const updateVehicle = async (vehicleNickname: string, vehicle: IVehicle) => {
  try {
    const { data } = await carskidsApi.put<VehicleAPIResponse>(`vehicles/${vehicleNickname}`, vehicle);
    return { vehicle: data };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};

export const deleteVehicle = async (vehicle: IVehicle) => {
  try {
    const { data } = await carskidsApi.delete<VehicleAPIResponse>(`vehicles/${vehicle.nickname}`);
    return data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};
