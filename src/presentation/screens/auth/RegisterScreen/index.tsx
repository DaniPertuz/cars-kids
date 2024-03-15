import { useState } from 'react';
import { Image, ScrollView, useWindowDimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Layout, Text } from '@ui-kitten/components';

import { DefaultInput, EmailInput, PasswordInput } from '../../../components/forms';
import { PrimaryButton, Spacer } from '../../../components/ui';
import { Footer } from '../../../components/Login/footer';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { useAuthStore } from '../../../store/auth/useAuthStore';

import { authStyles } from '../../../styles/auth/styles';
import { globalStyles } from '../../../styles/global.styles';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }

export const RegisterScreen = ({ navigation }: Props) => {
  const { register } = useAuthStore();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { height } = useWindowDimensions();

  const onRegister = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }

    await register(form.name, form.email, form.password);

    navigation.navigate('HomeScreen');
  };

  return (
    <Layout style={authStyles.container}>
      <ScrollView style={authStyles.mainMargin}>
        <Layout style={{ paddingTop: height * 0.1, ...authStyles.mainLayout }}>
          <Layout style={authStyles.imageContainer}>
            <Image
              source={require('../../../../assets/carkids-removebg.png')}
              style={authStyles.mainImage}
            />
          </Layout>
          <Layout style={authStyles.welcomeTextContainer}>
            <Text category='h1' style={globalStyles.colorOnyx}>Registro</Text>
          </Layout>
          <Text category='p1' style={globalStyles.colorSpanishGray}>Ingresa tus datos</Text>
        </Layout>
        <Layout style={authStyles.formContainer}>
          <DefaultInput placeholder='Nombre' value={form.name} onChangeText={(name: string) => setForm({ ...form, name })} />
          <EmailInput placeholder='Email' value={form.email} onChangeText={(email: string) => setForm({ ...form, email })} />
          <PasswordInput placeholder='Contraseña' value={form.password} onChangeText={(password: string) => setForm({ ...form, password })} />
        </Layout>
        <Spacer height={20} />
        <Layout style={globalStyles.mainBackground}>
          <PrimaryButton text='Registrar' onPress={onRegister} />
        </Layout>
        <Spacer height={50} />
        <Footer text='¿Ya tienes cuenta?' linkText='Ingresa' onPress={() => { navigation.reset({ index: 0, routes: [ {name: 'LoginScreen' }]}); }} />
      </ScrollView>
    </Layout>
  );
};
