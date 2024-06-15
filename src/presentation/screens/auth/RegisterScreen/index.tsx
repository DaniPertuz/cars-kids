import { useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';

import { SnackbarAdapter } from '../../../../config/adapters/snackbar.adapter';
import { IUserRole } from '../../../../infrastructure/interfaces';
import { DefaultInput, EmailInput, PasswordInput } from '../../../components/forms';
import { LoginButtonContainer, LoginFooter, LoginHeader, LoginMainImage } from '../../../components/login';
import { HeaderLayout, MainLayout, RadioGroupComponent } from '../../../components/ui';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { useAuthStore } from '../../../store/auth/useAuthStore';

import { authStyles } from '../../../styles/auth/styles';
import { globalStyles } from '../../../styles/global.styles';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }

export const RegisterScreen = ({ navigation }: Props) => {
  const { height } = useWindowDimensions();
  const { register } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(IUserRole.Editor);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleUserRole = (role: number) => {
    switch (role) {
      case 0:
        setRole(IUserRole.Admin);
        break;
      case 1:
        setRole(IUserRole.Editor);
        break;
    }
  };

  const onRegister = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      SnackbarAdapter.showSnackbar('Ingrese sus credenciales');
      return;
    }

    setLoading(true);
    const resp = await register(form.name, form.email, form.password, role);

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
      <ScrollView style={globalStyles.mainMargin}>
        <HeaderLayout paddingTop={height * 0.1}>
          <LoginMainImage />
          <LoginHeader title={'Registro'} footnote={'Ingresa tus datos'} />
        </HeaderLayout>
        <Layout style={authStyles.formContainer}>
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
