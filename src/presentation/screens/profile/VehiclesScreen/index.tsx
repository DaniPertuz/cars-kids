import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Divider } from '@ui-kitten/components';

import { LoadingScreen } from '../../LoadingScreen';
import { DataLayout, ListPagination, MainLayout, Search, TopNavigation, TotalListMessage } from '../../../components/ui';
import { VehicleListComponent } from '../../../components/vehicles/VehiclesListComponent';
import { VehicleAddButton } from '../../../components/vehicles/VehicleAddButton';
import { useVehiclesData } from '../../../hooks';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { VehiclesResponse } from '../../../../infrastructure/interfaces';

import { globalStyles } from '../../../styles/global.styles';

export const VehiclesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
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
            <TopNavigation top={top} title='Vehículos' />
            <Search top={top} onPress={() => navigation.navigate('SearchScreen', { entity: 'vehicles' })} />
            <Divider style={globalStyles.divider} />
            <VehicleListComponent bottom={bottom} display={display} vehiclesData={vehiclesData} />
          </DataLayout>
          {vehiclesData.total !== 0 &&
            <>
              <TotalListMessage bottom={bottom} item='vehículo' total={vehiclesData.total} />
              <ListPagination<VehiclesResponse> bottom={bottom} data={vehiclesData} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
            </>
          }
          <VehicleAddButton top={top} />
        </>
      }
    </MainLayout>
  );
};
