import { useState } from 'react';
import { Keyboard, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
import { IUserRole } from '../../infrastructure/interfaces';
import { RootStackParams } from '../navigation/MainNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

export const useRegisterData = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { height } = useWindowDimensions();
  const { register } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(IUserRole.Editor);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleUserRole = (role: number) => {
    switch (role) {
      case 0:
        setRole(IUserRole.Admin);
        break;
      case 1:
        setRole(IUserRole.Editor);
        break;
    }
  };

  const onRegister = async () => {
    Keyboard.dismiss();
    if (form.email.length === 0 || form.password.length === 0) {
      SnackbarAdapter.showSnackbar('Ingrese sus credenciales');
      return;
    }

    setLoading(true);
    const resp = await register(form.name, form.email, form.password, role);

    if (resp.error) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(resp.error);
      return;
    }

    setLoading(false);
    navigation.navigate('BottomNavigator');
  };

  return {
    form,
    height,
    loading,
    navigation,
    handleUserRole,
    onRegister,
    setForm
  }
}
