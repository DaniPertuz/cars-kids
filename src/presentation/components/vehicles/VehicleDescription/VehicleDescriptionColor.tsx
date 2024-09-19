import { Layout } from '@ui-kitten/components';
import { Vehicle } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';
import { VehicleColor } from '../VehicleColor';

export const VehicleDescriptionColor = ({ vehicle }: { vehicle: Vehicle; }) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  return (
    <Layout style={{ ...platinumItemBackgroundColor, flex: 1, alignItems: 'center' }}>
      <VehicleColor vehicle={vehicle} />
    </Layout>
  );
};
