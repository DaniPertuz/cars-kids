import { Layout } from '@ui-kitten/components';
import { ProductResponse } from '../../../../infrastructure/interfaces';
import { useCustomTheme } from '../../../hooks';
import { EmptyListMessage, SpinnerContainer } from '../../ui';
import { ProductsList } from '../ProductsList';

interface Props {
  display: boolean;
  productsData: ProductResponse;
}

export const ProductListComponent = ({ display, productsData }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[{ marginHorizontal: 20, height: '87.5%' }, background]}>
      {(!display)
        ?
        <SpinnerContainer />
        :
        (productsData.total === 0)
          ?
          <EmptyListMessage heightBy={0.7} text='No hay productos registrados' />
          :
          <ProductsList products={productsData.products} />
      }
    </Layout>
  );
};
