import { IPayment } from '../../infrastructure/interfaces';
import { Desk } from './desk';
import { Product } from './product';
import { User } from './user';

export interface Purchase {
  _id?:         string;
  price:        number;
  payment:      IPayment
  product:      Product;
  purchaseDate: Date;
  quantity:     number;
  desk:         Desk;
  user:         User;
}
