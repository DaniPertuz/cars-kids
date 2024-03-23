import { useState } from 'react';
import { Image, ScrollView, useWindowDimensions } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';

import { EmailInput, PasswordInput } from '../../../components/forms';
import { Footer } from '../../../components/login';
import { Caption, Footnote, PrimaryButton, Spacer, Title } from '../../../components/ui';
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
          <Layout style={authStyles.imageContainer}>
            <Image source={require('../../../../assets/carkids-removebg.png')} style={authStyles.mainImage} />
          </Layout>
          <Layout style={authStyles.welcomeTextContainer}>
            <Title text='Bienvenido' />
          </Layout>
          <Footnote text='Ingresa tus credenciales' />
        </Layout>
        <Layout style={authStyles.formContainer}>
          <EmailInput placeholder='Email' value={form.email} onChangeText={(email: string) => setForm({ ...form, email })} />
          <PasswordInput placeholder='Contraseña' value={form.password} onChangeText={(password: string) => setForm({ ...form, password })} />
        </Layout>
        <Layout style={globalStyles.flexEnd}>
          <Caption text={'¿Olvidaste tu contraseña?'} textColor={globalStyles.colorPrimaryRed} onPress={() => navigation.navigate('ResetPasswordScreen')} />
        </Layout>
        <Spacer height={20} />
        <Layout style={globalStyles.mainBackground}>
          <PrimaryButton text='Ingresar' onPress={onLogin} />
        </Layout>
        <Spacer height={50} />
        <Footer text='¿No tienes cuenta?' linkText='Crea una' onPress={() => navigation.dispatch(StackActions.push('RegisterScreen'))} />
      </ScrollView>
    </Layout>
  );
};
