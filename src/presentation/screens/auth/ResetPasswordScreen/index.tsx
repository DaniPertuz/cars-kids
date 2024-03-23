import { useState } from 'react';
import { Image, ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';
import Snackbar from 'react-native-snackbar';

import { EmailInput, PasswordInput } from '../../../components/forms';
import { Back, Footnote, Headline, PrimaryButton, Spacer } from '../../../components/ui';
import { useEmptyFieldValidation } from '../../../hooks/useEmptyFieldValidation';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { useAuthStore } from '../../../store/auth/useAuthStore';

import { authStyles } from '../../../styles/auth/styles';
import { globalStyles } from '../../../styles/global.styles';

interface Props extends StackScreenProps<RootStackParams, 'ResetPasswordScreen'> { }

export const ResetPasswordScreen = ({ navigation }: Props) => {
  const { top } = useSafeAreaInsets();
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
      <Layout style={{ ...globalStyles.backButtonContainer, marginTop: top }}>
        <Back />
      </Layout>
      <ScrollView style={globalStyles.mainMargin}>
        <Layout style={{ paddingTop: height * 0.1, ...globalStyles.mainLayout }}>
          <Layout style={authStyles.imageContainer}>
            <Image source={require('../../../../assets/carkids-removebg.png')} style={authStyles.mainImage} />
          </Layout>
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
        <Spacer height={20} />
        <Layout style={globalStyles.mainBackground}>
          <PrimaryButton text='Restablecer' onPress={onUpdatePassword} />
        </Layout>
      </ScrollView>
    </Layout>
  );
};
