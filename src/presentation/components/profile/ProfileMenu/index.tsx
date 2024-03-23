import { Layout } from '@ui-kitten/components';
import { ProfileMenuItem } from '../ProfileMenuItem';
import { LogoutComponent } from '../Logout';
import { styles } from './styles';

export const ProfileMenu = () => {
  return (
    <Layout style={styles.menuContainer}>
      <Layout style={styles.menuItemsContainer}>
        <ProfileMenuItem iconName={'edit-outline'} label={'Actualizar datos'} />
        <ProfileMenuItem iconName={'car-outline'} label={'Vehículos'} />
        <ProfileMenuItem iconName={'credit-card-outline'} label={'Presupuesto'} />
        <ProfileMenuItem iconName={'archive-outline'} label={'Productos'} />
      </Layout>
      <LogoutComponent />
    </Layout>
  );
};
