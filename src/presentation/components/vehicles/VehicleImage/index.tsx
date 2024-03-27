import { Image } from 'react-native';
import { styles } from './styles';

interface Props {
  img?: string;
}

export const VehicleImage = ({ img }: Props) => {
  return (
    <Image
      source={img ? img : require('../../../../assets/logo2.png')}
      style={styles.itemPic}
    />
  );
};
