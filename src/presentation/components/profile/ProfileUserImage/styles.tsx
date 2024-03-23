import { StyleSheet } from 'react-native';
import { globalColors } from '../../../theme/globalColors';
import { globalStyles } from '../../../styles/global.styles';

export const styles = StyleSheet.create({
  editImageIconBackground: {
    backgroundColor: globalColors.white,
    borderRadius: 100,
    padding: 4
  },
  editImageIconContainer: {
    borderRadius: 100,
    position: 'absolute',
    right: 160
  },
  editImageIconSize: {
    height: 25,
    width: 25
  },
  image: {
    backgroundColor: globalColors.white,
    borderRadius: 100,
    height: 150,
    width: 150,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
    ...globalStyles.mainBackground
  },
});
