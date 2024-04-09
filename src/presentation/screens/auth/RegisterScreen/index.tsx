import { useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';

import { DefaultInput, EmailInput, PasswordInput } from '../../../components/forms';
import { LoginButtonContainer, LoginFooter, LoginHeader, LoginMainImage } from '../../../components/login';
import { RadioGroupComponent } from '../../../components/ui';
import { IUserRole } from '../../../../infrastructure/interfaces';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { useAuthStore } from '../../../store/auth/useAuthStore';

import { authStyles } from '../../../styles/auth/styles';
import { globalStyles } from '../../../styles/global.styles';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }

export const RegisterScreen = ({ navigation }: Props) => {
  const { register } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(IUserRole.Editor);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { height } = useWindowDimensions();

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
      Snackbar.show({ text: 'Ingrese sus credenciales', duration: Snackbar.LENGTH_SHORT });
      return;
    }

    setLoading(true);
    const resp = await register(form.name, form.email, form.password, role);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    setLoading(false);
    navigation.navigate('BottomNavigator');
  };

  return (
    <Layout style={globalStyles.container}>
      <ScrollView style={globalStyles.mainMargin}>
        <Layout style={{ paddingTop: height * 0.1, ...globalStyles.mainLayout }}>
          <LoginMainImage />
          <LoginHeader title={'Registro'} footnote={'Ingresa tus datos'} />
        </Layout>
        <Layout style={authStyles.formContainer}>
          <DefaultInput placeholder='Nombre' value={form.name} onChangeText={(name: string) => setForm({ ...form, name })} />
          <EmailInput placeholder='Email' value={form.email} onChangeText={(email: string) => setForm({ ...form, email })} />
          <PasswordInput placeholder='Contraseña' value={form.password} onChangeText={(password: string) => setForm({ ...form, password })} />
          <RadioGroupComponent initialValue={0} list={['Administrador', 'Editor']} handleSelection={handleUserRole} />
        </Layout>
        <LoginButtonContainer disabled={loading} buttonText={'Registrar'} onPress={onRegister} />
        <LoginFooter text='¿Ya tienes cuenta?' linkText='Ingresa' onPress={() => navigation.dispatch(StackActions.push('LoginScreen'))} />
      </ScrollView>
    </Layout>
  );
};
