import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoadingScreen } from '../../LoadingScreen';
import { ProductEntryModal } from '../../../components/products/ProductEntryModal';
import { ProductListComponent } from '../../../components/products/ProductListComponent';
import { AddButton, CustomDivider, DataLayout, ListPagination, MainLayout, TopNavigation, TotalListMessage } from '../../../components/ui';
import { useProductsData } from '../../../hooks';
import { ProductResponse } from '../../../../infrastructure/interfaces';

export const ProductsScreen = () => {
  const { top, bottom } = useSafeAreaInsets();

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
          <DataLayout paddingTop={Platform.OS === 'ios' ? top : top + 20}>
            <TopNavigation top={top} title='Productos' renderSearchButton />
            <CustomDivider />
            <ProductListComponent display={display} productsData={productsData} />
          </DataLayout>
          {productsData.total !== 0 &&
            <>
              <TotalListMessage bottom={bottom} item='producto' total={productsData.total} />
              <ListPagination<ProductResponse> bottom={bottom} data={productsData} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
              <AddButton Modal={ProductEntryModal} />
            </>
          }
        </>
      }
    </MainLayout>
  );
};
