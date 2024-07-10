import { useEffect, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout, Spinner } from '@ui-kitten/components';

import { DefaultInput } from '../../forms';
import { BackgroundImage, EmptyListMessage } from '../../ui';
import { useCustomTheme, useDebouncedValue } from '../../../hooks';
import { Product } from '../../../../core/entities';
import { ProductsList } from '../ProductsList';
import * as ProductUseCases from '../../../../core/use-cases/products';

import { globalStyles } from '../../../styles/global.styles';

export const ProductsSearch = () => {
  const { top } = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState<number>(0);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebouncedValue(search);
  const { background } = useCustomTheme();

  const getTotalProducts = async () => {
    const resp = await ProductUseCases.getProductsUseCase('products');
    setTotal(resp.response?.total || 0);
  };

  const getProductsData = async (limit: number) => {
    const resp = await ProductUseCases.getProductsUseCase(`products?limit=${limit}`);
    setProductsList(resp.response?.products || []);
  };

  const fetchData = async () => {
    setLoading(true);
    await getTotalProducts();
    await getProductsData(total);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [total]);

  const products = useMemo(() => {
    if (debouncedValue.length < 3) return [];

    return productsList.filter(product =>
      product.name.toLocaleLowerCase().includes(debouncedValue.toLocaleLowerCase()),
    );
  }, [debouncedValue, productsList]);

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
