import { Layout } from '@ui-kitten/components';
import { ProductResponse } from '../../../../infrastructure/interfaces';
import { LoadingScreen } from '../../../screens/LoadingScreen';
import { EmptyListMessage } from '../../ui';
import { ProductsList } from '../ProductsList';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  bottom: number;
  display: boolean;
  productsData: ProductResponse;
}

export const ProductListComponent = ({ bottom, display, productsData }: Props) => {
  return (
    <Layout style={{ ...globalStyles.mainBackground, marginHorizontal: 20, paddingBottom: bottom + 200 }}>
      {(!display)
        ?
        <LoadingScreen />
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
