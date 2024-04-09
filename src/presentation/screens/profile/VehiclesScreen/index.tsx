import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';

import { LoadingScreen } from '../../LoadingScreen';
import { Back, ListPagination, Search, TitleHeader, TotalListMessage } from '../../../components/ui';
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
    <Layout style={globalStyles.container}>
      {!vehiclesData
        ?
        <LoadingScreen />
        :
        <>
          <Layout style={{ paddingTop: height * 0.042, ...globalStyles.mainLayout }}>
            <Back top={top} />
            <TitleHeader text='Vehículos' />
            <Search top={top} onPress={() => navigation.navigate('SearchScreen', { entity: 'vehicles' })} />
            <VehicleListComponent bottom={bottom} display={display} vehiclesData={vehiclesData} />
          </Layout>
          {vehiclesData.total !== 0 &&
            <TotalListMessage bottom={bottom} item='vehículo' total={vehiclesData.total} />
          }
          {vehiclesData.total !== 0 &&
            <ListPagination<VehiclesResponse> bottom={bottom} data={vehiclesData} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
          }
          <VehicleAddButton top={top} />
        </>
      }
    </Layout>
  );
};
