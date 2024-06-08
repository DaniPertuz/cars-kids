import { StyleSheet } from 'react-native';
import { globalColors } from '../../../theme/globalColors';

export const styles = StyleSheet.create({
  justifyCenter: {
    justifyContent: 'center'
  },
  menuItem: {
    backgroundColor: globalColors.greyLight,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 15,
    paddingVertical: 10
  }
});
