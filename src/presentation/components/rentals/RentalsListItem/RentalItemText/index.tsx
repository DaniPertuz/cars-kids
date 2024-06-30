import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Rental } from '../../../../../core/entities';
import { IVehicleSize } from '../../../../../infrastructure/interfaces';
import { paymentDescriptions } from '../../../../../utils';
import { useFormattedDate } from '../../../../hooks';
import { Caption } from '../../../ui';
import { VehicleColor } from '../../../vehicles/VehicleColor';
import { globalStyles } from '../../../../styles/global.styles';

export const RentalItemText = ({ rental }: { rental: Rental; }) => {
  const { addedTime, extractTimeFromStringDate } = useFormattedDate();
  const safeAccess = (value: any) => value || 'N/A';
  const payment = paymentDescriptions[rental.payment];
  const iconSize = (rental.vehicle.size === IVehicleSize.XLarge || rental.vehicle.size === IVehicleSize.Large) ? { height: 25, width: 25 } : rental.vehicle.size === IVehicleSize.Medium ? { height: 20, width: 20 } : { height: 15, width: 15 };

  return (
    <Layout style={styles.mainContainer}>
      <Caption textColor={globalStyles.colorOnyx} text={`${extractTimeFromStringDate(rental.date)} - ${addedTime(rental.date, rental.time)} (${rental.time})`} />
      <Layout style={styles.vehicleInfoContainer}>
        <Caption textColor={globalStyles.colorOnyx} text={`${safeAccess(rental.vehicle?.nickname)}`} />
        <VehicleColor vehicle={rental.vehicle} iconSize={iconSize} />
      </Layout>
      <Caption textColor={globalStyles.colorOnyx} text={`Pago: ${safeAccess(rental.amount)}\nMedio: ${payment}\nPuesto de trabajo: ${safeAccess(rental.desk?.name)}\nUsuario: ${safeAccess(rental.user?.name)}`} />
      {rental.exception && <Caption textColor={globalStyles.colorOnyx} text={`Observación: ${rental.exception}`} />}
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: { gap: 10 },
  vehicleInfoContainer: { gap: 5 }
});
