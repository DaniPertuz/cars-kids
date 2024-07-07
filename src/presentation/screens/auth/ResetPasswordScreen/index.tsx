import { useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { SnackbarAdapter } from '../../../../config/adapters/snackbar.adapter';
import { EmailInput, PasswordInput } from '../../../components/forms';
import { LoginButtonContainer, LoginMainImage } from '../../../components/login';
import { Footnote, HeaderLayout, Headline, MainLayout, TopNavigation } from '../../../components/ui';
import { useCustomTheme, useEmailValidation, useResetProfile } from '../../../hooks';

import { authStyles } from '../../../styles/auth/styles';
import { globalStyles } from '../../../styles/global.styles';

export const ResetPasswordScreen = () => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const { form, email, password, confirmPassword, setForm, onUpdateProfile } = useResetProfile();
  const isValidEmail = useEmailValidation(email);
  const { background } = useCustomTheme();

  const onSubmit = () => {
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

    onUpdateProfile();
    setLoading(false);
  };

  return (
    <MainLayout>
      <TopNavigation top={top} />
      <ScrollView style={globalStyles.mainMargin} keyboardShouldPersistTaps='always'>
        <HeaderLayout paddingTop={height * 0.1}>
          <LoginMainImage />
          <Layout style={background}>
            <Headline text='Restablecer contraseña' />
          </Layout>
          <Footnote text='Ingresa email y nueva contraseña' />
        </HeaderLayout>
        <Layout style={authStyles.formContainer}>
          <EmailInput placeholder='Email' value={email} onChangeText={(email: string) => setForm({ ...form, email })} />
          <PasswordInput placeholder={'Ingresa contraseña'} value={password} onChangeText={(password: string) => setForm({ ...form, password })} />
          <PasswordInput placeholder={'Repite contraseña'} value={confirmPassword} onChangeText={(confirmPassword: string) => setForm({ ...form, confirmPassword })} />
        </Layout>
        <LoginButtonContainer disabled={loading} buttonText={'Restablecer'} onPress={onSubmit} />
      </ScrollView>
    </MainLayout>
  );
};
