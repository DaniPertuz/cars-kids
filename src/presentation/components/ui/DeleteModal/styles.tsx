import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    alignItems: 'center',
    gap: 10,
    width: 320,
    ...globalStyles.mainBackground
  }
})
