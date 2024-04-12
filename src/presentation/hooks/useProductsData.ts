import { useEffect, useState } from 'react';
import * as ProductUseCases from '../../core/use-cases/products';
import { IStatus, IUserRole, ProductResponse } from '../../infrastructure/interfaces';
import { useUserInfo } from './useUserInfo';

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
  const { user } = useUserInfo();

  const getData = async () => {
    const isAdmin = user?.role === IUserRole.Admin;
    const newData = await ProductUseCases.getProductsUseCase(`${!isAdmin ? `products/status/${IStatus.Active}` : 'products'}?page=${paginationState.page}&limit=${paginationState.limit}`);
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
