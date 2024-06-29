import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Vehicle } from '../../../../../core/entities/vehicle';
import { IVehicleSize } from '../../../../../infrastructure/interfaces';
import { Callout } from '../../../ui';
import { globalColors } from '../../../../theme/globalColors';

export const VehicleItemBody = ({ vehicle }: { vehicle: Vehicle; }) => {
  const iconPadding = vehicle.size === IVehicleSize.Small ? 6 : vehicle.size === IVehicleSize.Medium ? 8 : 10;
  const iconStyle = { backgroundColor: vehicle.color, ...styles.itemBorder, padding: iconPadding };
  return (
    <>
      <Layout style={styles.colorContainer}>
        <Layout style={iconStyle} />
      </Layout>
      <Layout style={styles.nicknameContainer}>
        <Callout text={vehicle.nickname} />
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  colorContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center'
  },
  itemBorder: {
    borderColor: globalColors.dark,
    borderRadius: 100,
    borderWidth: 1
  },
  nicknameContainer: {
    backgroundColor: 'transparent',
    flex: 15
  }
});
