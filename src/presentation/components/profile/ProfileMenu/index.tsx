import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout } from '@ui-kitten/components';

import { RootStackParams } from '../../../navigation/MainNavigator';
import { ProfileMenuItem } from '../ProfileMenuItem';
import { LogoutComponent } from '../Logout';

import { styles } from './styles';

export const ProfileMenu = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <Layout style={styles.menuContainer}>
      <Layout style={styles.menuItemsContainer}>
        <ProfileMenuItem iconName={'edit-outline'} label={'Actualizar datos'} onPress={() => navigation.navigate('UpdateProfileScreen')} />
        <ProfileMenuItem iconName={'car-outline'} label={'Vehículos'} onPress={() => navigation.navigate('VehiclesScreen')} />
        <ProfileMenuItem iconName={'credit-card-outline'} label={'Presupuesto'} onPress={() => navigation.navigate('BudgetScreen')} />
        <ProfileMenuItem iconName={'archive-outline'} label={'Productos'} onPress={() => navigation.navigate('BottomNavigator')} />
      </Layout>
      <LogoutComponent />
    </Layout>
  );
};
