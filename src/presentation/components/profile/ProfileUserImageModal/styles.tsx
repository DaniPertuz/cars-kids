import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    ...globalStyles.mainBackground
  },
  profileImage: {
    borderRadius: 50,
    height: 320,
    width: 320
  }
});
