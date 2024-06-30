import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Rental } from '../../../../../core/entities';
import { paymentDescriptions } from '../../../../../utils';
import { useFormattedDate } from '../../../../hooks';
import { Callout, Caption } from '../../../ui';
import { globalStyles } from '../../../../styles/global.styles';

export const RentalItemText = ({ rental }: { rental: Rental; }) => {
  const { addedTime, extractTimeFromStringDate } = useFormattedDate();

  const rentalDescription = () => {
    const safeAccess = (value: any) => value || 'N/A';
    const payment = paymentDescriptions[rental.payment];
    let description = `Inicio: ${extractTimeFromStringDate(rental.date)}\nFin: ${addedTime(rental.date, rental.time)}\n\nVehículo: ${safeAccess(rental.vehicle?.nickname)}\nPago: ${safeAccess(rental.amount)}\n\nMedio: ${payment}\nPuesto de trabajo: ${safeAccess(rental.desk?.name)}\nUsuario: ${safeAccess(rental.user?.name)}`;
    if (rental.exception) {
      description += `\nObservación: ${rental.exception}`;
    }
    return description;
  };

  return (
    <Layout style={styles.textContainer}>
      <Callout text={rental.client} />
      <Caption text={rentalDescription()} textColor={globalStyles.colorOnyx} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  textContainer: { flex: 3 }
});
