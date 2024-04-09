import { Layout } from '@ui-kitten/components';
import { IProduct, IStatus, IUserRole } from '../../../../infrastructure/interfaces';
import { Caption } from '../../ui';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

interface Props {
  item: IProduct;
}

export const ProductDescription = ({ item }: Props) => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === IUserRole.Admin;

  return (
    <Layout style={{ ...styles.descriptionContainer, width: !isAdmin ? '70%' : '30%' }}>
      <Caption
        textColor={globalStyles.colorOnyx}
        text={`Precio: ${String(item.price)}${isAdmin ? `\nCosto: ${String(item.cost)}` : ''}${isAdmin ? (item.status === IStatus.Active) ? '\nActivo' : '\nInactivo' : ''}`}
      />
    </Layout>
  );
};
