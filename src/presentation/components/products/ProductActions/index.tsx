import { Layout } from '@ui-kitten/components';
import { Product } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';
import { DeleteButton, EditButton } from '../../ui';
import { styles } from './styles';

export const ProductActions = ({ product }: { product: Product; }) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  return (
    <Layout style={[styles.container, platinumItemBackgroundColor]}>
      <EditButton iconSize={25} product={product} />
      <DeleteButton iconName='trash-outline' iconSize={25} product={product} />
    </Layout>
  );
};
