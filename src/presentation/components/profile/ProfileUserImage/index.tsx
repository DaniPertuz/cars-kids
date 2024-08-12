import { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { useCustomTheme, useUserInfo } from '../../../hooks';
import { ProfileUserImageModal } from '../ProfileUserImageModal';

import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

export const ProfileUserImage = () => {
  const [visible, setVisible] = useState(false);
  const { user } = useUserInfo();
  const { isDarkMode, defaultBackgroundColor } = useCustomTheme();

  return (
    <Layout style={[styles.imageContainer, { backgroundColor: isDarkMode ? defaultBackgroundColor : globalColors.background }]}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => setVisible(true)}>
        <Image style={styles.image} source={user?.img ? { uri: user.img } : require('../../../../assets/logo2.png')} />
      </TouchableOpacity>
      <ProfileUserImageModal visible={visible} setVisible={setVisible} />
    </Layout>
  );
};
