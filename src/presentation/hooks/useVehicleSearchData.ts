import { useEffect, useMemo, useState } from 'react';
import { Vehicle } from '../../core/entities';
import { useDebouncedValue } from './useDebouncedValue';
import * as VehicleUseCases from '../../core/use-cases/vehicles';

export const useVehicleSearchData = () => {
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
  return {
    debouncedValue,
    loading,
    search,
    vehicles,
    setSearch
  }
}
