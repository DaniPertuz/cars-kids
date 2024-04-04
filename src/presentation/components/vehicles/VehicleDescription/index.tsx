import { Layout } from '@ui-kitten/components';
import { IStatus, IUserRole, IVehicle } from '../../../../infrastructure/interfaces';
import { CalloutBold, Caption } from '../../ui';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

interface Props {
  item: IVehicle;
}

export const VehicleDescription = ({ item }: Props) => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === IUserRole.Admin;

  return (
    <Layout style={{ ...styles.descriptionContainer, width: isAdmin ? '50%' : '30%'}}>
      <Caption textColor={globalStyles.colorOnyx} text={(item.category === 'car' ? 'Carro' : 'Moto')} />
      {user?.role === IUserRole.Admin && <CalloutBold text={(isAdmin ? 'Activo' : 'Inactivo')} />}
      <Layout style={{ backgroundColor: item.color, ...styles.itemColor }} />
    </Layout>
  );
};
