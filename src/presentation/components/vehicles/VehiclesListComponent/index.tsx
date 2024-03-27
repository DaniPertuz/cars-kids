import { Layout } from '@ui-kitten/components';
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
    <Layout style={{ ...globalStyles.mainBackground, marginHorizontal: 20, paddingBottom: bottom + 150 }}>
      {!display
        ?
        <LoadingScreen />
        :
        <VehiclesList vehiclesData={vehiclesData} />
      }
    </Layout>
  );
};
