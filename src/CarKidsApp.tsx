import 'react-native-gesture-handler';

import { useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, useTheme } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { MainNavigator } from './presentation/navigation/MainNavigator';
import { AuthProvider } from './presentation/providers/AuthProvider';

export const CarKidsApp = () => {
  const colorScheme = useColorScheme();
  const uTheme = useTheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  const backgroundColor =
    colorScheme === 'dark'
      ? uTheme['color-basic-800']
      : uTheme['color-basic-100'];

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer theme={{
          dark: colorScheme === 'dark',
          colors: {
            primary: uTheme['color-primary-500'],
            background: backgroundColor,
            card: uTheme['color-basic-100'],
            text: uTheme['text-basic-color'],
            border: uTheme['color-basic-800'],
            notification: uTheme['color-primary-500']
          }
        }}>
          <AuthProvider>
            <MainNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
