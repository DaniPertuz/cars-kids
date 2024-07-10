import React, { useEffect, useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Product } from '../../core/entities';
import { useCustomTheme } from './useCustomTheme';
import { useDebouncedValue } from './useDebouncedValue';
import * as ProductUseCases from '../../core/use-cases/products';

export const useProductsSearchData = () => {
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
  return {
    background,
    debouncedValue,
    loading,
    products,
    search,
    top,
    setSearch,
  }
}
