import { useEffect, useState } from 'react';
import { getProducts } from '../../actions/products';
import { ProductResponse } from '../../infrastructure/interfaces';

export const useProductsData = () => {
  const init = {
    page: 0,
    limit: 0,
    total: 0,
    next: null,
    prev: null,
    products: []
  };

  const [productsData, setProductsData] = useState<ProductResponse>(init);
  const [display, setDisplay] = useState(false);
  const [paginationState, setPaginationState] = useState({ page: 1, limit: 10 });

  const getData = async () => {
    const newData = await getProducts(`products?page=${paginationState.page}&limit=${paginationState.limit}`);
    setProductsData(newData.response!);
    setDisplay(true);
  };

  useEffect(() => {
    getData();
  }, [paginationState]);

  const fetchNextPage = async () => {
    if (productsData.next) {
      setPaginationState(prevState => ({ ...prevState, page: prevState.page + 1 }));
    }
  };

  const fetchPrevPage = async () => {
    if (productsData.prev) {
      setPaginationState(prevState => ({ ...prevState, page: prevState.page - 1 }));
    }
  };

  return {
    display,
    productsData,
    fetchNextPage,
    fetchPrevPage,
    getData
  };
};
