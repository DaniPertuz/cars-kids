import { Platform } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { IStatus, IUserRole } from '../../../../infrastructure/interfaces';
import { Caption } from '../../ui';
import { Product } from '../../../../core/entities';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { useCustomTheme } from '../../../hooks';
import { styles } from './styles';

interface Props {
  item: Product;
}

export const ProductDescription = ({ item }: Props) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  const { user } = useAuthStore();
  const isAdmin = user?.role === IUserRole.Admin;

  return (
    <Layout style={[{ ...styles.descriptionContainer, width: !isAdmin ? Platform.OS === 'ios' ? '80%' : '90%' : Platform.OS === 'ios' ? '60%' : '70%' }, platinumItemBackgroundColor]}>
      <Caption
        text={`Precio: ${String(item.price)}${isAdmin ? `\nCosto: ${String(item.cost)}` : ''}${isAdmin ? (item.status === IStatus.Active) ? '\nActivo' : '\nInactivo' : ''}`}
      />
    </Layout>
  );
};
