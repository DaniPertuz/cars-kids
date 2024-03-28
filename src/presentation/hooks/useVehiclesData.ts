import { useEffect, useRef, useState } from 'react';
import { VehiclesResponse } from '../../infrastructure/interfaces';
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
  const isMounted = useRef(true);

  const { getVehicles } = useVehicleStore();

  useEffect(() => {
    getVehicles('vehicles')
      .then((data) => {
        if (isMounted.current) {
          setVehiclesData(data);
          setDisplay(true);
        }
      });

    return () => {
      isMounted.current = false;
    };
  }, [vehiclesData]);

  const fetchNextPage = async () => {
    if (vehiclesData.next) {
      const data = await getVehicles(vehiclesData.next);
      setVehiclesData(data);
      setDisplay(data.vehicles.length !== 0);
    }
  };

  const fetchPrevPage = async () => {
    if (vehiclesData.prev) {
      const data = await getVehicles(vehiclesData.prev);
      setVehiclesData(data);
      setDisplay(data.vehicles.length !== 0);
    }
  };

  return {
    display,
    vehiclesData,
    fetchNextPage,
    fetchPrevPage
  };
};
