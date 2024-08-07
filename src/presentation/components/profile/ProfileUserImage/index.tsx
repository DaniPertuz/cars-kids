import { useState } from 'react';
import { Image } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { ProfileEditUserImageButton } from '../ProfileEditUserImageButton';
import { ProfileUserImageModal } from '../ProfileUserImageModal';
import { useCustomTheme, useUserInfo } from '../../../hooks';

import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

export const ProfileUserImage = () => {
  const [visible, setVisible] = useState(false);
  const { user } = useUserInfo();
  const { isDarkMode, defaultBackgroundColor } = useCustomTheme();

  return (
    <Layout style={[styles.imageContainer, { backgroundColor: isDarkMode ? defaultBackgroundColor : globalColors.background }]}>
      <Image style={styles.image} source={user?.img ? { uri: user.img } : require('../../../../assets/logo2.png')} />
      <Layout style={styles.editImageIconContainer}>
        <ProfileEditUserImageButton onPress={() => setVisible(true)} />
      </Layout>
      <ProfileUserImageModal visible={visible} setVisible={setVisible} />
    </Layout>
  );
};
