import { Image } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { styles } from './styles';

export const BackgroundImage = ({ customHeight }: { customHeight: number; }) => {
  return (
    <Layout style={{...styles.initialBackground, height: `${customHeight}%` }}>
      <Image source={require('../../../../assets/carkids-removebg.png')} style={styles.initialBackgroundImage} />
    </Layout>
  );
};
