import { useEffect, useState } from 'react';
import * as VehicleUseCases from '../../core/use-cases/vehicles'
import { StorageAdapter } from '../../config/adapters/storage-adapter';
import { IUserRole, Pagination, VehiclesResponse } from '../../infrastructure/interfaces';

export const useVehiclesData = () => {
  const init = {
    page: 0,
    limit: 0,
    total: 0,
    next: null,
    prev: null,
    vehicles: []
  };

  const [vehiclesData, setVehiclesData] = useState<VehiclesResponse>(init);
  const [display, setDisplay] = useState(false);
  const [paginationState, setPaginationState] = useState<Pagination>({ page: 1, limit: 10 });

  const getData = async () => {
    const user = await StorageAdapter.getItem('user');
    const userJson = JSON.parse(user!);
    const url = userJson?.role === IUserRole.Editor ? `vehicles/status/active` : 'vehicles';
    const newData = await VehicleUseCases.getVehiclesUseCase(`${url}?page=${paginationState.page}&limit=${paginationState.limit}`);
    setVehiclesData(newData.response!);
    setDisplay(true);
  };

  useEffect(() => {
    getData();
  }, [paginationState]);

  const fetchNextPage = async () => {
    if (vehiclesData.next) {
      setPaginationState(prevState => ({ ...prevState, page: prevState.page + 1 }));
    }
  };

  const fetchPrevPage = async () => {
    if (vehiclesData.prev) {
      setPaginationState(prevState => ({ ...prevState, page: prevState.page - 1 }));
    }
  };

  return {
    display,
    vehiclesData,
    fetchNextPage,
    fetchPrevPage,
    getData
  };
};
