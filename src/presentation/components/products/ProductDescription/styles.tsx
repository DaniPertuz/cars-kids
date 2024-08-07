import { StyleSheet } from 'react-native';
import { globalColors } from '../../../theme/globalColors';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  descriptionContainer: {
    ...globalStyles.alignCenterRowSpaceBetween,
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
