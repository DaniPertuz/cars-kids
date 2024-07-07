import { Layout } from '@ui-kitten/components';
import { Image, StyleSheet } from 'react-native';
import { useCustomTheme } from '../../../../hooks';
import { globalStyles } from '../../../../styles/global.styles';
import { globalColors } from '../../../../theme/globalColors';

export const ProfileUserImage = ({ profileImagePath }: { profileImagePath: any; }) => {
  const { isDarkMode, defaultBackgroundColor } = useCustomTheme();
  const background = { backgroundColor: isDarkMode ? defaultBackgroundColor : globalColors.background };
  return (
    <Layout style={[{ ...globalStyles.alignJustifyCenter }, background]}>
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
