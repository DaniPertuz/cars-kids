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

export interface Pagination {
  page:  number;
  limit: number;
}

export interface UsersResponse {
  page:  number;
  limit: number;
  total: number;
  next:  string | null;
  prev:  string | null;
  data:  User[];
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
  data:    Budget[];
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
  data:      Purchase[];
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
  data:    Rental[];
}

export interface RentalAPIResponse {
  error?:    string;
  response?: RentalResponse;
  status?:   string;
  rental?:   Rental;
}

export type ValidDataKeys = 'users' | 'vehicles' | 'budgets' | 'products' | 'purchases' | 'rentals';

export type DataKeys = keyof ApiResponse & {
  users?: User[];
  vehicles?: Vehicle[];
  budgets?: Budget[];
  products?: Product[];
  purchases?: Purchase[];
  rentals?: Rental[];
};

export interface ApiResponse {
  limit: number;
  next: string | null;
  page: number;
  prev: string | null;
  sum?: number;
  total: number;
  data?: User | Vehicle | Budget | Product | Purchase | Rental;
};

export type AnyApiResponse = UsersResponse | BudgetResponse | PurchaseResponse | RentalResponse;

export type DataItem = User | Vehicle | Budget | Product | Purchase | Rental;
