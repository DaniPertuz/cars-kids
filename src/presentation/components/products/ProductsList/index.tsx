import { Layout, List } from '@ui-kitten/components';

import { IProduct } from '../../../../infrastructure/interfaces';
import { ProductListItem } from '../ProductListItem';

import { globalStyles } from '../../../styles/global.styles';

interface Props {
  products: IProduct[];
}

export const ProductsList = ({ products }: Props) => {
  return (
    <List
      data={products}
      showsVerticalScrollIndicator={false}
      style={globalStyles.mainBackground}
      renderItem={({ item }) => (
        <Layout style={globalStyles.mainBackground}>
          <ProductListItem item={item} />
        </Layout>
      )}
    />
  );
};
