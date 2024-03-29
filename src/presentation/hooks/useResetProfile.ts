import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Snackbar from 'react-native-snackbar';

import { RootStackParams } from '../navigation/MainNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';
import { useEmptyFieldValidation } from './useEmptyFieldValidation';

export const useResetProfile = () => {
  const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

  const emailStore = useAuthStore(state => state.user?.email || '');
  const nameStore = useAuthStore(state => state.user?.name || '');
  const { updateEmail, updateName, updatePassword } = useAuthStore();

  const [form, setForm] = useState({
    name: nameStore,
    email: emailStore,
    password: '',
    confirmPassword: ''
  });

  const { email, name, password, confirmPassword } = form;

  const { isEmpty: isEmailEmpty, checkEmptyFields: checkEmailEmpty } = useEmptyFieldValidation();
  const { isEmpty: isPasswordEmpty, checkEmptyFields: checkPasswordEmpty } = useEmptyFieldValidation();
  const { isEmpty: isConfirmedPasswordEmpty, checkEmptyFields: checkConfirmedPasswordEmpty } = useEmptyFieldValidation();

  const onUpdateProfile = async () => {
    if (nameStore.length !== 0 && emailStore.length !== 0) {
      if (nameStore !== name) {
        updateName(emailStore, name);
        Snackbar.show({ text: 'Nombre actualizado', duration: Snackbar.LENGTH_SHORT });
        navigator.goBack();
        return;
      }

      if (emailStore !== email) {
        updateEmail(emailStore, email);
        Snackbar.show({ text: 'Email actualizado', duration: Snackbar.LENGTH_SHORT });
        navigator.goBack();
        return;
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
      navigator.goBack();
    }
  };

  return {
    form,
    email,
    password,
    confirmPassword,
    setForm,
    onUpdateProfile
  };
};
