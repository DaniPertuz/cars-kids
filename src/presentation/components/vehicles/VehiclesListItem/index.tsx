import { ListItem } from '@ui-kitten/components';

import { VehicleActions } from '../VehicleActions';
import { VehicleDescription } from '../VehicleDescription';
import { VehicleImage } from '../VehicleImage';
import { VehicleTitle } from '../VehicleTitle';

import { Vehicle } from '../../../../core/entities';

import { styles } from './styles';

interface Props {
  vehicle: Vehicle;
}

export const VehiclesListItem = ({ vehicle }: Props) => {
  return (
    <ListItem
      style={styles.container}
      title={<VehicleTitle vehicle={vehicle} />}
      description={<VehicleDescription vehicle={vehicle} />}
      accessoryLeft={<VehicleImage vehicle={vehicle} />}
      accessoryRight={<VehicleActions vehicle={vehicle} />}
    />
  );
};
