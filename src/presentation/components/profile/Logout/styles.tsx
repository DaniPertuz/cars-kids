import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  logoutContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    ...globalStyles.mainBackground
  }
});
