import { Layout, List } from '@ui-kitten/components';
import { VehiclesListItem } from '../VehiclesListItem';
import { IVehicle } from '../../../../infrastructure/interfaces';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  vehicles: IVehicle[];
}

export const VehiclesList = ({ vehicles }: Props) => {
  return (
    <List
      data={vehicles}
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
