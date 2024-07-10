import { Layout, Spinner } from '@ui-kitten/components';

import { useProductsSearchData } from '../../../hooks';
import { DefaultInput } from '../../forms';
import { BackgroundImage, EmptyListMessage } from '../../ui';
import { ProductsList } from '../ProductsList';

import { globalStyles } from '../../../styles/global.styles';

export const ProductsSearch = () => {
  const { background, debouncedValue, loading, products, search, top, setSearch } = useProductsSearchData();

  return (
    <Layout style={[{ ...globalStyles.searchContainer, marginTop: top }, background]}>
      <DefaultInput placeholder={'Buscar productos'} value={search} onChangeText={setSearch} />
      {!loading && debouncedValue.length < 2 &&
        <BackgroundImage customHeight={85} />
      }
      {(loading && debouncedValue.length > 2) &&
        <Spinner style={globalStyles.redBorder} />
      }
      {(products.length === 0 && debouncedValue.length > 2) &&
        <EmptyListMessage heightBy={0.7} text={`No hay productos con nombre "${debouncedValue}"`} />
      }
      <Layout style={[globalStyles.searchListContainer, background]}>
        <ProductsList products={products} />
      </Layout>
    </Layout>
  );
};
