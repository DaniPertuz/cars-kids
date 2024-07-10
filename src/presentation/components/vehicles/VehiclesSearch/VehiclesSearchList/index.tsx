import { Layout } from '@ui-kitten/components';
import { Vehicle } from '../../../../../core/entities';
import { useCustomTheme } from '../../../../hooks';
import { VehiclesList } from '../../VehiclesList';
import { globalStyles } from '../../../../styles/global.styles';

export const VehiclesSearchList = ({ vehicles }: { vehicles: Vehicle[]; }) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[globalStyles.searchListContainer, background]}>
      <VehiclesList vehicles={vehicles} />
    </Layout>
  );
};
