import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  container: {
    ...globalStyles.mainBackground,
    width: 320
  },
  optionsContainer: {
    gap: 20,
    marginBottom: 30,
    ...globalStyles.mainBackground
  }
});
