import { useState } from 'react';
import { Keyboard, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
import { useCustomTheme } from './useCustomTheme';
import { useEmailValidation } from './useEmailValidation';
import { useResetProfile } from './useResetProfile';

export const useResetPasswordData = () => {
  const { done, email, resetForm, password, confirmPassword, onUpdateProfile, setResetForm } = useResetProfile();
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const { background } = useCustomTheme();
  const isValidEmail = useEmailValidation(email);

  const onSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);

    if (!isValidEmail) {
      SnackbarAdapter.showSnackbar('Email no válido');
      setLoading(false);
      return;
    }

    if (!email || email.length === 0) {
      SnackbarAdapter.showSnackbar('Ingrese email');
      setLoading(false);
      return;
    }

    if ((!password || !confirmPassword) || (password.length === 0 || confirmPassword.length === 0)) {
      SnackbarAdapter.showSnackbar('No se permite contraseña vacía');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      SnackbarAdapter.showSnackbar('Contaseñas no coinciden');
      setLoading(false);
      return;
    }

    await onUpdateProfile();
    setLoading(false);
  };

  return {
    background,
    confirmPassword,
    done,
    email,
    resetForm,
    height,
    loading,
    password,
    top,
    onSubmit,
    setResetForm
  };
}

