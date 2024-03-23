import { Image } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { CustomIcon } from '../../ui';
import { styles } from './styles';

export const ProfileUserImage = ({ height }: { height: number; }) => {
  return (
    <Layout style={styles.imageContainer}>
      <Image style={styles.image} source={require('../../../../assets/logo2.png')} />
      <Layout style={{ ...styles.editImageIconContainer, top: height * 0.13 }}>
        <Layout style={styles.editImageIconBackground}>
          <CustomIcon name='edit-outline' size={styles.editImageIconSize} />
        </Layout>
      </Layout>
    </Layout>
  );
};
