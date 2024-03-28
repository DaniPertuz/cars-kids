import { Layout } from '@ui-kitten/components';
import { IVehicle } from '../../../../infrastructure/interfaces';
import { Callout } from '../../ui';
import { styles } from './styles';

interface Props {
  item: IVehicle;
}

export const VehicleTitle = ({ item }: Props) => {
  return (
    <Layout style={styles.itemBackground}>
      <Callout text={item.nickname} />
    </Layout>
  );
};
