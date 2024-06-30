import { Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { globalColors } from '../../../theme/globalColors';
import { Vehicle } from '../../../../core/entities/vehicle';

interface Props {
  vehicle: Vehicle;
  iconSize?: { height: number, width: number; };
}

export const VehicleColor = ({ vehicle, iconSize = { height: 15, width: 15 } }: Props) => {
  const { height, width } = iconSize;
  return (
    <Layout style={[styles.itemColor, { backgroundColor: vehicle.color, height, width }]} />
  );
};

const styles = StyleSheet.create({
  itemColor: {
    borderColor: globalColors.dark,
    borderRadius: 100,
    borderWidth: 1
  }
});
