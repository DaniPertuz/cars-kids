import { useEffect, useState } from 'react';
import { Card, Layout, Modal } from '@ui-kitten/components';

import { Headline, PrimaryButton } from '../../ui';
import { useProfileUserImage, useUserInfo } from '../../../hooks';
import { ProfileUserImageModalButtons } from './ProfileUserImageModalButtons';
import { ProfileUserImage } from './ProfileUserImage';

import { globalStyles } from '../../../styles/global.styles';

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
          <ProfileUserImage profileImagePath={profileImagePath} />
          <ProfileUserImageModalButtons selectPicture={selectPicture} takePicture={takePicture} />
          <PrimaryButton disabled={loading} text={'Actualizar'} onPress={onSubmit} />
        </Layout>
      </Card>
    </Modal>
  );
};
