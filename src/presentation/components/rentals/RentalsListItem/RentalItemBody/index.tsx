import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Rental } from '../../../../../core/entities';
import { RentalTimerButtons } from '../../RentalTimerButtons';
import { RentalItemText } from '../RentalItemText';

export const RentalItemBody = ({ rental }: { rental: Rental; }) => {

  return (
    <Layout style={styles.container}>
      <RentalTimerButtons />
      <RentalItemText rental={rental} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 10 }
});
