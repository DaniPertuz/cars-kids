import 'react-native-gesture-handler';

import { LogBox, useColorScheme } from 'react-native';

import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { MainNavigator } from './presentation/navigation/MainNavigator';
import { AuthProvider } from './presentation/providers/AuthProvider';

LogBox.ignoreLogs(['new NativeEventEmitter']);

export const CarKidsApp = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthProvider>
            <MainNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
