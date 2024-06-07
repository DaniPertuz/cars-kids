import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 50,
    marginHorizontal: 20,
    paddingBottom: 40,
    ...globalStyles.mainBackground
  },
  titleContainer: {
    alignItems: 'center',
    flex: 4,
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 15,
    ...globalStyles.mainBackground
  }
});
