import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoadingScreen } from '../../LoadingScreen';
import { ProductAddButton } from '../../../components/products/ProductAddButton';
import { ProductListComponent } from '../../../components/products/ProductListComponent';
import { CustomDivider, DataLayout, ListPagination, MainLayout, TopNavigation, TotalListMessage } from '../../../components/ui';
import { useProductsData } from '../../../hooks';
import { ProductResponse } from '../../../../infrastructure/interfaces';

export const ProductsScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const { display, productsData, fetchNextPage, fetchPrevPage, getData } = useProductsData();

  useEffect(() => {
    getData();
  }, [productsData]);

  return (
    <MainLayout>
      {!productsData
        ?
        <LoadingScreen />
        :
        <>
          <DataLayout paddingTop={height * 0.042}>
            <TopNavigation top={top} title='Productos' renderSearchButton />
            <CustomDivider />
            <ProductListComponent bottom={bottom} display={display} productsData={productsData} />
          </DataLayout>
          {productsData.total !== 0 &&
            <>
              <TotalListMessage bottom={bottom} item='producto' total={productsData.total} />
              <ListPagination<ProductResponse> bottom={bottom} data={productsData} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
            </>
          }
          <ProductAddButton top={top} />
        </>
      }
    </MainLayout>
  );
};
