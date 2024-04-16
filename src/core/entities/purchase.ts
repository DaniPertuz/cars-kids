export interface Purchase {
  _id?:         string;
  price:        number;
  product:      string;
  purchaseDate: Date;
  quantity:     number;
  user:         string;
}
