import { create } from 'zustand';
import { authLogin, authRegister } from '../../../actions/auth';
import { AuthStatus, IUser } from '../../../infrastructure/interfaces';
import { StorageAdapter } from '../../../config/adapters/storage-adapter';
import { updateUserEmail, updateUserImage, updateUserName, updateUserPassword } from '../../../actions/users';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: IUser;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string, role: string) => Promise<any>;
  updateName: (email: string, name: string) => Promise<any>;
  updateImage: (email: string, img: string) => Promise<any>;
  updateEmail: (email: string, newEmail: string) => Promise<any>;
  updatePassword: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);

    resp.error
      ? set({ status: 'unauthenticated', token: undefined, user: undefined })
      : (await StorageAdapter.setItem('token', resp.token),
        await StorageAdapter.setItem('user', JSON.stringify(resp.user)),
        set({ status: 'authenticated', token: resp.token, user: resp.user }));

    return resp;
  },
  register: async (name: string, email: string, password: string, role: string) => {
    const resp = await authRegister(name, email, password, role);

    resp.error
      ? set({ status: 'unauthenticated', token: undefined, user: undefined })
      : (await StorageAdapter.setItem('token', resp.token),
        await StorageAdapter.setItem('user', JSON.stringify(resp.user)),
        set({ status: 'authenticated', token: resp.token, user: resp.user }));

    return resp;
  },
  updateName: async (email: string, name: string) => {
    const resp = await updateUserName(email, name);

    if (!resp.error) {
      set((state) => ({
        ...state,
        user: {
          ...state.user!,
          name: name
        }
      }));
      await StorageAdapter.setItem('user', JSON.stringify(resp.user));
    }
  
    return resp;
  },
  updateImage: async (email: string, img: string) => {
    const resp = await updateUserImage(email, img);

    if (!resp.error) {
      set((state) => ({
        ...state,
        user: {
          ...state.user!,
          img: img
        }
      }));
      await StorageAdapter.setItem('user', JSON.stringify(resp.user));
    }
  
    return resp;
  },
  updateEmail: async (email: string, newEmail: string) => {
    const resp = await updateUserEmail(email, newEmail);

    if (!resp.error) {
      set((state) => ({
        ...state,
        user: {
          ...state.user!,
          email: newEmail
        }
      }));
      await StorageAdapter.setItem('user', JSON.stringify(resp.user));
    }
  
    return resp;
  },
  updatePassword: async (email: string, password: string) => {
    return await updateUserPassword(email, password);
  },
  logout: async () => {
    Promise.all([
      StorageAdapter.removeItem('token'),
      StorageAdapter.removeItem('user')
    ]);
    set({ status: 'unauthenticated', token: undefined, user: undefined });
  }
}));
