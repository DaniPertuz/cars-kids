import { StyleSheet } from 'react-native';
import { globalStyles } from '../global.styles';

export const authStyles = StyleSheet.create({
  formContainer: {
    gap: 10,
    marginTop: 20
  },
  footer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    ...globalStyles.mainBackground
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  mainImage: {
    height: 200,
    width: 300
  },
  spacer: {
    ...globalStyles.mainBackground,
    height: 20
  }
});
