import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  descriptionContainer: {
    ...globalStyles.alignCenterRowSpaceBetween,
    ...globalStyles.platinumBackground,
    marginTop: 10
  }
});
