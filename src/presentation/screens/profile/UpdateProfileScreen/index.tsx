import { useState } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { DefaultInput, EmailInput, PasswordInput } from '../../../components/forms';
import { InputContainer } from '../../../components/profile';
import { Caption, CustomDivider, DataLayout, MainLayout, PrimaryButton, Spacer, TopNavigation } from '../../../components/ui';
import { useCustomTheme, useResetProfile } from '../../../hooks';

import { styles } from './styles';

export const UpdateProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const { background } = useCustomTheme();
  const { resetForm, setResetForm, onUpdateProfile } = useResetProfile();

  const onSubmit = async () => {
    setLoading(true);
    await onUpdateProfile();
    setLoading(false);
  };

  return (
    <MainLayout>
      <DataLayout paddingTop={Platform.OS === 'ios' ? top + 0 : top + 20}>
        <TopNavigation top={top} title='Actualizar perfil' />
        <CustomDivider />
      </DataLayout>
      <Spacer height={20} />
      <Layout style={[{ ...styles.container }, background]}>
        <InputContainer>
          <Caption text='Nombre' />
          <DefaultInput placeholder='Nombre' value={resetForm.name} onChangeText={(name: string) => setResetForm({ ...resetForm, name })} />
        </InputContainer>
        <InputContainer>
          <Caption text='Email' />
          <EmailInput placeholder='Email' value={resetForm.email} onChangeText={(email: string) => setResetForm({ ...resetForm, email })} />
        </InputContainer>
        <InputContainer>
          <Caption text='Contraseña' />
          <PasswordInput placeholder='Contraseña' value={resetForm.password} onChangeText={(password: string) => setResetForm({ ...resetForm, password })} />
        </InputContainer>
        <InputContainer>
          <Caption text='Repetir contraseña' />
          <PasswordInput placeholder='Repetir contraseña' value={resetForm.confirmPassword} onChangeText={(confirmPassword: string) => setResetForm({ ...resetForm, confirmPassword })} />
        </InputContainer>
        <PrimaryButton disabled={loading} text='Actualizar' onPress={onSubmit} />
      </Layout>
    </MainLayout>
  );
};
