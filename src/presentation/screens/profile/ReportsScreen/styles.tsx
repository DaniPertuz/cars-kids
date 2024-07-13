import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonsContainer: {
    ...globalStyles.mainMargin
  },
  dataContainer: {
    flex: 18
  },
  flexOne: {
    flex: 1
  },
  listContainer: {
    flex: 10
  },
  selectsButtonContainer: {
    flex: 7,
    gap: 15,
    marginTop: 10
  }
});
