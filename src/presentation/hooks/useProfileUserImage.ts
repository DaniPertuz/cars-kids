import { useState } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useCloudinaryOperation, useUserInfo } from './';
import { ImagePickerAdapter } from '../../config/adapters/image-picker.adapter';
import { SnackbarAdapter } from '../../config/adapters/snackbar.adapter';
import { useAuthStore } from '../store/auth/useAuthStore';
import { RootStackParams } from '../navigation/MainNavigator';

export const useProfileUserImage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<ImagePickerResponse>();

  const { user } = useUserInfo();
  const { handleUpdateCloudinaryPic } = useCloudinaryOperation();
  const updateUserImage = useAuthStore(state => state.updateImage);

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
      SnackbarAdapter.showSnackbar('No se pudo subir la imagen');
      return;
    }

    const img = await handleUpdateCloudinaryPic(profilePicture, true, user?.img);

    const resp = await updateUserImage(user?.email!, img);

    if (resp.error) {
      setLoading(false);
      SnackbarAdapter.showSnackbar(resp.error);
      return;
    }
    
    navigation.push('BottomNavigator', { screen: 'ProfileScreen' });
    SnackbarAdapter.showSnackbar('Foto actualizada');
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
