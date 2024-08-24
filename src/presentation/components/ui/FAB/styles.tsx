import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    position: 'absolute',
    right: 20,
    bottom: Platform.OS === 'ios' ? 115 : 80
  }
});
