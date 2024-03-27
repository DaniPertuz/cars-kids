import { StyleSheet } from 'react-native';
import { globalColors } from '../../../theme/globalColors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: globalColors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
    position: 'absolute'
  }
});
