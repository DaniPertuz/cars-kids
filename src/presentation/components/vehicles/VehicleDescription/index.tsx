import { Layout, Text } from '@ui-kitten/components';
import { styles } from './styles';
import { IVehicle } from '../../../../infrastructure/interfaces';

interface Props {
  item: IVehicle;
}

export const VehicleDescription = ({ item }: Props) => {
  return (
    <Layout style={styles.descriptionContainer}>
      <Text category='p2'>{(item.category === 'car' ? 'Carro' : 'Moto')}</Text>
      <Layout style={{ backgroundColor: item.color, ...styles.itemColor }} />
    </Layout>
  );
};
