import { Layout } from '@ui-kitten/components';
import { IProduct } from '../../../../infrastructure/interfaces';
import { DeleteButton, EditButton } from '../../ui';
import { styles } from './styles';

export const ProductActions = ({ product }: { product: IProduct; }) => {
  return (
    <Layout style={styles.container}>
      <EditButton iconSize={25} product={product} />
      <DeleteButton iconSize={25} product={product} />
    </Layout>
  );
};
