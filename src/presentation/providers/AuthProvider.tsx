import { PropsWithChildren, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/MainNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { status } = useAuthStore();

  useEffect(() => {
    if (status !== 'checking') {
      if (status === 'authenticated') {
        navigation.reset({ index: 0, routes: [ {name: 'BottomNavigator' }]});
      } else {
        navigation.reset({ index: 0, routes: [ {name: 'LoginScreen' }]});
      }
    }
  }, [status]);

  return (
    <>{children}</>
  )
}
