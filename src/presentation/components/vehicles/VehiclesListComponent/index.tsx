import { Layout } from '@ui-kitten/components';
import { VehiclesResponse } from '../../../../infrastructure/interfaces';
import { useCustomTheme } from '../../../hooks';
import { EmptyListMessage, SpinnerContainer } from '../../ui';
import { VehiclesList } from '../VehiclesList';

interface Props {
  display: boolean;
  vehiclesData: VehiclesResponse;
}

export const VehicleListComponent = ({ display, vehiclesData }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[{ marginHorizontal: 20, height: '87.5%' }, background]}>
      {(!display)
        ?
        <SpinnerContainer />
        :
        (vehiclesData.total === 0)
          ?
          <EmptyListMessage heightBy={0.7} text='No hay vehículos registrados' />
          :
          <VehiclesList vehicles={vehiclesData.vehicles} />
      }
    </Layout>
  );
};
