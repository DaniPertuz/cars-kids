import { Image } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { styles } from './styles';

export const BackgroundImage = ({ customHeight }: { customHeight: number; }) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[{ ...styles.initialBackground, height: `${customHeight}%` }, background]}>
      <Image source={require('../../../../assets/carkids-removebg.png')} style={styles.initialBackgroundImage} />
    </Layout>
  );
};
