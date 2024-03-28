import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  container: {
    left: 25,
    position: 'absolute',
    ...globalStyles.mainBackground
  }
});
