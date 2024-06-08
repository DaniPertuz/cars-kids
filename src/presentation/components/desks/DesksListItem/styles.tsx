import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  container: {
    ...globalStyles.platinumBackground,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    margin: 10,
    paddingHorizontal: 10
  }
});
