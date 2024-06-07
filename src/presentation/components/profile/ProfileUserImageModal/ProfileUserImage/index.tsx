import { Layout } from '@ui-kitten/components';
import { Image } from 'react-native';
import { globalStyles } from '../../../../styles/global.styles';
import { styles } from '../styles';

export const ProfileUserImage = ({ profileImagePath }: { profileImagePath: any; }) => {
  return (
    <Layout style={globalStyles.alignJustifyCenter}>
      <Image style={styles.profileImage} source={profileImagePath} />
    </Layout>
  );
};
