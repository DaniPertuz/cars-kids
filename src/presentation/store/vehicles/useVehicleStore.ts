import { create } from 'zustand';
import { IVehicle } from '../../../infrastructure/interfaces';
import { getVehicles } from '../../../actions/vehicles';

export interface VehicleState {
  vehicles: IVehicle[];
  getVehicles: (url: string) => Promise<any>;
}

export const useVehicleStore = create<VehicleState>()((set, get) => ({
  vehicles: [],
  getVehicles: async (url: string) => {
    const resp = await getVehicles(url);
    set({ vehicles: resp });
    return resp;
  }
}));
