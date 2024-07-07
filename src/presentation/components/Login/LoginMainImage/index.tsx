import { Layout } from '@ui-kitten/components';
import { Image } from 'react-native';
import { useCustomTheme } from '../../../hooks';
import { authStyles } from '../../../styles/auth/styles';

export const LoginMainImage = () => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[authStyles.imageContainer, background]}>
      <Image source={require('../../../../assets/carkids-removebg.png')} style={[authStyles.mainImage, background]} />
    </Layout>
  );
};
