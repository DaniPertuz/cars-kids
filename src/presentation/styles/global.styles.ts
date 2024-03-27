import { StyleSheet } from 'react-native';
import { globalColors } from '../theme/globalColors';

export const globalStyles = StyleSheet.create({
  backButtonContainer: {
    position: 'absolute',
    left: 15,
    backgroundColor: globalColors.background
  },
  container: {
    flex: 1,
    backgroundColor: globalColors.background
  },
  flexAlignJustifyCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexEnd: {
    alignItems: 'flex-end',
    backgroundColor: globalColors.background
  },
  iconSize: {
    height: 25,
    width: 25
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
  mainLayout: {
    backgroundColor: globalColors.background,
    gap: 20,
  },
  mainMargin: {
    marginHorizontal: 40
  },
  redBorder: {
    borderColor: globalColors.primaryRed
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
