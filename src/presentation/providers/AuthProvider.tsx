import { PropsWithChildren, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StorageAdapter } from '../../config/adapters/storage-adapter';
import { RootStackParams } from '../navigation/MainNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { status, user } = useAuthStore();

  const checkUser = async () => {
    const storedUser = await StorageAdapter.getItem('user');
    return storedUser;
  };

  const handleUserCheck = async () => {
    const storedUser = await checkUser();
    if (status === 'authenticated' || storedUser) {
      navigation.reset({ index: 0, routes: [{ name: 'BottomNavigator' }] });
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
    }
  };
  
  useEffect(() => {
    handleUserCheck();
  }, [status, user, navigation]);

  return (
    <>{children}</>
  );
};
