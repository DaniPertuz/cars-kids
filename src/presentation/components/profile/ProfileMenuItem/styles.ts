import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  justifyCenter: {
    justifyContent: 'center'
  },
  menuItem: {
    backgroundColor: '#DEDEDE',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  menuItemLabel: {
    alignItems: 'center',
    backgroundColor: '#DEDEDE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    padding: 5
  }
});
