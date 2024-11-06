import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout, Spinner } from '@ui-kitten/components';

import { useCustomTheme, useVehicleSearchData } from '../../../hooks';
import { DefaultInput } from '../../forms';
import { BackgroundImage, EmptyListMessage } from '../../ui';
import { VehiclesSearchList } from './VehiclesSearchList';

import { globalStyles } from '../../../styles/global.styles';

export const VehiclesSearch = () => {
  const { top } = useSafeAreaInsets();
  const { background } = useCustomTheme();
  const { debouncedValue, loading, search, vehicles, setSearch } = useVehicleSearchData();

  return (
    <Layout style={[{ ...globalStyles.searchContainer, marginTop: top + 20 }, background]}>
      <DefaultInput placeholder={'Buscar vehículos'} value={search} onChangeText={setSearch} />
      {!loading && debouncedValue.length < 2 &&
        <BackgroundImage customHeight={85} />
      }
      {(loading && debouncedValue.length > 2) &&
        <Spinner style={globalStyles.redBorder} />
      }
      {(vehicles.length === 0 && debouncedValue.length > 2) &&
        <EmptyListMessage heightBy={0.7} text={`No hay vehículos con nombre/apodo "${debouncedValue}"`} />
      }
      <VehiclesSearchList vehicles={vehicles} />
    </Layout>
  );
};
