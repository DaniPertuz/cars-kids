import { IStatus, IUserRole } from '../../infrastructure/interfaces';

export interface User {
  email:  string;
  name:   string;
  img?:   string;
  role:   IUserRole;
  status: IStatus;
}
