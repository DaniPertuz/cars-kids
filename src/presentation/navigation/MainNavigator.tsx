import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';

import StatusBarComponent from '../components/ui/status-bar';
import { LoadingScreen } from '../screens/LoadingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ResetPasswordScreen } from '../screens/auth/ResetPasswordScreen';
import { BudgetScreen } from '../screens/budget/BudgetScreen';
import { SearchScreen } from '../screens/profile/SearchScreen';
import { UpdateProfileScreen } from '../screens/profile/UpdateProfileScreen';
import { VehiclesScreen } from '../screens/profile/VehiclesScreen';
import { BottomNavigator } from './BottomNavigator';
import { globalColors } from '../theme/globalColors';

export type RootStackParams = {
  BudgetScreen: undefined,
  LoadingScreen: undefined,
  LoginScreen: undefined,
  RegisterScreen: undefined,
  ResetPasswordScreen: undefined,
  SearchScreen: undefined,
  UpdateProfileScreen: undefined,
  VehiclesScreen: undefined,
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
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="BudgetScreen" component={BudgetScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoginScreen" component={LoginScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="SearchScreen" component={SearchScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="UpdateProfileScreen" component={UpdateProfileScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="VehiclesScreen" component={VehiclesScreen} />
      </Stack.Navigator>
    </>
  );
};
