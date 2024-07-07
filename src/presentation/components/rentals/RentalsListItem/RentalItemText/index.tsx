import { Layout } from '@ui-kitten/components';
import { Rental } from '../../../../../core/entities';
import { IVehicleSize } from '../../../../../infrastructure/interfaces';
import { paymentDescriptions } from '../../../../../utils';
import { useCustomTheme, useFormattedDate } from '../../../../hooks';
import { VehicleColor } from '../../../vehicles/VehicleColor';
import { Caption } from '../../../ui';

export const RentalItemText = ({ rental }: { rental: Rental; }) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  const { addedTime, extractTimeFromStringDate } = useFormattedDate();
  const safeAccess = (value: any) => value || 'N/A';
  const payment = paymentDescriptions[rental.payment];
  const iconSize = (rental.vehicle.size === IVehicleSize.XLarge || rental.vehicle.size === IVehicleSize.Large) ? { height: 25, width: 25 } : rental.vehicle.size === IVehicleSize.Medium ? { height: 20, width: 20 } : { height: 15, width: 15 };

  return (
    <Layout style={[{ gap: 10 }, platinumItemBackgroundColor]}>
      <Caption text={`${extractTimeFromStringDate(rental.date)} - ${addedTime(rental.date, rental.time)} (${rental.time})`} />
      <Layout style={[{ gap: 5 }, platinumItemBackgroundColor]}>
        <Caption text={`${safeAccess(rental.vehicle?.nickname)}`} />
        <VehicleColor vehicle={rental.vehicle} iconSize={iconSize} />
      </Layout>
      <Caption text={`Pago: ${safeAccess(rental.amount)}\nMedio: ${payment}\nPuesto de trabajo: ${safeAccess(rental.desk?.name)}\nUsuario: ${safeAccess(rental.user?.name)}`} />
      {rental.exception && <Caption text={`Observación: ${rental.exception}`} />}
    </Layout>
  );
};
