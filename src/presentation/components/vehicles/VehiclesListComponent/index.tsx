import { Layout } from '@ui-kitten/components';
import { EmptyListMessage } from '../../ui';
import { VehiclesList } from '../VehiclesList';
import { VehiclesResponse } from '../../../../infrastructure/interfaces';
import { LoadingScreen } from '../../../screens/LoadingScreen';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  bottom: number;
  display: boolean;
  vehiclesData: VehiclesResponse;
}

export const VehicleListComponent = ({ bottom, display, vehiclesData }: Props) => {
  return (
    <Layout style={{ ...globalStyles.mainBackground, marginHorizontal: 20, paddingBottom: bottom + 200 }}>
      {(!display)
        ?
        <LoadingScreen />
        :
        (vehiclesData.total === 0)
          ?
          <EmptyListMessage text='No hay vehículos registrados' />
          :
          <VehiclesList vehicles={vehiclesData.vehicles} />
      }
    </Layout>
  );
};
