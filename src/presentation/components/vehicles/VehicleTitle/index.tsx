import { Layout } from '@ui-kitten/components';
import { Callout } from '../../ui';
import { Vehicle } from '../../../../core/entities';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  vehicle: Vehicle;
}

export const VehicleTitle = ({ vehicle }: Props) => {
  return (
    <Layout style={globalStyles.platinumBackground}>
      <Callout text={vehicle.nickname} />
    </Layout>
  );
};
