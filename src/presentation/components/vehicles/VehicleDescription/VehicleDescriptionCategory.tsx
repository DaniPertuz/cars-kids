import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { Vehicle } from '../../../../core/entities';
import { Caption } from '../../ui';

export const VehicleDescriptionCategory = ({ vehicle }: { vehicle: Vehicle; }) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  return (
    <Layout style={{ ...platinumItemBackgroundColor, flex: 2, }}>
      <Caption text={(vehicle.category === 'car' ? 'Carro' : 'Moto')} />
    </Layout>
  );
};
