import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { BackButtonContainer } from '../../../components/ui';
import { VehicleListComponent } from '../../../components/vehicles/VehiclesListComponent';
import { VehiclesListPagination } from '../../../components/vehicles/VehiclesListPagination';
import { VehicleAddButton } from '../../../components/vehicles/VehicleAddButton';
import { VehicleTitleHeader } from '../../../components/vehicles/VehicleTitleHeader';
import { useVehiclesData } from '../../../hooks';

import { globalStyles } from '../../../styles/global.styles';

export const VehiclesScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { display, vehiclesData, fetchNextPage, fetchPrevPage } = useVehiclesData();

  return (
    <Layout style={globalStyles.container}>
      <Layout style={{ paddingTop: height * 0.042, ...globalStyles.mainLayout }}>
        <BackButtonContainer top={top} />
        <VehicleTitleHeader />
        <VehicleListComponent bottom={bottom} display={display} vehiclesData={vehiclesData} />
      </Layout>
      <VehiclesListPagination bottom={bottom} vehiclesData={vehiclesData} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
      <VehicleAddButton top={top} />
    </Layout>
  );
};
