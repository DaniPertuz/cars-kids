import { StyleSheet } from 'react-native';
import { globalColors } from '../../../theme/globalColors';

export const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: '#5ED795',
    borderRadius: 20,
    borderColor: globalColors.darkLight,
    borderWidth: 1,
    marginHorizontal: 40,
    paddingHorizontal: 40,
    paddingVertical: 10,
    width: '90%'
  },
  baseItemContainer: {
    backgroundColor: '#5ED795',
    marginTop: 10
  }
})
