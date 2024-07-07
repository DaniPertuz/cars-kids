import { StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';
import { Rental } from '../../../../core/entities';
import { RentalsListItem } from '../RentalsListItem';
import { useCustomTheme } from '../../../hooks';

export const RentalsList = ({ rentals }: { rentals: Rental[]; }) => {
  const { background } = useCustomTheme();
  return (
    <List
      data={rentals}
      showsVerticalScrollIndicator={false}
      style={[styles.container, background]}
      renderItem={({ item, index }) => <RentalsListItem index={index} rental={item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5
  }
});
