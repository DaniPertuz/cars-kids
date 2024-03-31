import { StyleSheet } from 'react-native';
import { globalColors } from '../../../theme/globalColors';

export const styles = StyleSheet.create({
  descriptionContainer: {
    alignItems: 'center',
    backgroundColor: globalColors.platinum,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  itemColor: {
    borderColor: globalColors.dark,
    borderRadius: 100,
    borderWidth: 1,
    height: 15,
    width: 15
  },
});
