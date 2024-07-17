import { PropsWithChildren, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StorageAdapter } from '../../config/adapters/storage-adapter';
import { User } from '../../core/entities';
import { RootStackParams } from '../navigation/MainNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { status, checkUser } = useAuthStore();

  const checkStoredUser = async () => {
    const storedUser = await StorageAdapter.getItem('user');
    return storedUser;
  };

  const handleUserCheck = async () => {
    if (status === 'checking') {
      navigation.reset({ index: 0, routes: [{ name: 'LoadingScreen' }] });
    }
    
    const storedUser = await checkStoredUser();
    const parsedUser = JSON.parse(storedUser!) as User;
    checkUser(parsedUser);

    if (status === 'authenticated' && storedUser) {
      navigation.reset({ index: 0, routes: [{ name: 'BottomNavigator' }] });
      return;
    }

    if (status === 'unauthenticated' && !storedUser) {
      navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
      return;
    }
  };

  useEffect(() => {
    handleUserCheck();
  }, [status]);

  return (
    <>{children}</>
  );
};
