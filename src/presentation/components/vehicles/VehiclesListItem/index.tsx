import { ListItem } from '@ui-kitten/components';

import { VehicleActions } from '../VehicleActions';
import { VehicleDescription } from '../VehicleDescription';
import { VehicleImage } from '../VehicleImage';
import { VehicleTitle } from '../VehicleTitle';

import { IVehicle } from '../../../../infrastructure/interfaces';

import { styles } from './styles';

interface Props {
  item: IVehicle;
}

export const VehiclesListItem = ({ item }: Props) => {
  return (
    <ListItem
      style={styles.container}
      title={<VehicleTitle item={item} />}
      description={<VehicleDescription item={item} />}
      accessoryLeft={<VehicleImage />}
      accessoryRight={<VehicleActions vehicle={item} />}
    />
  );
};
