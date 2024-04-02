import { create } from 'zustand';
import { IVehicle } from '../../../infrastructure/interfaces';
import { addVehicle, getVehicles, deleteVehicle, updateVehicle } from '../../../actions/vehicles';

export interface VehicleState {
  reload: boolean;
  getVehicles: (url: string) => Promise<any>;
  addVehicle: (vehicle: IVehicle) => Promise<any>;
  updateVehicle: (vehicleNickname: string, vehicle: IVehicle) => Promise<any>;
  deleteVehicle: (vehicle: IVehicle) => Promise<any>;
  setReload: (value: boolean) => void;
}

export const useVehicleStore = create<VehicleState>()((set, get) => ({
  reload: false,
  getVehicles: async (url: string) => {
    const resp = await getVehicles(url);
    return resp;
  },
  addVehicle: async (vehicle: IVehicle) => {
    const resp = await addVehicle(vehicle);
    return resp;
  },
  updateVehicle: async (vehicleNickname: string, vehicle: IVehicle) => {
    const resp = await updateVehicle(vehicleNickname, vehicle);
    return resp;
  },
  deleteVehicle: async (vehicle: IVehicle) => {
    const resp = await deleteVehicle(vehicle);

    return resp;  },
  setReload: (value: boolean) => set({ reload: value })
}));
