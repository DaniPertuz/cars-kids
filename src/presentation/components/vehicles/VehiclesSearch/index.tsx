import { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout, Spinner } from '@ui-kitten/components';

import { DefaultInput } from '../../forms';
import { useDebouncedValue } from '../../../hooks';
import { getVehicles } from '../../../../actions/vehicles';
import { IVehicle } from '../../../../infrastructure/interfaces';
import { EmptyVehiclesListMessage } from '../EmptyVehiclesListMessage';
import { VehiclesList } from '../VehiclesList';

import { globalStyles } from '../../../styles/global.styles';

export const VehiclesSearch = () => {
  const { top } = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState<number>(0);
  const [vehiclesList, setVehiclesList] = useState<IVehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebouncedValue(search);

  const getTotalVehicles = async () => {
    const resp = await getVehicles('vehicles');
    setTotal(resp.response?.total || 0);
  };

  const getVehiclesData = async (limit: number) => {
    const resp = await getVehicles(`vehicles?limit=${limit}`);
    setVehiclesList(resp.response?.vehicles || []);
  };

  const fetchData = async () => {
    setLoading(true);
    await getTotalVehicles();
    await getVehiclesData(total);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [total]);

  const vehicles = useMemo(() => {
    if (debouncedValue.length < 3) return [];

    return vehiclesList.filter(vehicle =>
      vehicle.nickname.toLocaleLowerCase().includes(debouncedValue.toLocaleLowerCase()),
    );
  }, [debouncedValue, vehiclesList]);

  return (
    <Layout style={{ ...styles.container, marginTop: top }}>
      <DefaultInput placeholder={'Buscar vehículos'} value={search} onChangeText={setSearch} />
      {(loading && debouncedValue.length > 2) &&
        <Spinner style={globalStyles.redBorder} />
      }
      {(vehicles.length === 0 && debouncedValue.length > 2) &&
        <EmptyVehiclesListMessage text={`No hay vehículos con nombre/apodo "${debouncedValue}"`} />
      }
      <Layout style={styles.fullWidth}>
        <VehiclesList vehicles={vehicles} />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 30,
    ...globalStyles.mainBackground,
  },
  fullWidth: {
    width: '100%'
  }
});
