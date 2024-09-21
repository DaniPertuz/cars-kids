import { IStatus, VehicleRentalTime } from '../../infrastructure/interfaces';

export interface Vehicle {
  _id?:        string;
  nickname:    string;
  category:    string;
  color:       string;
  img?:        string;
  size:        string;
  rentalInfo?: VehicleRentalTime[];
  status?:     IStatus;
}
