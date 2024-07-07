import { Layout } from '@ui-kitten/components';
import { Callout } from '../../ui';
import { Vehicle } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';
import { globalColors } from '../../../theme/globalColors';

interface Props {
  vehicle: Vehicle;
}

export const VehicleTitle = ({ vehicle }: Props) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  return (
    <Layout style={platinumItemBackgroundColor}>
      <Callout text={vehicle.nickname} />
    </Layout>
  );
};
