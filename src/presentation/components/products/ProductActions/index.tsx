import { Layout } from '@ui-kitten/components';
import { DeleteButton, EditButton } from '../../ui';
import { Product } from '../../../../core/entities';
import { styles } from './styles';

export const ProductActions = ({ product }: { product: Product; }) => {
  return (
    <Layout style={styles.container}>
      <EditButton iconSize={25} product={product} />
      <DeleteButton iconName='trash-outline' iconSize={25} product={product} />
    </Layout>
  );
};
