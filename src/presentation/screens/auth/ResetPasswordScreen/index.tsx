import { useState } from 'react';
import { Image, ScrollView, useWindowDimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { Layout, Text } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';

import { EmailInput, PasswordInput } from '../../../components/forms';
import { Back, PrimaryButton, Spacer } from '../../../components/ui';
import { useEmptyFieldValidation } from '../../../hooks/useEmptyFieldValidation';
import { useAuthStore } from '../../../store/auth/useAuthStore';

import { authStyles } from '../../../styles/auth/styles';
import { globalStyles } from '../../../styles/global.styles';

interface Props extends StackScreenProps<RootStackParams, 'ResetPasswordScreen'> { }

export const ResetPasswordScreen = ({ navigation }: Props) => {
  const { height } = useWindowDimensions();
  const { updatePassword } = useAuthStore();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { email, password, confirmPassword } = form;

  const { isEmpty: isEmailEmpty, checkEmptyFields: checkEmailEmpty } = useEmptyFieldValidation();
  const { isEmpty: isPasswordEmpty, checkEmptyFields: checkPasswordEmpty } = useEmptyFieldValidation();
  const { isEmpty: isConfirmedPasswordEmpty, checkEmptyFields: checkConfirmedPasswordEmpty } = useEmptyFieldValidation();

  const onUpdatePassword = async () => {
    checkEmailEmpty(email);
    checkPasswordEmpty(password);
    checkConfirmedPasswordEmpty(confirmPassword);

    if (!isEmailEmpty && !isPasswordEmpty && !isConfirmedPasswordEmpty) {
      if (password !== confirmPassword) {
        Snackbar.show({ text: 'Contraseñas no coinciden', duration: Snackbar.LENGTH_SHORT });
        return;
      }

      const resp = await updatePassword(email, password);

      if (resp.error) {
        Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
        return;
      }

      Snackbar.show({ text: 'Contraseña restablecida', duration: Snackbar.LENGTH_SHORT });
      navigation.replace('LoginScreen');
    }
  };

  return (
    <Layout style={authStyles.container}>
      <Layout style={authStyles.backButtonContainer}>
        <Back />
      </Layout>
      <ScrollView style={authStyles.mainMargin}>
        <Layout style={{ paddingTop: height * 0.1, ...authStyles.mainLayout }}>
          <Layout style={authStyles.imageContainer}>
            <Image
              source={require('../../../../assets/carkids-removebg.png')}
              style={authStyles.mainImage}
            />
          </Layout>
          <Layout style={authStyles.welcomeTextContainer}>
            <Text category='h3' style={globalStyles.colorOnyx}>Restablecer contraseña</Text>
          </Layout>
          <Text category='p1' style={globalStyles.colorSpanishGray}>Ingresa email y nueva contraseña</Text>
        </Layout>
        <Layout style={authStyles.formContainer}>
          <EmailInput placeholder='Email' value={email} onChangeText={(email: string) => setForm({ ...form, email })} />
          <PasswordInput placeholder={'Ingresa contraseña'} value={password} onChangeText={(password: string) => setForm({ ...form, password })} />
          <PasswordInput placeholder={'Repite contraseña'} value={confirmPassword} onChangeText={(confirmPassword: string) => setForm({ ...form, confirmPassword })} />
        </Layout>
        <Spacer height={20} />
        <Layout style={globalStyles.mainBackground}>
          <PrimaryButton text='Restablecer' onPress={onUpdatePassword} />
        </Layout>
      </ScrollView>
    </Layout>
  );
};
