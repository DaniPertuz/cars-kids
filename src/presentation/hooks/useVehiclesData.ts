import { useEffect, useState } from 'react';
import { IUserRole, IVehicle, VehiclesResponse } from '../../infrastructure/interfaces';
import { useAuthStore } from '../store/auth/useAuthStore';
import { useVehicleStore } from '../store/vehicles/useVehicleStore';

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
  const [display, setDisplay] = useState(vehiclesData.vehicles.length !== 0);
  const [paginationState, setPaginationState] = useState({ page: 1, limit: 10 });

  const { user } = useAuthStore();
  const { getVehicles } = useVehicleStore();

  const getData = async () => {
    const url = user?.role === IUserRole.Editor ? `vehicles/status/active` : 'vehicles';
    const newData = await getVehicles(`${url}?page=${paginationState.page}&limit=${paginationState.limit}`);
    setVehiclesData(newData);
    setDisplay(newData.vehicles.length !== 0);
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

  const updateVehicleStatus = async (updatedVehicle: IVehicle) => {
    const updatedVehicles = vehiclesData.vehicles.map(vehicle =>
      vehicle.nickname === updatedVehicle.nickname ? updatedVehicle : vehicle
    );
    setVehiclesData(prevData => ({
      ...prevData,
      vehicles: updatedVehicles
    }));
  };

  return {
    display,
    vehiclesData,
    fetchNextPage,
    fetchPrevPage,
    getData,
    updateVehicleStatus
  };
};
