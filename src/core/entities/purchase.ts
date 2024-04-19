import { Product } from './product';
import { User } from './user';

export interface Purchase {
  _id?:         string;
  price:        number;
  product:      Product;
  purchaseDate: Date;
  quantity:     number;
  user:         User;
}
