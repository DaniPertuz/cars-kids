import { create } from 'zustand';
import { IVehicle } from '../../../infrastructure/interfaces';
import { addVehicle, getVehicles, deleteVehicle, updateVehicle } from '../../../actions/vehicles';

export interface VehicleState {
  vehicles: IVehicle[];
  reload: boolean;
  getVehicles: (url: string) => Promise<any>;
  addVehicle: (vehicle: IVehicle) => Promise<any>;
  updateVehicle: (vehicleNickname: string, vehicle: IVehicle) => Promise<any>;
  deleteVehicle: (vehicle: IVehicle) => Promise<any>;
  setReload: (value: boolean) => void;
}

export const useVehicleStore = create<VehicleState>()((set, get) => ({
  vehicles: [],
  reload: false,
  getVehicles: async (url: string) => {
    const resp = await getVehicles(url);
    set({ vehicles: resp });
    return resp;
  },
  addVehicle: async (vehicle: IVehicle) => {
    const resp = await addVehicle(vehicle);
    set((state) => ({ vehicles: [...state.vehicles, vehicle] }));
    return resp;
  },
  updateVehicle: async (vehicleNickname: string, vehicle: IVehicle) => {
    const resp = await updateVehicle(vehicleNickname, vehicle);
    set((state) => ({
      vehicles: state.vehicles.map((v) => (v.nickname === vehicleNickname ? vehicle : v))
    }));
    return resp;
  },
  deleteVehicle: async (vehicle: IVehicle) => {
    const resp = await deleteVehicle(vehicle);
    set((state) => ({
      vehicles: state.vehicles.map((v) => (v.nickname === vehicle.nickname ? resp : v))
    }));
    return resp;
  },
  setReload: (value: boolean) => set({ reload: value })
}));
