import { useColorScheme } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { globalColors } from '../theme/globalColors';

export const useCustomTheme = () => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const defaultBackgroundColor = theme['background-basic-color-1'];
  const defaultBackgroundColorShadow = theme['background-basic-color-3'];
  const defaultPrimaryColor = theme['color-primary-100'];
  const defaultBasicDisabledColor = theme['color-basic-600'];
  const background = { backgroundColor: isDarkMode ? defaultBackgroundColor : globalColors.background };
  const borderColor = { borderColor: isDarkMode ? defaultPrimaryColor : globalColors.dark };
  const customFillColor = { fillColor: isDarkMode ? defaultPrimaryColor : globalColors.dark };
  const defaultColor = { color: isDarkMode ? defaultPrimaryColor : globalColors.dark };
  const disabledColor = isDarkMode ? defaultPrimaryColor : globalColors.darkDisabled;
  const footnoteColor = { color: isDarkMode ? defaultPrimaryColor : globalColors.backgroundDark };
  const platinumItemBackgroundColor = { backgroundColor: isDarkMode ? defaultBackgroundColorShadow : globalColors.platinum };

  return {
    background,
    borderColor,
    disabledColor,
    customFillColor,
    footnoteColor,
    isDarkMode,
    defaultBackgroundColor,
    defaultBackgroundColorShadow,
    defaultBasicDisabledColor,
    defaultColor,
    defaultPrimaryColor,
    platinumItemBackgroundColor
  };
};
