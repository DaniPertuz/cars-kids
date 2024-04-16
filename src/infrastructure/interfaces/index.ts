import { Budget, Product, Purchase, Rental, User, Vehicle } from '../../core/entities';

export interface AuthResponse {
  user:  User;
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

export interface UsersResponse {
  page:  number;
  limit: number;
  total: number;
  next:  string | null;
  prev:  string | null;
  users: User[];
}

export interface UserAPIResponse {
  error?:    string;
  response?: UsersResponse;
  status?:   string;
  user?:     User;
}

export interface VehiclesResponse {
  page:     number;
  limit:    number;
  total:    number;
  next:     string | null;
  prev:     string | null;
  vehicles: Vehicle[];
}

export interface VehicleAPIResponse {
  error?:    string;
  response?: VehiclesResponse;
  status?:   string;
  vehicle?:  Vehicle;
}

export interface BudgetResponse {
  page:    number;
  limit:   number;
  total:   number;
  next:    string | null;
  prev:    string | null;
  budgets: Budget[];
}

export interface BudgetAPIResponse {
  error?:    string;
  response?: BudgetResponse;
  status?:   string;
  budget?:   Budget;
}

export interface ProductResponse {
  page:     number;
  limit:    number;
  total:    number;
  next:     string | null;
  prev:     string | null;
  products: Product[];
}

export interface ProductAPIResponse {
  error?:    string;
  response?: ProductResponse;
  status?:   string;
  product?:  Product;
}

export interface PurchaseResponse {
  page:      number;
  limit:     number;
  total:     number;
  sum:       number;
  next:      string | null;
  prev:      string | null;
  purchases: Purchase[];
}

export interface PurchaseAPIResponse {
  error?:    string;
  response?: PurchaseResponse;
  purchase?: Purchase;
}

export interface RentalResponse {
  page:    number;
  limit:   number;
  total:   number;
  sum:     number;
  next:    string | null;
  prev:    string | null;
  rentals: Rental[];
}

export interface RentalAPIResponse {
  error?:    string;
  response?: RentalResponse;
  status?:   string;
  rental?:   Rental;
}
