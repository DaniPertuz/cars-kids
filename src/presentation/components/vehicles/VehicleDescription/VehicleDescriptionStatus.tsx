import { Layout } from '@ui-kitten/components';
import { Vehicle } from '../../../../core/entities';
import { IStatus, IUserRole } from '../../../../infrastructure/interfaces';
import { useCustomTheme } from '../../../hooks';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { CalloutBold } from '../../ui';

export const VehicleDescriptionStatus = ({ vehicle }: { vehicle: Vehicle; }) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  const { user } = useAuthStore();
  const isAdmin = user?.role === IUserRole.Admin;
  return (
    <Layout style={{ ...platinumItemBackgroundColor, flex: 3, display: isAdmin ? 'flex' : 'none' }}>
      <CalloutBold text={(vehicle.status === IStatus.Active ? 'Activo' : 'Inactivo')} />
    </Layout>
  );
};
