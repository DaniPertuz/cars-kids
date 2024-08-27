/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import {CarKidsApp} from './src/CarKidsApp';
import {name as appName} from './app.json';

if (__DEV__) {
  const ignoreWarns = [
    "`new NativeEventEmitter()`"
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}

AppRegistry.registerComponent(appName, () => CarKidsApp);
