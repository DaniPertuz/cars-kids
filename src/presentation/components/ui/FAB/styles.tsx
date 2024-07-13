import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 35,
    bottom: Platform.OS === 'ios' ? 115 : 90
  }
});
