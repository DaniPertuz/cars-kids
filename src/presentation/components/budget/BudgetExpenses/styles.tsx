import { StyleSheet } from 'react-native';
import { globalColors } from '../../../theme/globalColors';

export const styles = StyleSheet.create({
  expenseContainer: {
    backgroundColor: globalColors.primaryRed,
    borderRadius: 20,
    borderColor: globalColors.darkLight,
    borderWidth: 1,
    marginHorizontal: 40,
    paddingHorizontal: 40,
    paddingVertical: 10,
    width: '90%'
  },
  expenseItemContainer: {
    backgroundColor: globalColors.primaryRed,
    marginTop: 10
  }
});
