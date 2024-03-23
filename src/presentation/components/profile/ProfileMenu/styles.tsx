import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  menuContainer: {
    marginHorizontal: 30,
    ...globalStyles.mainBackground
  },
  menuItemsContainer: {
    gap: 35,
    marginBottom: 40,
    ...globalStyles.mainBackground
  }
});
