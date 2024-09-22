import { StyleSheet } from 'react-native';
import { useCustomTheme } from '../../../hooks';

const { background } = useCustomTheme();

export const styles = StyleSheet.create({
  buttonContainer: {
    ...background,
    alignSelf: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5
  },
  container: {
    ...background,
    flexDirection: 'row',
    gap: 10,
    marginTop: 10
  },
  inputContainer: {
    ...background,
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center'
  },
  itemContainer: {
    ...background,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10
  },
  subContainer: {
    ...background,
    flex: 1
  }
});
