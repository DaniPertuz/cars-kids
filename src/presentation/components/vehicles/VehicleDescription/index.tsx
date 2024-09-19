import { Platform } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Vehicle } from '../../../../core/entities';
import { IUserRole } from '../../../../infrastructure/interfaces';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { useCustomTheme } from '../../../hooks';
import { VehicleDescriptionCategory } from './VehicleDescriptionCategory';
import { VehicleDescriptionStatus } from './VehicleDescriptionStatus';
import { VehicleDescriptionColor } from './VehicleDescriptionColor';
import { styles } from './styles';

interface Props {
  vehicle: Vehicle;
}

export const VehicleDescription = ({ vehicle }: Props) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  const { user } = useAuthStore();
  const isAdmin = user?.role === IUserRole.Admin;
  return (
    <Layout style={[{ ...styles.descriptionContainer, width: isAdmin ? Platform.OS === 'ios' ? '70%' : '80%' : Platform.OS === 'ios' ? '50%' : '60%' }, platinumItemBackgroundColor]}>
      <VehicleDescriptionCategory vehicle={vehicle} />
      <VehicleDescriptionStatus vehicle={vehicle} />
      <VehicleDescriptionColor vehicle={vehicle} />
    </Layout>
  );
};
