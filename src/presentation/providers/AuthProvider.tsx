import { PropsWithChildren, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StorageAdapter } from '../../config/adapters/storage-adapter';
import { RootStackParams } from '../navigation/MainNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { status, token } = useAuthStore();

  const checkToken = async () => {
    const storedToken = await StorageAdapter.getItem('token');
    return storedToken;
  };

  const handleTokenCheck = async () => {
    const storedToken = await checkToken();
    if (status === 'authenticated' || storedToken) {
      navigation.reset({ index: 0, routes: [{ name: 'BottomNavigator' }] });
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
    }
  };
  
  useEffect(() => {
    handleTokenCheck();
  }, [status, token, navigation]);

  return (
    <>{children}</>
  );
};
