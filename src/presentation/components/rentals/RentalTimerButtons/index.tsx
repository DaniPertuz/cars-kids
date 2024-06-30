import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Status } from 'use-timer/lib/types';
import { Rental } from '../../../../core/entities';
import { BasicButton } from '../../ui';
import { RentalAddTimeModal } from '../RentalAddTimeModal';
import { globalColors } from '../../../theme/globalColors';

interface Props {
  buttonOpacity: number;
  buttonSize: { height: number, width: number; };
  index: number;
  rental: Rental;
  status: Status;
  advanceTime: (timeToAdd: number) => void;
  pause: () => void;
  reset: () => void;
  setDone: (value: boolean) => void;
  start: () => void;
}

export const RentalTimerButtons = ({ buttonOpacity, buttonSize, index, rental, status, advanceTime, pause, reset, setDone, start }: Props) => {
  const [visible, setVisible] = useState(false);
  return (
    <Layout>
      <Layout style={styles.container}>
        <BasicButton activeOpacity={buttonOpacity} fillColor={globalColors.primaryRed} size={buttonSize} iconName={'plus-circle-outline'} onPress={() => setVisible(true)} />
        <BasicButton activeOpacity={buttonOpacity} fillColor={status === 'RUNNING' ? globalColors.warning : globalColors.success} size={buttonSize} iconName={status === 'RUNNING' ? 'pause-circle-outline' : 'play-circle-outline'} onPress={status === 'RUNNING' ? pause : start} />
        <BasicButton activeOpacity={buttonOpacity} fillColor={globalColors.darkDisabled} size={buttonSize} iconName='refresh-outline' onPress={reset} />
        <BasicButton activeOpacity={buttonOpacity} fillColor={globalColors.successLight} size={buttonSize} iconName='checkmark-circle-2-outline' onPress={() => setDone(true)} />
      </Layout>
      <RentalAddTimeModal index={index} rental={rental} advanceTime={advanceTime} visible={visible} setVisible={setVisible} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    borderColor: globalColors.darkDisabled,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5
  }
});
