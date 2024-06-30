import { StyleSheet } from 'react-native';
import { ListItem } from '@ui-kitten/components';
import { Rental } from '../../../../core/entities';
import { TransactionActions } from '../../transactions/TransactionActions';
import { RentalItemBody } from './RentalItemBody';
import { globalColors } from '../../../theme/globalColors';

export const RentalsListItem = ({ rental }: { rental: Rental; }) => {
  return (
    <ListItem
      description={<RentalItemBody rental={rental} />}
      accessoryRight={<TransactionActions rental={rental} />}
      style={styles.itemContainer}
    />
  );
};

const styles = StyleSheet.create({ itemContainer: { borderRadius: 10, margin: 10, backgroundColor: globalColors.white } });
