import { ScrollView } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { EmailInput, PasswordInput } from '../../../components/forms';
import { LoginButtonContainer, LoginHeaderContainer } from '../../../components/login';
import { MainLayout, TopNavigation } from '../../../components/ui';
import { useResetPasswordData } from '../../../hooks';

import { authStyles } from '../../../styles/auth/styles';
import { globalStyles } from '../../../styles/global.styles';

export const ResetPasswordScreen = () => {
  const {
    background,
    confirmPassword,
    done,
    email,
    resetForm,
    height,
    loading,
    password,
    top,
    onSubmit,
    setResetForm
  } = useResetPasswordData();

  return (
    <MainLayout>
      <TopNavigation top={top} />
      <ScrollView style={globalStyles.mainMargin} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
        <LoginHeaderContainer height={height} title={'Restablecer contraseña'} footnote={'Ingresa email y nueva contraseña'} />
        <Layout style={[authStyles.formContainer, background]}>
          <EmailInput placeholder='Email' value={done ? '' : email} onChangeText={(email: string) => setResetForm({ ...resetForm, email })} />
          <PasswordInput placeholder={'Ingresa contraseña'} value={done ? '' : password} onChangeText={(password: string) => setResetForm({ ...resetForm, password })} />
          <PasswordInput placeholder={'Repite contraseña'} value={done ? '' : confirmPassword} onChangeText={(confirmPassword: string) => setResetForm({ ...resetForm, confirmPassword })} />
        </Layout>
        <LoginButtonContainer disabled={loading} buttonText={'Restablecer'} onPress={onSubmit} />
      </ScrollView>
    </MainLayout>
  );
};
