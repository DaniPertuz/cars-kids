import { StyleSheet } from 'react-native';
import { globalStyles } from '../global.styles';

export const authStyles = StyleSheet.create({
  backButtonContainer: {
    position: 'absolute',
    left: 15,
    ...globalStyles.mainBackground
  },
  container: {
    flex: 1,
    ...globalStyles.mainBackground
  },
  formContainer: {
    ...globalStyles.mainBackground,
    marginTop: 20,
  },
  footer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    ...globalStyles.mainBackground
  },
  imageContainer: {
    alignItems: 'center',
    ...globalStyles.mainBackground,
    marginBottom: 30
  },
  mainImage: {
    ...globalStyles.mainBackground,
    height: 200,
    width: 300
  },
  mainLayout: {
    ...globalStyles.mainBackground,
    gap: 20,
  },
  mainMargin: {
    marginHorizontal: 40
  },
  spacer: {
    ...globalStyles.mainBackground,
    height: 20
  },
  welcomeTextContainer: {
    alignItems: 'center',
    ...globalStyles.mainBackground
  }
});
