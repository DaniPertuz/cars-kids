import { Layout } from '@ui-kitten/components';
import { IStatus, IUserRole, IVehicle } from '../../../../infrastructure/interfaces';
import { Callout, Caption } from '../../ui';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

interface Props {
  item: IVehicle;
}

export const VehicleDescription = ({ item }: Props) => {
  const { user } = useAuthStore();
  const isAdmin = item.status === IStatus.Active;

  return (
    <Layout style={{ ...styles.descriptionContainer, width: isAdmin ? '30%' : '50%'}}>
      <Caption textColor={globalStyles.colorOnyx} text={(item.category === 'car' ? 'Carro' : 'Moto')} />
      {user?.role === IUserRole.Admin && <Callout category='s2' text={(isAdmin ? 'Activo' : 'Inactivo')} />}
      <Layout style={{ backgroundColor: item.color, ...styles.itemColor }} />
    </Layout>
  );
};
