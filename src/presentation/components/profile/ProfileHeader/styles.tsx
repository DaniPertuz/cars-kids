import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 20,
    ...globalStyles.mainBackground
  }
});
