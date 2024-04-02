import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    ...globalStyles.mainLayout
  },
});
