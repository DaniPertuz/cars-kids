export interface AuthResponse {
  user:  IUser;
  token: string;
}

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export enum IStatus {
  Active   = 'active',
  Inactive = 'inactive'
}

export enum IUserRole {
  Admin  = 'admin',
  Editor = 'editor'
}

export enum IVehicleCategory {
  Car   = 'car',
  Cycle = 'cycle'
}

export enum IVehicleSize {
  Small  = 'S',
  Medium = 'M',
  Large  = 'L'
}

export interface IUser {
  email:    string;
  name:     string;
  role:     IUserRole;
  status:   IStatus;
}

export interface VehiclesResponse {
  page:     number;
  limit:    number;
  total:    number;
  next:     string | null;
  prev:     string | null;
  vehicles: IVehicle[];
}

export interface IVehicle {
  _id?:     string;
  nickname: string;
  category: string;
  color:    string;
  img?:     string;
  size:     string;
  status?:  IStatus;
}

export interface VehicleAPIResponse {
  error?:    string;
  response?: VehiclesResponse;
  status?:   string;
  vehicle?:  IVehicle;
}

export interface BudgetResponse {
  page:    number;
  limit:   number;
  total:   number;
  next:    null;
  prev:    null;
  budgets: IBudget[];
}

export interface IBudget {
  _id?:     string;
  base:     number;
  expenses: number;
  loans:    number;
  payroll:  number;
  date:     string;
}

export interface BudgetAPIResponse {
  error?:    string;
  response?: BudgetResponse;
  status?:   string;
  budget?:   IBudget;
}

export interface IProduct {
  _id?:   string;
  name:   string;
  cost:   number;
  price:  number;
  status: string;
}

export interface ProductResponse {
  page:     number;
  limit:    number;
  total:    number;
  next:     string | null;
  prev:     string | null;
  products: IProduct[];
}

export interface ProductAPIResponse {
  error?:    string;
  response?: ProductResponse;
  status?:   string;
  product?:  IProduct;
}
