import { Layout } from '@ui-kitten/components';
import { IVehicle } from '../../../../infrastructure/interfaces';
import { DeleteButton, EditButton } from '../../ui';
import { styles } from './styles';

export const VehicleActions = ({ vehicle }: { vehicle: IVehicle; }) => {
  return (
    <Layout style={styles.container}>
      <EditButton iconSize={25} vehicle={vehicle} />
      <DeleteButton iconSize={25} vehicle={vehicle} />
    </Layout>
  );
};
