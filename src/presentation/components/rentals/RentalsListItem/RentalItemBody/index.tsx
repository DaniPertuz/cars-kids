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
  const { done, buttonOpacity, buttonSize, secondsLeft, timerStatus, formatTime, advanceTime, pauseTimer, resetTimer, setDone, startTimer } = useRentalTimer({ rental });  
  const totalRentalTime = rental.time * 60;
  let headerBackgroundColor;
  let textColor;

  if (!done && totalRentalTime - secondsLeft <= 180) {
    headerBackgroundColor = globalColors.primaryRed;
    textColor = globalColors.white;
  } else if (!done && totalRentalTime - secondsLeft <= 300) {
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
          <HeaderFive text={`${done ? rental.time : formatTime(secondsLeft)}${done ? "'" : ''}`} textColor={textColor} />
        </Layout>
        <Layout style={styles.descriptionContainer}>
          <RentalItemDescription rental={rental} />
        </Layout>
      </Layout>
      {!done && <RentalTimerButtons index={index} rental={rental} buttonOpacity={buttonOpacity} buttonSize={buttonSize} status={timerStatus} advanceTime={advanceTime} pause={pauseTimer} reset={resetTimer} setDone={setDone} startTimer={startTimer} />}
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
