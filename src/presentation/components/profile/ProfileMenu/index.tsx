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

  return (
    <Layout style={styles.menuContainer}>
      <Layout style={styles.menuItemsContainer}>
        <ProfileMenuItem iconName={'edit-outline'} label={'Actualizar datos'} onPress={() => navigation.navigate('UpdateProfileScreen')} />
        <ProfileMenuItem iconName={'car-outline'} label={'Vehículos'} onPress={() => navigation.navigate('VehiclesScreen')} />
        <ProfileMenuItem iconName={'credit-card-outline'} label={'Presupuesto'} onPress={() => navigation.navigate('BudgetScreen')} />
        <ProfileMenuItem iconName={'archive-outline'} label={'Productos'} onPress={() => navigation.navigate('ProductsScreen')} />
        {user?.role === IUserRole.Admin && <ProfileMenuItem iconName={'file-text-outline'} label={'Reportes'} onPress={() => navigation.navigate('ReportsScreen')} />}
        {user?.role === IUserRole.Admin && <ProfileMenuItem iconName={'people-outline'} label={'Usuarios'} onPress={() => navigation.navigate('UsersScreen')} />}
      </Layout>
      <LogoutComponent />
    </Layout>
  );
};
