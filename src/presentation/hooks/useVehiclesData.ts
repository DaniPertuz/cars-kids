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
    getVehicles()
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

  return {
    display,
    vehiclesData
  };
};
