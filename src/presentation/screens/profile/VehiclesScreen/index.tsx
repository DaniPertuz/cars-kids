import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';

import { Back, Search, TitleHeader } from '../../../components/ui';
import { TotalVehiclesMessage } from '../../../components/vehicles/TotalVehiclesMessage';
import { VehicleListComponent } from '../../../components/vehicles/VehiclesListComponent';
import { VehiclesListPagination } from '../../../components/vehicles/VehiclesListPagination';
import { VehicleAddButton } from '../../../components/vehicles/VehicleAddButton';
import { useVehiclesData } from '../../../hooks';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { LoadingScreen } from '../../LoadingScreen';

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
            <TotalVehiclesMessage bottom={bottom} total={vehiclesData.total} />
          }
          {vehiclesData.total !== 0 &&
            <VehiclesListPagination bottom={bottom} vehiclesData={vehiclesData} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
          }
          <VehicleAddButton top={top} />
        </>
      }
    </Layout>
  );
};
