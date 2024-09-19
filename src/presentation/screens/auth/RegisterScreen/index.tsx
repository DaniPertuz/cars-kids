import { ScrollView } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components';

import { DefaultInput, EmailInput, PasswordInput } from '../../../components/forms';
import { LoginButtonContainer, LoginFooter, LoginHeader, LoginMainImage } from '../../../components/login';
import { HeaderLayout, MainLayout, RadioGroupComponent } from '../../../components/ui';
import { useCustomTheme, useRegisterData } from '../../../hooks';

import { authStyles } from '../../../styles/auth/styles';
import { globalStyles } from '../../../styles/global.styles';

export const RegisterScreen = () => {
  const { background } = useCustomTheme();
  const { form, height, loading, navigation, handleUserRole, onRegister, setForm } = useRegisterData();

  return (
    <MainLayout>
      <ScrollView style={globalStyles.mainMargin} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
        <HeaderLayout paddingTop={height * 0.1}>
          <LoginMainImage />
          <LoginHeader title={'Registro'} footnote={'Ingresa tus datos'} />
        </HeaderLayout>
        <Layout style={[authStyles.formContainer, background]}>
          <DefaultInput placeholder='Nombre' value={form.name} onChangeText={(name: string) => setForm({ ...form, name })} />
          <EmailInput placeholder='Email' value={form.email} onChangeText={(email: string) => setForm({ ...form, email })} />
          <PasswordInput placeholder='Contraseña' value={form.password} onChangeText={(password: string) => setForm({ ...form, password })} />
          <RadioGroupComponent initialValue={0} list={['Administrador', 'Editor']} handleSelection={handleUserRole} />
        </Layout>
        <LoginButtonContainer disabled={loading} buttonText={'Registrar'} onPress={onRegister} />
        <LoginFooter text='¿Ya tienes cuenta?' linkText='Ingresa' onPress={() => navigation.dispatch(StackActions.push('LoginScreen'))} />
      </ScrollView>
    </MainLayout>
  );
};
