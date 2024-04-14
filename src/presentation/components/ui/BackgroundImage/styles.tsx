import { StyleSheet } from 'react-native';
import { globalColors } from '../../../theme/globalColors';

export const styles = StyleSheet.create({
  initialBackground: {
    alignSelf: 'center',
    backgroundColor: globalColors.background,
    justifyContent: 'center'
  },
  initialBackgroundImage: {
    height: 300,
    opacity: 0.4,
    width: 380
  }
});
