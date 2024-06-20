import { useEffect, useState } from 'react';
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { Vehicle } from '../../../../core/entities';
import { IVehicleSize } from '../../../../infrastructure/interfaces';
import { VehicleItemContainer } from './VehicleItemContainer';
import { VehicleItemBody } from './VehicleItemBody';
import { styles } from './styles';

interface Props {
  initialValue: string;
  vehicles: Vehicle[];
  placeholder: string;
  handleSelection: (value: string) => void;
}

export const VehiclesSelectComponent = ({ initialValue, vehicles, placeholder, handleSelection }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(
    vehicles.find(vehicle => vehicle.nickname === initialValue)
  );

  useEffect(() => {
    if (selectedIndex !== undefined && !Array.isArray(selectedIndex)) {
      const vehicle = vehicles[selectedIndex.row];
      setSelectedVehicle(vehicle);
      handleSelection(vehicle.nickname);
    }
  }, [selectedIndex, vehicles, handleSelection]);

  const vehicleSizeOrder = {
    [IVehicleSize.Small]: 1,
    [IVehicleSize.Medium]: 2,
    [IVehicleSize.Large]: 3,
  };

  return (
    <Select
      style={styles.container}
      placeholder={placeholder}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
      value={selectedVehicle?.nickname}
    >
      {vehicles.sort((a, b) => vehicleSizeOrder[a.size as IVehicleSize] - vehicleSizeOrder[b.size as IVehicleSize]).map((vehicle, index) => (
        <SelectItem key={index} title={() => (
          <VehicleItemContainer key={index}>
            <VehicleItemBody vehicle={vehicle} />
          </VehicleItemContainer>
        )} />
      ))
      }
    </Select>
  );
};
