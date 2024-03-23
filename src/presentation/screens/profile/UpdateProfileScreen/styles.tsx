import { StyleSheet } from 'react-native';
import { globalColors } from '../../../theme/globalColors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: globalColors.background,
    flex: 1,
    gap: 15,
    marginHorizontal: 40
  },
  inputContainer: {
    backgroundColor: globalColors.background,
    gap: 5,
    width: '100%'
  }
});
