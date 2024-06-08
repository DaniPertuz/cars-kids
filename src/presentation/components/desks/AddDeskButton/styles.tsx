import { StyleSheet } from 'react-native';
import { globalColors } from '../../../theme/globalColors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -5,
    right: -10,
    backgroundColor: globalColors.background,
    borderRadius: 100,
    borderColor: 'transparent'
  }
});
