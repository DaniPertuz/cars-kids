import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomIcon } from '../components/ui/CustomIcon';
import StatusBarComponent from '../components/ui/status-bar';
import { useCustomTheme } from '../hooks';
import { PurchasesScreen } from '../screens/products/PurchasesScreen';
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
  const { background, isDarkMode, defaultPrimaryColor } = useCustomTheme();
  const activeTintColor = isDarkMode ? defaultPrimaryColor : globalColors.white;
  const tintColor = isDarkMode ? defaultPrimaryColor : globalColors.dark;
  return (
    <>
      <StatusBarComponent />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            switch (route.name) {
              case 'RentalsScreen':
                return <Image source={isDarkMode ? require('../../assets/race_dark.png') : require('../../assets/race.png')} style={{ height: 25, width: 25 }} />;

              case 'PurchasesScreen':
                return <CustomIcon name='shopping-cart-outline' fillColor={focused ? globalColors.white : tintColor} />;

              case 'ProfileScreen':
                return <CustomIcon name='person-outline' fillColor={focused ? globalColors.white : tintColor} />;
            }
          },
          tabBarActiveTintColor: activeTintColor,
          tabBarInactiveTintColor: tintColor,
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 5
          },
          headerShown: false,
          tabBarStyle: {
            backgroundColor: background.backgroundColor,
            borderTopColor: isDarkMode ? globalColors.white : globalColors.dark,
            borderWidth: 1,
            elevation: 0,
            height: 80
          },
          tabBarActiveBackgroundColor: globalColors.primaryRed
        })}
      >
        <Tab.Screen name="RentalsScreen" options={{ title: 'Alquileres' }} component={RentalsScreen} />
        <Tab.Screen name="PurchasesScreen" options={{ title: 'Compras' }} component={PurchasesScreen} />
        <Tab.Screen name="ProfileScreen" options={{ title: 'Perfil' }} component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
};
