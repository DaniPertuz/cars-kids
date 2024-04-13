import { Layout } from '@ui-kitten/components';
import { IUserRole } from '../../../../infrastructure/interfaces';
import { CalloutBold, Caption } from '../../ui';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { Vehicle } from '../../../../core/entities';
import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

interface Props {
  vehicle: Vehicle;
}

export const VehicleDescription = ({ vehicle }: Props) => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === IUserRole.Admin;

  return (
    <Layout style={{ ...styles.descriptionContainer, width: isAdmin ? '50%' : '30%'}}>
      <Caption textColor={globalStyles.colorOnyx} text={(vehicle.category === 'car' ? 'Carro' : 'Moto')} />
      {user?.role === IUserRole.Admin && <CalloutBold text={(isAdmin ? 'Activo' : 'Inactivo')} />}
      <Layout style={{ backgroundColor: vehicle.color, ...styles.itemColor }} />
    </Layout>
  );
};
