import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Rental } from '../../../../../core/entities';
import { useRentalTimer } from '../../../../hooks';
import { HeaderFive } from '../../../ui';
import { RentalTimerButtons } from '../../RentalTimerButtons';
import { RentalItemDescription } from '../RentalItemDescription';
import { globalColors } from '../../../../theme/globalColors';

export const RentalItemBody = ({ rental, index }: { index: number, rental: Rental; }) => {
  const { done, time, formatTime, buttonOpacity, buttonSize, status, advanceTime, pause, reset, setDone, start } = useRentalTimer({ rental });
  return (
    <Layout style={styles.mainContainer}>
      <Layout style={styles.container}>
        <Layout style={[styles.headerContainer, { backgroundColor: (!done && (time / 60) < 3) ? globalColors.primaryRed : (!done && (time / 60) < 5) ? globalColors.warning : globalColors.white }]}>
          <HeaderFive text={`${done ? rental.time : formatTime(time)}${done ? "'" : ''}`} textColor={(!done && (time / 60) < 3) ? globalColors.white : (!done && (time / 60) < 5) ? globalColors.white : globalColors.dark} />
        </Layout>
        <Layout style={styles.descriptionContainer}>
          <RentalItemDescription rental={rental} />
        </Layout>
      </Layout>
      {!done && <RentalTimerButtons index={index} rental={rental} buttonOpacity={buttonOpacity} buttonSize={buttonSize} status={status} advanceTime={advanceTime} pause={pause} reset={reset} setDone={setDone} start={start} />}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10
  },
  descriptionContainer: {
    flex: 3
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 50
  },
  mainContainer: {
    gap: 20
  }
});
