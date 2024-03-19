import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';

import StatusBarComponent from '../components/ui/status-bar';
import { LoadingScreen } from '../screens/LoadingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ResetPasswordScreen } from '../screens/auth/ResetPasswordScreen/index';
import { BottomNavigator } from './BottomNavigator';
import { globalColors } from '../theme/globalColors';

export type RootStackParams = {
  LoadingScreen: undefined,
  LoginScreen: undefined,
  RegisterScreen: undefined,
  ResetPasswordScreen: undefined,
  BottomNavigator: undefined;
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
      <StatusBarComponent color={globalColors.background} theme='dark-content' />
      <Stack.Navigator
        initialRouteName='LoginScreen'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoginScreen" component={LoginScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="BottomNavigator" component={BottomNavigator} />
      </Stack.Navigator>
    </>
  );
};
