import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomIcon } from '../components/ui/CustomIcon';
import StatusBarComponent from '../components/ui/status-bar';
import { ProductsScreen } from '../screens/products/ProductsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { RentalsScreen } from '../screens/rentals/RentalsScreen';
import { globalColors } from '../theme/globalColors';

export type MainStackParams = {
  RentalsScreen: undefined,
  ProductsScreen: undefined,
  ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  return (
    <>
      <StatusBarComponent color={globalColors.background} theme='dark-content' />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            switch (route.name) {
              case 'RentalsScreen':
                return <CustomIcon name='navigation-2-outline' fillColor={focused ? globalColors.white : globalColors.dark} />;

              case 'ProductsScreen':
                return <CustomIcon name='shopping-cart-outline' fillColor={focused ? globalColors.white : globalColors.dark} />;

              case 'ProfileScreen':
                return <CustomIcon name='person-outline' fillColor={focused ? globalColors.white : globalColors.dark} />;
            }
          },
          tabBarActiveTintColor: globalColors.white,
          tabBarInactiveTintColor: globalColors.dark,
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 5
          },
          headerStyle: {
            elevation: 0,
            borderColor: 'transparent',
            shadowColor: 'transparent'
          },
          headerShown: false,
          tabBarStyle: {
            backgroundColor: globalColors.background,
            borderColor: globalColors.backgroundDark,
            borderTopWidth: 1,
            elevation: 0,
            height: 80
          },
          tabBarActiveBackgroundColor: globalColors.primaryRed,
        })}
      >
        <Tab.Screen name="RentalsScreen" options={{ title: 'Alquileres' }} component={RentalsScreen} />
        <Tab.Screen name="ProductsScreen" options={{ title: 'Productos' }} component={ProductsScreen} />
        <Tab.Screen name="ProfileScreen" options={{ title: 'Perfil' }} component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
};
