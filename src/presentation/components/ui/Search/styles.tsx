import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  container: {
    ...globalStyles.mainBackground,
    position: 'absolute',
    right: 25
  },
  iconSize: {
    height: 25,
    width: 25
  }
});
