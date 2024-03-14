import 'react-native-gesture-handler';

import { useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { MainNavigator } from './presentation/navigation/MainNavigator';

export const CarKidsApp = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
