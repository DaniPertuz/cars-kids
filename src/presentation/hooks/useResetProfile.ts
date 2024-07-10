import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useEmptyFieldValidation, useUserInfo } from './';
import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
import { RootStackParams } from '../navigation/MainNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

export const useResetProfile = () => {
  const init = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  const navigator = useNavigation<StackNavigationProp<RootStackParams>>();
  const { user } = useUserInfo();

  const emailStore = user?.email ?? '';
  const nameStore = user?.name ?? '';
  const { updateEmail, updateName, updatePassword } = useAuthStore();

  const [resetForm, setResetForm] = useState(init);
  const [done, setDone] = useState(false);

  const { email, name, password, confirmPassword } = resetForm;

  const { isEmpty: isEmailEmpty, checkEmptyFields: checkEmailEmpty } = useEmptyFieldValidation();
  const { isEmpty: isPasswordEmpty, checkEmptyFields: checkPasswordEmpty } = useEmptyFieldValidation();
  const { isEmpty: isConfirmedPasswordEmpty, checkEmptyFields: checkConfirmedPasswordEmpty } = useEmptyFieldValidation();

  const setData = () => {
    setResetForm(prevState => ({
      ...prevState,
      name: nameStore,
      email: emailStore
    }));
  };

  const onUpdateProfile = async () => {
    if (nameStore && emailStore) {
      if (nameStore.length !== 0 && emailStore.length !== 0) {
        if (nameStore !== name) {
          const resp = await updateName(emailStore, name);

          if (resp.error) {
            SnackbarAdapter.showSnackbar(resp.error);
            return;
          }

          SnackbarAdapter.showSnackbar('Nombre actualizado');
          navigator.push('BottomNavigator', { screen: 'ProfileScreen' });
          return;
        }

        if (emailStore !== email) {
          const resp = await updateEmail(emailStore, email);

          if (resp.error) {
            SnackbarAdapter.showSnackbar(resp.error);
            return;
          }

          SnackbarAdapter.showSnackbar('Email actualizado');
          navigator.push('BottomNavigator', { screen: 'ProfileScreen' });
          return;
        }
      }
    }

    checkEmailEmpty(email);
    checkPasswordEmpty(password);
    checkConfirmedPasswordEmpty(confirmPassword);

    if (!isEmailEmpty && !isPasswordEmpty && !isConfirmedPasswordEmpty) {
      if (password !== confirmPassword) {
        SnackbarAdapter.showSnackbar('Contraseñas no coinciden');
        return;
      }

      const resp = await updatePassword(email, password);

      if (resp.error) {
        SnackbarAdapter.showSnackbar(resp.error);
        return;
      }

      if (resp.user) {
        SnackbarAdapter.showSnackbar('Contraseña restablecida');
        navigator.push('LoginScreen');
        setDone(true);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setData();
    }
  }, [user]);

  return {
    confirmPassword,
    done,
    email,
    password,
    resetForm,
    setResetForm,
    onUpdateProfile
  };
};
