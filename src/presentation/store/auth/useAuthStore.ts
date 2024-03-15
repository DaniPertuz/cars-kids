import { create } from 'zustand';
import { authLogin, authRegister, updateUserPassword } from '../../../actions/auth/auth';
import { AuthStatus, IUser } from '../../../infrastructure/interfaces';
import { StorageAdapter } from '../../../config/adapters/storage-adapter';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: IUser;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string) => Promise<any>;
  updatePassword: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);

    resp.error
      ? set({ status: 'unauthenticated', token: undefined, user: undefined })
      : (await StorageAdapter.setItem('token', resp.token),
        set({ status: 'authenticated', token: resp.token, user: resp.user }));

    return resp;
  },
  register: async (name: string, email: string, password: string) => {
    const resp = await authRegister(name, email, password);

    resp.error
      ? set({ status: 'unauthenticated', token: undefined, user: undefined })
      : (await StorageAdapter.setItem('token', resp.token),
        set({ status: 'authenticated', token: resp.token, user: resp.user }));

    return resp;
  },
  updatePassword: async (email: string, password: string) => {
    return await updateUserPassword(email, password);
  },
  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({ status: 'unauthenticated', token: undefined, user: undefined });
  }
}));
