import { Layout, List } from '@ui-kitten/components';
import { VehiclesListItem } from '../VehiclesListItem';
import { Vehicle } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';

interface Props {
  vehicles: Vehicle[];
}

export const VehiclesList = ({ vehicles }: Props) => {
  const { background } = useCustomTheme();
  return (
    <List
      data={vehicles}
      showsVerticalScrollIndicator={false}
      style={background}
      renderItem={({ item }) => (
        <Layout style={background}>
          <VehiclesListItem vehicle={item} />
        </Layout>
      )}
    />
  );
};
