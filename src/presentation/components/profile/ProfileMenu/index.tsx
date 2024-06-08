import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';

import { useUserInfo } from '../../../hooks';
import { IUserRole } from '../../../../infrastructure/interfaces';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { ProfileMenuItem } from '../ProfileMenuItem';
import { LogoutComponent } from '../Logout';

import { styles } from './styles';

export const ProfileMenu = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { user } = useUserInfo();

  const navigateToScreen = (screen: keyof RootStackParams) => {
    navigation.navigate(screen as any);
  };

  return (
    <Layout style={styles.menuContainer}>
      <Layout style={styles.menuItemsContainer}>
      <ProfileMenuItem iconName={'edit-outline'} label={'Actualizar datos'} onPress={() => navigateToScreen('UpdateProfileScreen')} />
        <ProfileMenuItem iconName={'browser-outline'} label={'Puestos de trabajo'} onPress={() => navigateToScreen('DesksScreen')} />
        <ProfileMenuItem iconName={'car-outline'} label={'Vehículos'} onPress={() => navigateToScreen('VehiclesScreen')} />
        <ProfileMenuItem iconName={'credit-card-outline'} label={'Presupuesto'} onPress={() => navigateToScreen('BudgetScreen')} />
        <ProfileMenuItem iconName={'archive-outline'} label={'Productos'} onPress={() => navigateToScreen('ProductsScreen')} />
        {user?.role === IUserRole.Admin && <ProfileMenuItem iconName={'file-text-outline'} label={'Reportes'} onPress={() => navigateToScreen('ReportsScreen')} />}
        {user?.role === IUserRole.Admin && <ProfileMenuItem iconName={'people-outline'} label={'Usuarios'} onPress={() => navigateToScreen('UsersScreen')} />}
      </Layout>
      <LogoutComponent />
    </Layout>
  );
};
