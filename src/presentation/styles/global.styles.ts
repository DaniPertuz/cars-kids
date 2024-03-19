import { StyleSheet } from 'react-native';
import { globalColors } from '../theme/globalColors';

export const globalStyles = StyleSheet.create({
  flexAlignJustifyCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexEnd: {
    alignItems: 'flex-end',
    backgroundColor: globalColors.background
  },
  input: {
    backgroundColor: globalColors.white,
    borderColor: globalColors.background,
    borderRadius: 10,
    marginBottom: 10
  },
  mainBackground: {
    backgroundColor: globalColors.background
  },
  colorPrimaryRed: {
    color: globalColors.primaryRed
  },
  colorSecondaryRed: {
    color: globalColors.secondaryRed
  },
  colorTerciaryRed: {
    color: globalColors.tertiaryRed
  },
  colorOnyx: {
    color: globalColors.dark
  },
  colorDeepTaupe: {
    color: globalColors.darkLight
  },
  colorLightSilver: {
    color: globalColors.background
  },
  colorOrangeCrayola: {
    color: globalColors.warning
  },
  colorSpanishGray: {
    color: globalColors.backgroundDark
  },
  colorWintergreenDream: {
    color: globalColors.success
  }
});
