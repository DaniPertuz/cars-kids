import { useEffect, useState } from 'react';
import { StorageAdapter } from '../../config/adapters/storage-adapter';
import { useAuthStore } from '../store/auth/useAuthStore';
import { IUser } from '../../infrastructure/interfaces';

export const useUserInfo = () => {
  const [user, setUser] = useState<IUser>();
  const userStore = useAuthStore(state => state.user);

  const setUserData = async () => {
    const userStorage = await StorageAdapter.getItem('user');
    const userJson = JSON.parse(userStorage!);

    setUser({
      name: userStore ? userStore.name : userJson.name,
      img: userStore ? userStore.img : userJson.img,
      email: userStore ? userStore.email : userJson.email,
      role: userStore ? userStore.role : userJson.role,
      status: userStore ? userStore.status : userJson.status
    });
  };

  useEffect(() => {
    setUserData();
  }, [userStore]);

  return { user };
};
