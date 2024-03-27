import { Layout, Text } from '@ui-kitten/components';
import { IVehicle } from '../../../../infrastructure/interfaces';
import { styles } from './styles';

interface Props {
  item: IVehicle;
}

export const VehicleTitle = ({ item }: Props) => {
  return (
    <Layout style={styles.itemBackground}>
      <Text category='s1'>{item.nickname}</Text>
    </Layout>
  );
};
