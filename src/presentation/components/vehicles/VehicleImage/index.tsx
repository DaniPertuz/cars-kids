import { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { VehicleImageModal } from '../VehicleImageModal';
import { Vehicle } from '../../../../core/entities';
import { styles } from './styles';

interface Props {
  vehicle: Vehicle;
}

export const VehicleImage = ({ vehicle }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity activeOpacity={1.0} onPress={() => setVisible(true)}>
        <Image
          source={vehicle.img ? { uri: vehicle.img } : require('../../../../assets/logo2.png')}
          style={styles.itemPic}
        />
      </TouchableOpacity>
      <VehicleImageModal vehicle={vehicle} visible={visible} setVisible={setVisible} />
    </>
  );
};
