import { Layout } from '@ui-kitten/components';
import { Vehicle } from '../../../../../core/entities';
import { VehiclesList } from '../../VehiclesList';
import { globalStyles } from '../../../../styles/global.styles';

export const VehiclesSearchList = ({ vehicles }: { vehicles: Vehicle[]; }) => {
  return (
    <Layout style={globalStyles.searchListContainer}>
      <VehiclesList vehicles={vehicles} />
    </Layout>
  );
};
