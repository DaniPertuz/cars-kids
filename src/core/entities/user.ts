import { IStatus, IUserRole } from '../../infrastructure/interfaces';

export interface User {
  _id?:   string;
  email:  string;
  token:  string;
  name:   string;
  img?:   string;
  role:   IUserRole;
  status: IStatus;
}
