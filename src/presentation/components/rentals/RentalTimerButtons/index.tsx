import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { HeaderFive, BasicButton } from '../../ui';
import { globalColors } from '../../../theme/globalColors';

export const RentalTimerButtons = () => {
  const buttonSize = { height: 25, width: 25 };
  const buttonOpacity = 0.7;

  return (
    <Layout style={styles.container}>
      <HeaderFive text={`'`} />
      <BasicButton activeOpacity={buttonOpacity} fillColor={globalColors.warning} size={buttonSize} iconName='pause-circle-outline' onPress={() => console.log('Pausa')} />
      <BasicButton activeOpacity={buttonOpacity} fillColor={globalColors.darkDisabled} size={buttonSize} iconName='refresh-outline' onPress={() => console.log('Reanuda')} />
      <BasicButton activeOpacity={buttonOpacity} fillColor={globalColors.successLight} size={buttonSize} iconName='checkmark-circle-2-outline' onPress={() => console.log('Termina')} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', gap: 15 }
});
