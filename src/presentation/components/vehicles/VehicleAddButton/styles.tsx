import { StyleSheet } from 'react-native';
import { globalColors } from '../../../theme/globalColors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 30,
    bottom: 45,
    backgroundColor: globalColors.background,
    borderRadius: 100,
    borderColor: 'transparent'
  }
});
