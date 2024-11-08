import React from 'react';
import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';

import { Vehicle } from '../../core/entities';
import StatusBarComponent from '../components/ui/status-bar';
import { LoadingScreen } from '../screens/LoadingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ResetPasswordScreen } from '../screens/auth/ResetPasswordScreen';
import { BudgetScreen } from '../screens/budget/BudgetScreen';
import { DesksScreen } from '../screens/desks/DesksScreen';
import { SearchScreen } from '../screens/profile/SearchScreen';
import { UpdateProfileScreen } from '../screens/profile/UpdateProfileScreen';
import { ProductsScreen } from '../screens/products/ProductsScreen';
import { ReportsScreen } from '../screens/profile/ReportsScreen';
import { UsersScreen } from '../screens/profile/UsersScreen';
import { VehiclesScreen } from '../screens/profile/VehiclesScreen';
import { VehicleDetailsScreen } from '../screens/profile/VehicleDetailsScreen';
import { BottomNavigator, MainStackParams } from './BottomNavigator';

export type RootStackParams = {
  BudgetScreen: undefined;
  DesksScreen: undefined;
  LoadingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ResetPasswordScreen: undefined;
  SearchScreen: { entity: 'products' | 'vehicles'; };
  UpdateProfileScreen: undefined;
  VehiclesScreen: undefined;
  VehicleDetailsScreen: { vehicle: Vehicle };
  ProductsScreen: undefined;
  ReportsScreen: undefined;
  UsersScreen: undefined;
  BottomNavigator: NavigatorScreenParams<MainStackParams> | undefined;
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
      <StatusBarComponent />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoginScreen" component={LoginScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="BudgetScreen" component={BudgetScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="DesksScreen" component={DesksScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="SearchScreen" component={SearchScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="UpdateProfileScreen" component={UpdateProfileScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="ProductsScreen" component={ProductsScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="ReportsScreen" component={ReportsScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="UsersScreen" component={UsersScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="VehiclesScreen" component={VehiclesScreen} />
        <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="VehicleDetailsScreen" component={VehicleDetailsScreen} />
      </Stack.Navigator>
    </>
  );
};
