import { IPayment } from '../../infrastructure/interfaces';
import { User } from './user';
import { Vehicle } from './vehicle';

export interface Rental {
  _id?:    string;
  client:  string;
  time:    number;
  date:    Date;
  vehicle: Vehicle;
  payment: IPayment;
  amount:  number;
  user:    User;
}
