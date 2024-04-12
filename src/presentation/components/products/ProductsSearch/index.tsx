import { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout, Spinner } from '@ui-kitten/components';

import { DefaultInput } from '../../forms';
import { EmptyListMessage } from '../../ui';
import { useDebouncedValue } from '../../../hooks';
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
    <Layout style={{ ...styles.container, marginTop: top }}>
      <DefaultInput placeholder={'Buscar productos'} value={search} onChangeText={setSearch} />
      {!loading && debouncedValue.length < 2 &&
        <Layout style={styles.initialBackground}>
          <Image source={require('../../../../assets/carkids-removebg.png')} style={styles.initialBackgroundImage} />
        </Layout>
      }
      {(loading && debouncedValue.length > 2) &&
        <Spinner style={globalStyles.redBorder} />
      }
      {(products.length === 0 && debouncedValue.length > 2) &&
        <EmptyListMessage text={`No hay productos con nombre "${debouncedValue}"`} />
      }
      <Layout style={styles.fullWidth}>
        <ProductsList products={products} />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 30,
    ...globalStyles.mainBackground,
  },
  initialBackground: {
    ...globalStyles.mainBackground,
    height: '85%',
    justifyContent: 'center'
  },
  initialBackgroundImage: {
    height: 300,
    opacity: 0.4,
    width: 380
  },
  fullWidth: {
    width: '100%'
  }
});
