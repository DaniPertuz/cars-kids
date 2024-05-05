import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  container: {
    ...globalStyles.mainMargin,
    ...globalStyles.mainBackground
  },
  listContainer: {
    ...globalStyles.mainBackground,
    gap: 5,
    height: '97%'
  }
});
