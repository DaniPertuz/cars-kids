import { create } from 'zustand';
import { IVehicle } from '../../../infrastructure/interfaces';
import { getVehicles } from '../../../actions/vehicles';

export interface VehicleState {
  vehicles: IVehicle[];
  getVehicles: () => Promise<any>;
}

export const useVehicleStore = create<VehicleState>()((set, get) => ({
  vehicles: [],
  getVehicles: async () => {
    const resp = await getVehicles();
    return resp;
  }
}));
