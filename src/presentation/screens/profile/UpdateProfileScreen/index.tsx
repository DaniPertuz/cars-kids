import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { DefaultInput, EmailInput, PasswordInput } from '../../../components/forms';
import { Caption, MainLayout, PrimaryButton, TopNavigation } from '../../../components/ui';
import { useResetProfile } from '../../../hooks';

import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

export const UpdateProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const { form, setForm, onUpdateProfile } = useResetProfile();

  const onSubmit = () => {
    setLoading(true);
    onUpdateProfile();
    setLoading(false);
  }

  return (
    <MainLayout paddingTop={top}>
      <TopNavigation top={top} title='Actualizar perfil' />
      <Layout style={{ ...styles.container, marginVertical: height * 0.03 }}>
        <Layout style={styles.inputContainer}>
          <Caption text='Nombre' textColor={globalStyles.colorOnyx} />
          <DefaultInput placeholder='Nombre' value={form.name} onChangeText={(name: string) => setForm({ ...form, name })} />
        </Layout>
        <Layout style={styles.inputContainer}>
          <Caption text='Email' textColor={globalStyles.colorOnyx} />
          <EmailInput placeholder='Email' value={form.email} onChangeText={(email: string) => setForm({ ...form, email })} />
        </Layout>
        <Layout style={styles.inputContainer}>
          <Caption text='Contraseña' textColor={globalStyles.colorOnyx} />
          <PasswordInput placeholder='Contraseña' value={form.password} onChangeText={(password: string) => setForm({ ...form, password })} />
        </Layout>
        <Layout style={styles.inputContainer}>
          <Caption text='Repetir contraseña' textColor={globalStyles.colorOnyx} />
          <PasswordInput placeholder='Repetir contraseña' value={form.confirmPassword} onChangeText={(confirmPassword: string) => setForm({ ...form, confirmPassword })} />
        </Layout>
        <PrimaryButton disabled={loading} text='Actualizar' onPress={onSubmit} />
      </Layout>
    </MainLayout>
  );
};
