import { Layout } from '@ui-kitten/components';
import { Image } from 'react-native';
import { authStyles } from '../../../styles/auth/styles';

export const LoginMainImage = () => {
  return (
    <Layout style={authStyles.imageContainer}>
      <Image source={require('../../../../assets/carkids-removebg.png')} style={authStyles.mainImage} />
    </Layout>
  );
};
