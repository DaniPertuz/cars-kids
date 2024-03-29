import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { BackButtonContainer } from '../../../components/ui';
import { TotalVehiclesMessage } from '../../../components/vehicles/TotalVehiclesMessage';
import { VehicleListComponent } from '../../../components/vehicles/VehiclesListComponent';
import { VehiclesListPagination } from '../../../components/vehicles/VehiclesListPagination';
import { VehicleAddButton } from '../../../components/vehicles/VehicleAddButton';
import { VehicleTitleHeader } from '../../../components/vehicles/VehicleTitleHeader';
import { useVehiclesData } from '../../../hooks';

import { globalStyles } from '../../../styles/global.styles';

export const VehiclesScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { display, vehiclesData, fetchNextPage, fetchPrevPage, getData } = useVehiclesData();

  useEffect(() => {
    getData();
  }, [vehiclesData]);

  return (
    <Layout style={globalStyles.container}>
      <Layout style={{ paddingTop: height * 0.042, ...globalStyles.mainLayout }}>
        <BackButtonContainer top={top} />
        <VehicleTitleHeader />
        <VehicleListComponent bottom={bottom} display={display} vehiclesData={vehiclesData} />
      </Layout>
      {vehiclesData.total !== 0 &&
        <TotalVehiclesMessage bottom={bottom} total={vehiclesData.total} />
      }
      {vehiclesData.total !== 0 &&
        <VehiclesListPagination bottom={bottom} vehiclesData={vehiclesData} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
      }
      <VehicleAddButton top={top} />
    </Layout>
  );
};
