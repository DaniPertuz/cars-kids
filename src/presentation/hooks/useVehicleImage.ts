import { useState } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';

import { useCloudinaryOperation, useUserInfo } from './';
import { ImagePickerAdapter } from '../../config/adapters/image-picker.adapter';
import { Vehicle } from '../../core/entities';
import * as VehicleUseCases from '../../core/use-cases/vehicles';

interface Props {
  vehicle: Vehicle;
  setVisible: (value: boolean) => void;
}

export const useVehicleImage = ({ vehicle, setVisible }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [vehiclePicture, setVehiclePicture] = useState<ImagePickerResponse>();

  const { handleUpdateCloudinaryPic } = useCloudinaryOperation();

  const selectPicture = async () => {
    const picture = await ImagePickerAdapter.getPicturesFromLibrary();

    if (!picture || !picture.assets) return;

    setVehiclePicture(picture);
  };

  const takePicture = async () => {
    const picture = await ImagePickerAdapter.takePicture();

    if (!picture || !picture.assets) return;

    setVehiclePicture(picture);
  };

  const onSubmit = async () => {
    setLoading(true);

    if (!vehiclePicture) {
      setLoading(false);
      Snackbar.show({ text: 'No se pudo subir la imagen', duration: Snackbar.LENGTH_SHORT });
      return;
    }

    const cloudinaryImg = await handleUpdateCloudinaryPic(vehiclePicture, true, vehicle.img);

    const resp = await VehicleUseCases.updateVehicleUseCase(vehicle.nickname, { img: cloudinaryImg } as Vehicle);

    if (resp.error) {
      setLoading(false);
      Snackbar.show({ text: resp.error, duration: Snackbar.LENGTH_SHORT });
      return;
    }

    Snackbar.show({ text: 'Foto de vehículo actualizada', duration: Snackbar.LENGTH_SHORT });
    setLoading(false);
    setVisible(false);
  };

  return {
    loading,
    vehiclePicture,
    setVehiclePicture,
    selectPicture,
    takePicture,
    onSubmit
  };
};
