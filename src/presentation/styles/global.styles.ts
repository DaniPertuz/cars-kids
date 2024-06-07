import { StyleSheet } from 'react-native';
import { globalColors } from '../theme/globalColors';

export const globalStyles = StyleSheet.create({
  alignJustifyCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalColors.background
  },
  backButtonContainer: {
    position: 'absolute',
    left: 15,
    backgroundColor: globalColors.background
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    backgroundColor: globalColors.background
  },
  divider: {
    backgroundColor: globalColors.backgroundDark,
    marginHorizontal: 30,
    marginBottom: 5
  },
  flexAlignJustifyCenter: {
    backgroundColor: globalColors.background,
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
    borderColor: globalColors.backgroundDark,
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
  modalContainer: {
    backgroundColor: globalColors.background,
    gap: 10,
    width: 320
  },
  platinumBackground: {
    backgroundColor: globalColors.platinum
  },
  redBorder: {
    borderColor: globalColors.primaryRed
  },
  whiteBorder: {
    borderColor: globalColors.white
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: globalColors.background,
    marginHorizontal: 30
  },
  searchListContainer: {
    height: '92%',
    width: '100%'
  },
  fullWidth: {
    width: '100%'
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
