import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';
import { globalColors } from '../../../theme/globalColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...globalStyles.mainBackground
  }
});
