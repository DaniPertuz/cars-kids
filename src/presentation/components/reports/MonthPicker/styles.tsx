import { StyleSheet } from 'react-native';
import { globalColors } from '../../../theme/globalColors';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.background,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resetDataContainer: {
    ...globalStyles.mainBackground,
    marginHorizontal: 5
  },
  selectsContainer: {
    alignSelf: 'center',
    backgroundColor: globalColors.background,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
