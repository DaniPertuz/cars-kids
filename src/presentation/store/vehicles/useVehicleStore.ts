import { create } from 'zustand';
import { IVehicle, VehicleAPIResponse, VehiclesResponse } from '../../../infrastructure/interfaces';
import { addVehicle, getVehicles, deleteVehicle, updateVehicle } from '../../../actions/vehicles';

export interface VehicleState {
  reload: boolean;
  getVehicles: (url: string) => Promise<VehicleAPIResponse>;
  addVehicle: (vehicle: IVehicle) => Promise<VehicleAPIResponse>;
  updateVehicle: (vehicleNickname: string, vehicle: IVehicle) => Promise<VehicleAPIResponse>;
  deleteVehicle: (vehicle: IVehicle) => Promise<VehicleAPIResponse>;
  setReload: (value: boolean) => void;
}

export const useVehicleStore = create<VehicleState>()((set, get) => ({
  reload: false,
  getVehicles: async (url: string) => await getVehicles(url),
  addVehicle: async (vehicle: IVehicle) => await addVehicle(vehicle),
  updateVehicle: async (vehicleNickname: string, vehicle: IVehicle) => await updateVehicle(vehicleNickname, vehicle),
  deleteVehicle: async (vehicle: IVehicle) => await deleteVehicle(vehicle),
  setReload: (value: boolean) => set({ reload: value })
}));
