import { Layout } from '@ui-kitten/components';
import { DeleteButton, EditButton } from '../../ui';
import { Vehicle } from '../../../../core/entities';
import { styles } from './styles';

export const VehicleActions = ({ vehicle }: { vehicle: Vehicle; }) => {
  return (
    <Layout style={styles.container}>
      <EditButton iconSize={25} vehicle={vehicle} />
      <DeleteButton iconSize={25} vehicle={vehicle} />
    </Layout>
  );
};
