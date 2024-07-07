import { StyleSheet } from 'react-native';
import { ListItem } from '@ui-kitten/components';
import { Rental } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';
import { TransactionActions } from '../../transactions/TransactionActions';
import { RentalItemBody } from './RentalItemBody';

export const RentalsListItem = ({ index, rental }: { index: number, rental: Rental; }) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  return (
    <ListItem
      description={<RentalItemBody index={index} rental={rental} />}
      accessoryRight={<TransactionActions rental={rental} />}
      style={[styles.itemContainer, platinumItemBackgroundColor]}
    />
  );
};

const styles = StyleSheet.create({ itemContainer: { borderRadius: 10, margin: 10 } });
