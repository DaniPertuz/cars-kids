export interface AuthResponse {
  email:    string;
  password: string;
  name:     string;
  role:     IUserRole;
  status:   IStatus;
  token:    string;
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

export interface IUser {
  email:    string;
  password: string;
  name:     string;
  role:     IUserRole;
  status:   IStatus;
}
