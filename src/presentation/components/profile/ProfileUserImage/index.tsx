import { useState } from 'react';
import { Image } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { ProfileEditUserImageButton } from '../ProfileEditUserImageButton';
import { ProfileUserImageModal } from '../ProfileUserImageModal';
import { useUserInfo } from '../../../hooks';

import { styles } from './styles';

export const ProfileUserImage = ({ height }: { height: number; }) => {
  const [visible, setVisible] = useState(false);
  const { user } = useUserInfo();

  return (
    <Layout style={styles.imageContainer}>
      <Image style={styles.image} source={user?.img ? { uri: user.img } : require('../../../../assets/logo2.png')} />
      <Layout style={{ ...styles.editImageIconContainer, top: height * 0.13 }}>
        <ProfileEditUserImageButton onPress={() => setVisible(true)} />
      </Layout>
      <ProfileUserImageModal visible={visible} setVisible={setVisible} />
    </Layout>
  );
};
