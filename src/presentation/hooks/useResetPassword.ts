import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Snackbar from 'react-native-snackbar';

import { RootStackParams } from '../navigation/MainNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';
import { useEmptyFieldValidation } from './useEmptyFieldValidation';

export const useResetPassword = () => {
  const navigator = useNavigation<StackNavigationProp<RootStackParams>>();
  const { updatePassword } = useAuthStore();
  const emailStore = useAuthStore(state => state.user?.email!);
  const [form, setForm] = useState({
    email: emailStore || '',
    password: '',
    confirmPassword: ''
  });

  const { email, password, confirmPassword } = form;

  const { isEmpty: isEmailEmpty, checkEmptyFields: checkEmailEmpty } = useEmptyFieldValidation();
  const { isEmpty: isPasswordEmpty, checkEmptyFields: checkPasswordEmpty } = useEmptyFieldValidation();
  const { isEmpty: isConfirmedPasswordEmpty, checkEmptyFields: checkConfirmedPasswordEmpty } = useEmptyFieldValidation();

  const onUpdatePassword = async () => {
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
    onUpdatePassword
  };
};
