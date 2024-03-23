import { useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';

import { EmailInput, PasswordInput } from '../../../components/forms';
import { LoginButtonContainer, LoginFooter, LoginHeader, LoginMainImage } from '../../../components/login';
import { Caption } from '../../../components/ui';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { useAuthStore } from '../../../store/auth/useAuthStore';

import { authStyles } from '../../../styles/auth/styles';
import { globalStyles } from '../../../styles/global.styles';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

export const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuthStore();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const { height } = useWindowDimensions();

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }

    const resp = await login(form.email.trim(), form.password.trim());

    if (resp.error) {
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    navigation.navigate('BottomNavigator');
  };

  return (
    <Layout style={authStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={globalStyles.mainMargin}>
        <Layout style={{ paddingTop: height * 0.1, ...globalStyles.mainLayout }}>
          <LoginMainImage />
          <LoginHeader title={'Bienvenido'} footnote={'Ingresa tus credenciales'} />
        </Layout>
        <Layout style={authStyles.formContainer}>
          <EmailInput placeholder='Email' value={form.email} onChangeText={(email: string) => setForm({ ...form, email })} />
          <PasswordInput placeholder='Contraseña' value={form.password} onChangeText={(password: string) => setForm({ ...form, password })} />
        </Layout>
        <Layout style={globalStyles.flexEnd}>
          <Caption text={'¿Olvidaste tu contraseña?'} textColor={globalStyles.colorPrimaryRed} onPress={() => navigation.navigate('ResetPasswordScreen')} />
        </Layout>
        <LoginButtonContainer buttonText={'Ingresar'} onPress={onLogin} />
        <LoginFooter text='¿No tienes cuenta?' linkText='Crea una' onPress={() => navigation.dispatch(StackActions.push('RegisterScreen'))} />
      </ScrollView>
    </Layout>
  );
};
