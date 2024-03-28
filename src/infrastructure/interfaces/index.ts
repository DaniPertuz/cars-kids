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
  _id:      string;
  nickname: string;
  category: string;
  color:    string;
  img:      string;
  size:     string;
}
