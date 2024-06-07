import { Image } from 'react-native';
import { Card, Layout, Modal } from '@ui-kitten/components';
import { Headline, PrimaryButton } from '../../ui';
import { useProfileUserImage, useUserInfo } from '../../../hooks';
import { globalStyles } from '../../../styles/global.styles';
import { globalColors } from '../../../theme/globalColors';
import { useEffect, useState } from 'react';
import { styles } from './styles';

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const ProfileUserImageModal = ({ visible, setVisible }: Props) => {
  const { user } = useUserInfo();
  const [displayThumb, setDisplayThumb] = useState(false);
  const { loading, profilePicture, setProfilePicture, selectPicture, takePicture, onSubmit } = useProfileUserImage();

  useEffect(() => {
    const hasProfileAssets = profilePicture?.assets !== undefined;
    if (user?.img?.length! > 0) {
      setDisplayThumb(false);
    } else if (visible) {
      setDisplayThumb(!hasProfileAssets);
    } else {
      setDisplayThumb(hasProfileAssets);
      setProfilePicture(undefined);
    }
  }, [visible, profilePicture, user]);

  const profileImagePath = displayThumb
    ? require('../../../../assets/logo2.png')
    : { uri: profilePicture ? profilePicture?.assets?.[0]?.uri : user?.img };

  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <Card style={globalStyles.mainBackground}>
        <Layout style={globalStyles.modalContainer}>
          <Headline text={'Imagen'} textColor={globalStyles.colorOnyx} />
          <Layout style={globalStyles.alignJustifyCenter}>
            <Image style={styles.profileImage} source={profileImagePath} />
          </Layout>
          <Layout style={styles.buttonsContainer}>
            <PrimaryButton disabled={false} text={'Foto'} color={globalColors.warning} onPress={takePicture} />
            <PrimaryButton disabled={false} text={'Galería'} color={globalColors.success} onPress={selectPicture} />
          </Layout>
          <PrimaryButton disabled={loading} text={'Actualizar'} onPress={onSubmit} />
        </Layout>
      </Card>
    </Modal>
  );
};
