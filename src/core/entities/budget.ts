export interface Budget {
  _id?:     string;
  base:     number;
  expenses: number;
  loans:    number;
  payroll:  number;
  date:     Date;
}
