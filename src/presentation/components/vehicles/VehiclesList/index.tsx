import { Layout, List } from '@ui-kitten/components';
import { VehiclesListItem } from '../VehiclesListItem';
import { VehiclesResponse } from '../../../../infrastructure/interfaces';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  vehiclesData: VehiclesResponse;
}

export const VehiclesList = ({ vehiclesData }: Props) => {
  return (
    <List
      data={vehiclesData.vehicles}
      showsVerticalScrollIndicator={false}
      style={globalStyles.mainBackground}
      renderItem={({ item }) => (
        <Layout style={globalStyles.mainBackground}>
          <VehiclesListItem item={item} />
        </Layout>
      )}
    />
  );
};
