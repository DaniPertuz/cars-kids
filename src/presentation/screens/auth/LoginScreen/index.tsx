import { Image, ScrollView, useWindowDimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Layout, Text } from '@ui-kitten/components';

import { EmailInput, PasswordInput } from '../../../components/forms';
import { PrimaryButton, Spacer } from '../../../components/ui';
import { Footer } from '../../../components/Login/footer';
import { RootStackParams } from '../../../navigation/MainNavigator';

import { authStyles } from '../../../styles/auth/styles';
import { globalStyles } from '../../../styles/global.styles';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { height } = useWindowDimensions();

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
            <Text category='h1' style={globalStyles.colorOnyx}>Bienvenido</Text>
          </Layout>
          <Text category='p1' style={globalStyles.colorSpanishGray}>Ingresa tus credenciales</Text>
        </Layout>
        <Layout style={authStyles.formContainer}>
          <EmailInput />
          <PasswordInput />
        </Layout>
        <Spacer height={20} />
        <Layout style={globalStyles.mainBackground}>
          <PrimaryButton text='Ingresar' onPress={() => { }} />
        </Layout>
        <Spacer height={50} />
        <Footer text='¿No tienes cuenta?' linkText='Crea una' onPress={() => { navigation.push('RegisterScreen') }} />
      </ScrollView>
    </Layout>
  );
};
