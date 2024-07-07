import { Layout } from '@ui-kitten/components';
import { IStatus, IUserRole } from '../../../../infrastructure/interfaces';
import { useCustomTheme } from '../../../hooks';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { Vehicle } from '../../../../core/entities';
import { CalloutBold, Caption } from '../../ui';
import { VehicleColor } from '../VehicleColor';
import { styles } from './styles';

interface Props {
  vehicle: Vehicle;
}

export const VehicleDescription = ({ vehicle }: Props) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  const { user } = useAuthStore();
  const isAdmin = user?.role === IUserRole.Admin;
  return (
    <Layout style={[{ ...styles.descriptionContainer, width: isAdmin ? '50%' : '30%' }, platinumItemBackgroundColor]}>
      <Caption text={(vehicle.category === 'car' ? 'Carro' : 'Moto')} />
      {user?.role === IUserRole.Admin && <CalloutBold text={(vehicle.status === IStatus.Active ? 'Activo' : 'Inactivo')} />}
      <VehicleColor vehicle={vehicle} />
    </Layout>
  );
};
