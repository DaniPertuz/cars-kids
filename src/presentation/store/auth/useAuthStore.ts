import { create } from 'zustand';
import { authLogin } from '../../../actions/auth/auth';
import { AuthStatus, IUser } from '../../../infrastructure/interfaces';
import { StorageAdapter } from '../../../config/adapters/storage-adapter';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: IUser;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
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

    await StorageAdapter.setItem('token', resp.token);

    set({ status: 'authenticated', token: resp.token, user: resp.user });
    return true;
  },
  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({ status: 'unauthenticated', token: undefined, user: undefined });
  }
}));
