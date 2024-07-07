import { Layout, List } from '@ui-kitten/components';

import { Product } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';
import { ProductListItem } from '../ProductListItem';

interface Props {
  products: Product[];
}

export const ProductsList = ({ products }: Props) => {
  const { background } = useCustomTheme();
  return (
    <List
      data={products}
      showsVerticalScrollIndicator={false}
      style={background}
      renderItem={({ item }) => (
        <Layout style={background}>
          <ProductListItem item={item} />
        </Layout>
      )}
    />
  );
};
