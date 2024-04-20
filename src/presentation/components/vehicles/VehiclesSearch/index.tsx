import { useEffect, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout, Spinner } from '@ui-kitten/components';

import { DefaultInput } from '../../forms';
import { BackgroundImage, EmptyListMessage } from '../../ui';
import { useDebouncedValue } from '../../../hooks';
import { Vehicle } from '../../../../core/entities';
import { VehiclesList } from '../VehiclesList';
import * as VehicleUseCases from '../../../../core/use-cases/vehicles';

import { globalStyles } from '../../../styles/global.styles';

export const VehiclesSearch = () => {
  const { top } = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState<number>(0);
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebouncedValue(search);

  const getTotalVehicles = async () => {
    const resp = await VehicleUseCases.getVehiclesUseCase('vehicles');
    setTotal(resp.response?.total || 0);
  };

  const getVehiclesData = async (limit: number) => {
    const resp = await VehicleUseCases.getVehiclesUseCase(`vehicles?limit=${limit}`);
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
    <Layout style={{ ...globalStyles.searchContainer, marginTop: top }}>
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
      <Layout style={globalStyles.fullWidth}>
        <VehiclesList vehicles={vehicles} />
      </Layout>
    </Layout>
  );
};
