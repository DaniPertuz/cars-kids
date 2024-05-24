import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoadingScreen } from '../../LoadingScreen';
import { CustomDivider, DataLayout, ListPagination, MainLayout, TopNavigation, TotalListMessage } from '../../../components/ui';
import { VehicleListComponent } from '../../../components/vehicles/VehiclesListComponent';
import { VehicleAddButton } from '../../../components/vehicles/VehicleAddButton';
import { useVehiclesData } from '../../../hooks';
import { VehiclesResponse } from '../../../../infrastructure/interfaces';

export const VehiclesScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { display, vehiclesData, fetchNextPage, fetchPrevPage, getData } = useVehiclesData();

  useEffect(() => {
    getData();
  }, [vehiclesData]);

  return (
    <MainLayout>
      {!vehiclesData
        ?
        <LoadingScreen />
        :
        <>
          <DataLayout paddingTop={height * 0.042}>
            <TopNavigation top={top} title='Vehículos' renderSearchButton />
            <CustomDivider />
            <VehicleListComponent bottom={bottom} display={display} vehiclesData={vehiclesData} />
          </DataLayout>
          {vehiclesData.total !== 0 &&
            <>
              <TotalListMessage bottom={bottom} item='vehículo' total={vehiclesData.total} />
              <ListPagination<VehiclesResponse> bottom={bottom} data={vehiclesData} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
              <VehicleAddButton top={top} />
            </>
          }
        </>
      }
    </MainLayout>
  );
};
