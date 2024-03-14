import { create } from 'zustand';
import { AuthStatus, IUser } from '../../../infrastructure/interfaces';
import { authLogin } from '../../../actions/auth/auth';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: IUser;
  login: (email: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return false;
    }

    set({ status: 'authenticated', token: resp.token, user: resp.user });
    return true;
  }
}));
