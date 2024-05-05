import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';
import { globalColors } from '../../../theme/globalColors';

export const styles = StyleSheet.create({
  container: {
    ...globalStyles.mainBackground,
    height: 70
  },
  fab: {
    borderRadius: 100,
    borderColor: globalColors.dark,
    borderWidth: 3,
    padding: 5
  }
});
