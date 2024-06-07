import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Card, Layout, Modal } from '@ui-kitten/components';
import { HeaderFive, PrimaryButton } from '../../ui';
import { useVehicleImage } from '../../../hooks';
import { Vehicle } from '../../../../core/entities';
import { globalStyles } from '../../../styles/global.styles';
import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  vehicle: Vehicle
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const VehicleImageModal = ({ vehicle, visible, setVisible }: Props) => {
  const [displayThumb, setDisplayThumb] = useState(false);
  const { loading, vehiclePicture, setVehiclePicture, selectPicture, takePicture, onSubmit } = useVehicleImage({ vehicle, setVisible });

  useEffect(() => {
    const hasVehicleAssets = vehiclePicture?.assets !== undefined;
    if (vehicle.img) {
      setDisplayThumb(false);
    } else if (visible) {
      setDisplayThumb(!hasVehicleAssets);
    } else {
      setDisplayThumb(hasVehicleAssets);
      setVehiclePicture(undefined);
    }
  }, [visible, vehiclePicture]);

  const vehicleImagePath = displayThumb
    ? require('../../../../assets/logo2.png')
    : { uri: (vehiclePicture && vehiclePicture.assets && vehiclePicture.assets[0] && vehiclePicture.assets[0].uri && vehiclePicture.assets[0].uri.trim() !== '') ? vehiclePicture.assets[0].uri : (vehicle.img && vehicle.img.trim() !== '' ? vehicle.img : undefined) };

  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <Card style={globalStyles.mainBackground}>
        <Layout style={globalStyles.modalContainer}>
          <HeaderFive text={`Imagen de ${vehicle.nickname}`} />
          <Layout style={globalStyles.alignJustifyCenter}>
            <Image style={styles.vehicleImage} source={vehicleImagePath} />
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
