import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';
import { globalColors } from '../../../theme/globalColors';

export const styles = StyleSheet.create({
  container: {
    ...globalStyles.mainBackground,
    justifyContent: 'space-between',
    marginHorizontal: 3,
    gap: 5
  }
});
