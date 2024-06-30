import { StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';
import { Rental } from '../../../../core/entities';
import { RentalsListItem } from '../RentalsListItem';
import { globalStyles } from '../../../styles/global.styles';

export const RentalsList = ({ rentals }: { rentals: Rental[]; }) => {
  return (
    <List
      data={rentals}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      renderItem={({ item, index }) => <RentalsListItem index={index} rental={item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.mainBackground,
    marginVertical: 5
  }
});
