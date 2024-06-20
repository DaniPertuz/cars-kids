import { Layout, ListItem } from '@ui-kitten/components';
import { Rental } from '../../../../core/entities';
import { paymentDescriptions } from '../../../../utils';
import { useFormattedDate } from '../../../hooks';
import { TransactionActions } from '../../transactions/TransactionActions';
import { HeaderSix } from '../../ui';

interface Props {
  rental: Rental;
}

export const RentalsListItem = ({ rental }: Props) => {
  const { addedTime, extractTimeFromStringDate } = useFormattedDate();

  const rentalDescription = () => {
    const safeAccess = (value: any) => value || 'N/A';
    const payment = paymentDescriptions[rental.payment];
    let description = `Inicio: ${extractTimeFromStringDate(rental.date)}\nFin: ${addedTime(rental.date, rental.time)}\nVehículo: ${safeAccess(rental.vehicle?.nickname)}\nPago: ${safeAccess(rental.amount)}\nMedio: ${payment}\nPuesto de trabajo: ${safeAccess(rental.desk?.name)}\nUsuario: ${safeAccess(rental.user?.name)}`;
    if (rental.exception) {
      description += `\nObservación: ${rental.exception}`;
    }
    return description;
  };

  return (
    <ListItem
      title={rental.client}
      description={rentalDescription()}
      accessoryLeft={<Layout><HeaderSix text={`${rental.time}'`} /></Layout>}
      accessoryRight={<TransactionActions rental={rental} />}
      style={{ borderRadius: 10, margin: 10 }}
    />
  );
};
