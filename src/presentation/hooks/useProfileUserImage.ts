import { useState } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';

import { useCloudinaryOperation, useUserInfo } from './';
import { ImagePickerAdapter } from '../../config/adapters/image-picker.adapter';
import { updateUserImage } from '../../actions/users';

export const useProfileUserImage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<ImagePickerResponse>();

  const { user } = useUserInfo();
  const { handleUpdateCloudinaryPic } = useCloudinaryOperation();

  const selectPicture = async () => {
    const picture = await ImagePickerAdapter.getPicturesFromLibrary();

    if (!picture || !picture.assets) return;

    setProfilePicture(picture);
  };

  const takePicture = async () => {
    const picture = await ImagePickerAdapter.takePicture();

    if (!picture || !picture.assets) return;

    setProfilePicture(picture);
  };

  const onSubmit = async () => {
    setLoading(true);

    if (!profilePicture) {
      setLoading(false);
      Snackbar.show({ text: 'No se pudo subir la imagen', duration: Snackbar.LENGTH_SHORT });
      return;
    }

    const img = await handleUpdateCloudinaryPic(profilePicture);

    const resp = await updateUserImage(user?.email!, img);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    Snackbar.show({ text: 'Foto actualizada', duration: Snackbar.LENGTH_SHORT });
    setLoading(false);
  };

  return {
    loading,
    profilePicture,
    setProfilePicture,
    selectPicture,
    takePicture,
    onSubmit
  };
};
