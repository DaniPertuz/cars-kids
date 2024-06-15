import Snackbar from 'react-native-snackbar';

export class SnackbarAdapter {
  static showSnackbar(text: string) {
    return Snackbar.show({ text, duration: Snackbar.LENGTH_SHORT });
  }
}
