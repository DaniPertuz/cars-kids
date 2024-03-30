import { create } from 'zustand';
import { IVehicle } from '../../../infrastructure/interfaces';
import { addVehicle, getVehicles, deleteVehicle } from '../../../actions/vehicles';

export interface VehicleState {
  vehicles: IVehicle[];
  getVehicles: (url: string) => Promise<any>;
  addVehicle: (vehicle: IVehicle) => Promise<any>;
  deleteVehicle: (vehicle: IVehicle) => Promise<any>;
}

export const useVehicleStore = create<VehicleState>()((set, get) => ({
  vehicles: [],
  getVehicles: async (url: string) => {
    const resp = await getVehicles(url);
    set({ vehicles: resp });
    return resp;
  },
  addVehicle: async (vehicle: IVehicle) => {
    set(state => ({
      vehicles: state.vehicles.map(v => v.nickname === vehicle.nickname ? vehicle : v)
    }));

    const resp = await addVehicle(vehicle);
    return resp;
  },
  deleteVehicle: async (vehicle: IVehicle) => {
    const resp = await deleteVehicle(vehicle);
    return resp;
  },
}));
