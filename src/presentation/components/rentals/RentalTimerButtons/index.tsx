import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { HeaderFive, BasicButton } from '../../ui';
import { globalColors } from '../../../theme/globalColors';

export const RentalTimerButtons = () => {
  return (
    <Layout style={styles.container}>
      <HeaderFive text={`'`} />
      <BasicButton activeOpacity={0.7} fillColor={globalColors.warning} size={{ height: 25, width: 25 }} iconName='pause-circle-outline' onPress={() => console.log('Pausa')} />
      <BasicButton activeOpacity={0.7} fillColor={globalColors.darkDisabled} size={{ height: 25, width: 25 }} iconName='refresh-outline' onPress={() => console.log('Reanuda')} />
      <BasicButton activeOpacity={0.7} fillColor={globalColors.successLight} size={{ height: 25, width: 25 }} iconName='checkmark-circle-2-outline' onPress={() => console.log('Termina')} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', gap: 15 }
});
