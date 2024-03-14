import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';

import StatusBarComponent from '../components/ui/status-bar';
import { LoadingScreen } from '../screens/LoadingScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';

export type RootStackParams = {
  LoadingScreen: undefined,
  LoginScreen: undefined,
  RegisterScreen: undefined,
  HomeScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
  return {
    cardStyle: {
      opacity: current.progress
    }
  };
};

export const MainNavigator = () => {
  return (
    <>
      <StatusBarComponent color={'#DCD7D7'} theme='dark-content' />
      <Stack.Navigator
        initialRouteName='LoginScreen'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoginScreen" component={LoginScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </>
  );
};
