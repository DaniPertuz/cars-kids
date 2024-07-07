import { useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';

import { SnackbarAdapter } from '../../../../config/adapters/snackbar.adapter';
import { EmailInput, PasswordInput } from '../../../components/forms';
import { LoginButtonContainer, LoginFooter, LoginHeader, LoginMainImage } from '../../../components/login';
import { Caption, HeaderLayout, MainLayout } from '../../../components/ui';
import { useCustomTheme } from '../../../hooks';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { useAuthStore } from '../../../store/auth/useAuthStore';

import { authStyles } from '../../../styles/auth/styles';
import { globalStyles } from '../../../styles/global.styles';
import { globalColors } from '../../../theme/globalColors';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

export const LoginScreen = ({ navigation }: Props) => {
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
    navigation.navigate('BottomNavigator');
  };

  return (
    <MainLayout>
      <ScrollView showsVerticalScrollIndicator={false} style={[globalStyles.mainMargin, background]}>
        <HeaderLayout paddingTop={height * 0.1}>
          <LoginMainImage />
          <LoginHeader title={'Bienvenido'} footnote={'Ingresa tus credenciales'} />
        </HeaderLayout>
        <Layout style={[authStyles.formContainer, background]}>
          <EmailInput placeholder='Email' value={form.email} onChangeText={(email: string) => setForm({ ...form, email })} />
          <PasswordInput placeholder='Contraseña' value={form.password} onChangeText={(password: string) => setForm({ ...form, password })} />
        </Layout>
        <Layout style={[{ marginTop: 10, ...globalStyles.flexEnd }, background]}>
          <Caption text={'¿Olvidaste tu contraseña?'} textColor={globalColors.primaryRed} onPress={() => navigation.navigate('ResetPasswordScreen')} />
        </Layout>
        <LoginButtonContainer disabled={loading} buttonText={'Ingresar'} onPress={onLogin} />
        <LoginFooter text='¿No tienes cuenta?' linkText='Crea una' onPress={() => navigation.dispatch(StackActions.push('RegisterScreen'))} />
      </ScrollView>
    </MainLayout>
  );
};
