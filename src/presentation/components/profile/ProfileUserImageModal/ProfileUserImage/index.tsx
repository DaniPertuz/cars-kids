import { Layout } from '@ui-kitten/components';
import { Image, StyleSheet } from 'react-native';
import { globalStyles } from '../../../../styles/global.styles';

export const ProfileUserImage = ({ profileImagePath }: { profileImagePath: any; }) => {
  return (
    <Layout style={{ ...globalStyles.alignJustifyCenter, ...globalStyles.mainBackground }}>
      <Image style={styles.profileImage} source={profileImagePath} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 50,
    height: 320,
    width: 320
  }
});
