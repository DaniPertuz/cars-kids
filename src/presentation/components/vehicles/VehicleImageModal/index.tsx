import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Card, Layout, Modal } from '@ui-kitten/components';
import { Vehicle } from '../../../../core/entities';
import { useCustomTheme, useVehicleImage } from '../../../hooks';
import { EntryModalTitle, PrimaryButton } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';
import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  vehicle: Vehicle;
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const VehicleImageModal = ({ vehicle, visible, setVisible }: Props) => {
  const [displayThumb, setDisplayThumb] = useState(false);
  const { background } = useCustomTheme();
  const { loading, vehiclePicture, setVehiclePicture, selectPicture, takePicture, onSubmit } = useVehicleImage({ vehicle, setVisible });

  useEffect(() => {
    const hasVehicleAssets = vehiclePicture?.assets !== undefined;
    if (vehicle?.img?.length! > 0) {
      setDisplayThumb(false);
    } else if (visible) {
      setDisplayThumb(!hasVehicleAssets);
    } else {
      setDisplayThumb(hasVehicleAssets);
      setVehiclePicture(undefined);
    }
  }, [visible, vehiclePicture]);

  const vehicleImagePath = (displayThumb || vehicle?.img?.length! === 0)
    ? require('../../../../assets/logo2.png')
    : { uri: (vehiclePicture ? vehiclePicture.assets?.[0]?.uri : vehicle.img) };

  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={() => setVisible(false)}>
      <Card style={background}>
        <Layout style={globalStyles.modalContainer}>
          <EntryModalTitle title={`Imagen de ${vehicle.nickname}`} onPress={() => setVisible(false)} />
          <Layout style={{ ...globalStyles.alignJustifyCenter, ...background }}>
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
