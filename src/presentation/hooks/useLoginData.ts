import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
import { RootStackParams } from '../navigation/MainNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';
import { useCustomTheme } from './useCustomTheme';

export const useLoginData = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { login } = useAuthStore();
  const { background } = useCustomTheme();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const { height } = useWindowDimensions();

  const onLogin = async () => {
    if (form.email.length === 0 && form.password.length === 0) {
      SnackbarAdapter.showSnackbar('Ingrese sus credenciales');
      return;
    }

    setLoading(true);
    const resp = await login(form.email.trim(), form.password.trim());

    if (!resp) {
      setLoading(false);
      SnackbarAdapter.showSnackbar('No hay conexión');
      return;
    }

    if (resp.error) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(resp.error);
      return;
    }

    setLoading(false);
    navigation.push('BottomNavigator', { screen: 'RentalsScreen'});
  };

  return {
    background,
    form,
    height,
    loading,
    navigation,
    onLogin,
    setForm
  };
};
