import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
    ...globalStyles.mainBackground
  },
  buttonsContainer: {
    ...globalStyles.mainBackground,
    ...globalStyles.mainMargin
  },
  dataContainer: {
    flex: 18,
    ...globalStyles.mainBackground
  },
  flexOne: {
    flex: 1
  },
  listContainer: {
    flex: 10,
    ...globalStyles.mainBackground
  },
  selectsButtonContainer: {
    flex: 7,
    gap: 15,
    marginTop: 10,
    ...globalStyles.mainBackground
  }
});
