import { Layout, List } from '@ui-kitten/components';
import { VehiclesListItem } from '../VehiclesListItem';
import { Vehicle } from '../../../../core/entities';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  vehicles: Vehicle[];
}

export const VehiclesList = ({ vehicles }: Props) => {
  return (
    <List
      data={vehicles}
      showsVerticalScrollIndicator={false}
      style={globalStyles.mainBackground}
      renderItem={({ item }) => (
        <Layout style={globalStyles.mainBackground}>
          <VehiclesListItem vehicle={item} />
        </Layout>
      )}
    />
  );
};
