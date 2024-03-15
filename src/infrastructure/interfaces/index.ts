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

export interface IUser {
  email:    string;
  name:     string;
  role:     IUserRole;
  status:   IStatus;
}
