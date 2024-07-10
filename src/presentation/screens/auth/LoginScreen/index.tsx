import { ScrollView } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components';

import { EmailInput, PasswordInput } from '../../../components/forms';
import { LoginButtonContainer, LoginFooter, LoginHeader, LoginMainImage } from '../../../components/login';
import { Caption, HeaderLayout, MainLayout } from '../../../components/ui';
import { useLoginData } from '../../../hooks';

import { authStyles } from '../../../styles/auth/styles';
import { globalStyles } from '../../../styles/global.styles';
import { globalColors } from '../../../theme/globalColors';

export const LoginScreen = () => {
  const { background, form, height, loading, navigation, onLogin, setForm } = useLoginData();

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
