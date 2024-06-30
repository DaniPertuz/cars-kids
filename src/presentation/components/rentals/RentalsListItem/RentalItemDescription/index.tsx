import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Rental } from '../../../../../core/entities';
import { Callout } from '../../../ui';
import { RentalItemText } from '../RentalItemText';

export const RentalItemDescription = ({ rental }: { rental: Rental; }) => {
  return (
    <Layout style={styles.textContainer}>
      <Callout text={rental.client} />
      <RentalItemText rental={rental} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  textContainer: { flex: 3 }
});
