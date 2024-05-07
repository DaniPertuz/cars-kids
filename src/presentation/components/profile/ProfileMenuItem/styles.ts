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
    justifyContent: 'space-between',
    padding: 5,
  },
  menuItemLabel: {
    alignItems: 'center',
    backgroundColor: globalColors.greyLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    padding: 5
  }
});
