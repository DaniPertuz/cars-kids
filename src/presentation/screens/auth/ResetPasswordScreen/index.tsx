import { useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';

import { EmailInput, PasswordInput } from '../../../components/forms';
import { LoginButtonContainer, LoginMainImage } from '../../../components/login';
import { Back, Footnote, Headline } from '../../../components/ui';
import { useEmailValidation, useResetProfile } from '../../../hooks';

import { authStyles } from '../../../styles/auth/styles';
import { globalStyles } from '../../../styles/global.styles';

export const ResetPasswordScreen = () => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const { form, email, password, confirmPassword, setForm, onUpdateProfile } = useResetProfile();
  const isValidEmail = useEmailValidation(email);

  const onSubmit = () => {
    setLoading(true);

    if (!isValidEmail) {
      Snackbar.show({ text: 'Email no válido', duration: Snackbar.LENGTH_SHORT });
      setLoading(false);
      return;
    }

    if (!email || email.length === 0) {
      Snackbar.show({ text: 'Ingrese email', duration: Snackbar.LENGTH_SHORT });
      setLoading(false);
      return;
    }

    if ((!password || !confirmPassword) || (password.length === 0 || confirmPassword.length === 0)) {
      Snackbar.show({ text: 'No se permite contraseña vacía', duration: Snackbar.LENGTH_SHORT });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Snackbar.show({ text: 'Contraseñas no coinciden', duration: Snackbar.LENGTH_SHORT });
      setLoading(false);
      return;
    }

    onUpdateProfile();
    setLoading(false);
  };

  return (
    <Layout style={globalStyles.container}>
      <Back top={top} />
      <ScrollView style={globalStyles.mainMargin} keyboardShouldPersistTaps='always'>
        <Layout style={{ paddingTop: height * 0.1, ...globalStyles.mainLayout }}>
          <LoginMainImage />
          <Layout style={authStyles.welcomeTextContainer}>
            <Headline text='Restablecer contraseña' textColor={globalStyles.colorOnyx} />
          </Layout>
          <Footnote text='Ingresa email y nueva contraseña' />
        </Layout>
        <Layout style={authStyles.formContainer}>
          <EmailInput placeholder='Email' value={email} onChangeText={(email: string) => setForm({ ...form, email })} />
          <PasswordInput placeholder={'Ingresa contraseña'} value={password} onChangeText={(password: string) => setForm({ ...form, password })} />
          <PasswordInput placeholder={'Repite contraseña'} value={confirmPassword} onChangeText={(confirmPassword: string) => setForm({ ...form, confirmPassword })} />
        </Layout>
        <LoginButtonContainer disabled={loading} buttonText={'Restablecer'} onPress={onSubmit} />
      </ScrollView>
    </Layout>
  );
};
