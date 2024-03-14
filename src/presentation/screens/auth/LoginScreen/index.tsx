import { Image, ScrollView, useWindowDimensions } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import { EmailInput, PasswordInput } from '../../../components/forms';
import { PrimaryButton, Spacer } from '../../../components/ui';
import { Footer } from '../../../components/Login/footer';

import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

export const LoginScreen = () => {
  const { height } = useWindowDimensions();

  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.mainMargin}>
        <Layout style={{ paddingTop: height * 0.1, ...styles.mainLayout }}>
          <Layout style={styles.imageContainer}>
            <Image
              source={require('../../../../assets/carkids-removebg.png')}
              style={styles.mainImage}
            />
          </Layout>
          <Layout style={styles.welcomeTextContainer}>
            <Text category='h1' style={styles.primaryText}>Bienvenido</Text>
          </Layout>
          <Text category='p1' style={styles.secondaryText}>Ingresa tus credenciales</Text>
        </Layout>
        <Layout style={styles.formContainer}>
          <EmailInput />
          <PasswordInput />
        </Layout>
        <Spacer height={20} />
        <Layout style={globalStyles.mainBackground}>
          <PrimaryButton text='Ingresar' onPress={() => { }} />
        </Layout>
        <Spacer height={50} />
        <Footer text='¿No tienes cuenta?' linkText='Crea una' onPress={() => { }} />
      </ScrollView>
    </Layout>
  );
};
