import { StyleSheet } from 'react-native';
import { globalColors } from '../../../theme/globalColors';

export const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: globalColors.successLight,
    borderRadius: 20,
    borderColor: globalColors.darkLight,
    borderWidth: 1,
    marginHorizontal: 40,
    paddingHorizontal: 40,
    paddingVertical: 10,
    width: '90%'
  },
  baseItemContainer: {
    backgroundColor: globalColors.successLight,
    marginTop: 10
  }
})
