import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  container: {
    ...globalStyles.mainMargin
  },
  listContainer: {
    gap: 5,
    height: '97%'
  }
});
