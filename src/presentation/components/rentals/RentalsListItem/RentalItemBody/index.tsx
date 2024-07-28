import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Rental } from '../../../../../core/entities';
import { useCustomTheme, useRentalTimer } from '../../../../hooks';
import { HeaderFive } from '../../../ui';
import { RentalTimerButtons } from '../../RentalTimerButtons';
import { RentalItemDescription } from '../RentalItemDescription';
import { globalColors } from '../../../../theme/globalColors';

export const RentalItemBody = ({ rental, index }: { index: number, rental: Rental; }) => {
  const { defaultColor, platinumItemBackgroundColor } = useCustomTheme();
  const { done, time, formatTime, buttonOpacity, buttonSize, status, advanceTime, pause, reset, setDone, start } = useRentalTimer({ rental });  
  const totalRentalTime = rental.time * 60;
  let headerBackgroundColor;
  let textColor;

  if (!done && totalRentalTime - time <= 180) {
    headerBackgroundColor = globalColors.primaryRed;
    textColor = globalColors.white;
  } else if (!done && totalRentalTime - time <= 300) {
    headerBackgroundColor = globalColors.warning;
    textColor = globalColors.white;
  } else {
    headerBackgroundColor = platinumItemBackgroundColor.backgroundColor;
    textColor = defaultColor.color;
  }
  
  return (
    <Layout style={[styles.mainContainer, platinumItemBackgroundColor]}>
      <Layout style={[styles.container, platinumItemBackgroundColor]}>
        <Layout style={[styles.headerContainer, { backgroundColor: headerBackgroundColor }]}>
          <HeaderFive text={`${done ? rental.time : formatTime(time)}${done ? "'" : ''}`} textColor={textColor} />
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
    borderRadius: 50,
    paddingHorizontal: 5
  },
  mainContainer: {
    gap: 20
  }
});
