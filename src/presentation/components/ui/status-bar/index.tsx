import React from 'react';
import { Platform, StatusBar, View, StyleSheet } from 'react-native';
import { useCustomTheme } from '../../../hooks';

const StatusBarComponent = () => {
  const { background, isDarkMode } = useCustomTheme();
  const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  return (
    <View style={[styles.statusBar, { height: STATUS_BAR_HEIGHT, backgroundColor: background.backgroundColor }]}>
      <StatusBar
        translucent
        backgroundColor={background.backgroundColor}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  },
});

export default StatusBarComponent;
