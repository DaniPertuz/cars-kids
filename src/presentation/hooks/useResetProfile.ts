import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Snackbar from 'react-native-snackbar';

import { useEmptyFieldValidation, useUserInfo } from './';
import { RootStackParams } from '../navigation/MainNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

export const useResetProfile = () => {
  const navigator = useNavigation<StackNavigationProp<RootStackParams>>();
  const { user } = useUserInfo();

  const emailStore = user?.email!;
  const nameStore = user?.name!;
  const { updateEmail, updateName, updatePassword } = useAuthStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { email, name, password, confirmPassword } = form;

  const { isEmpty: isEmailEmpty, checkEmptyFields: checkEmailEmpty } = useEmptyFieldValidation();
  const { isEmpty: isPasswordEmpty, checkEmptyFields: checkPasswordEmpty } = useEmptyFieldValidation();
  const { isEmpty: isConfirmedPasswordEmpty, checkEmptyFields: checkConfirmedPasswordEmpty } = useEmptyFieldValidation();

  const setData = () => {
    setForm(prevState => ({
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
            Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
            return;
          }

          Snackbar.show({ text: 'Nombre actualizado', duration: Snackbar.LENGTH_SHORT });
          navigator.push('BottomNavigator', { screen: 'ProfileScreen' });
          return;
        }

        if (emailStore !== email) {
          const resp = await updateEmail(emailStore, email);

          if (resp.error) {
            Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
            return;
          }

          Snackbar.show({ text: 'Email actualizado', duration: Snackbar.LENGTH_SHORT });
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
        Snackbar.show({ text: 'Contraseñas no coinciden', duration: Snackbar.LENGTH_SHORT });
        return;
      }

      const resp = await updatePassword(email, password);

      if (resp.error) {
        Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
        return;
      }

      Snackbar.show({ text: 'Contraseña restablecida', duration: Snackbar.LENGTH_SHORT });
      navigator.push('LoginScreen');
    }
  };

  useEffect(() => {
    setData();
  }, [user]);

  return {
    form,
    email,
    password,
    confirmPassword,
    setForm,
    onUpdateProfile
  };
};
