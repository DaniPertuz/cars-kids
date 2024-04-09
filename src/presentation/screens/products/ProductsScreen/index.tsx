import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { LoadingScreen } from '../../LoadingScreen';
import { ProductAddButton } from '../../../components/products/ProductAddButton';
import { ProductListComponent } from '../../../components/products/ProductListComponent';
import { Back, ListPagination, Search, TitleHeader, TotalListMessage } from '../../../components/ui';
import { useProductsData } from '../../../hooks';
import { RootStackParams } from '../../../navigation/MainNavigator';
import { ProductResponse } from '../../../../infrastructure/interfaces';

import { globalStyles } from '../../../styles/global.styles';

export const ProductsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const { display, productsData, fetchNextPage, fetchPrevPage, getData } = useProductsData();

  useEffect(() => {
    getData();
  }, [productsData]);

  return (
    <Layout style={globalStyles.container}>
      {!productsData
        ?
        <LoadingScreen />
        :
        <>
          <Layout style={{ paddingTop: height * 0.042, ...globalStyles.mainLayout }}>
            <Back top={top} />
            <TitleHeader text='Productos' />
            <Search top={top} onPress={() => navigation.navigate('SearchScreen', { entity: 'products' })} />
            <ProductListComponent bottom={bottom} display={display} productsData={productsData} />
          </Layout>
          {productsData.total !== 0 &&
            <TotalListMessage bottom={bottom} item='producto' total={productsData.total} />
          }
          {productsData.total !== 0 &&
            <ListPagination<ProductResponse> bottom={bottom} data={productsData} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
          }
          <ProductAddButton top={top} />
        </>
      }
    </Layout>
  );
};
