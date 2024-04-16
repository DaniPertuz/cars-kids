export interface Rental {
  _id?:    string;
  client:  string;
  time:    number;
  date:    Date;
  vehicle: string;
  payment: string;
  amount:  number;
  user:    string;
}
