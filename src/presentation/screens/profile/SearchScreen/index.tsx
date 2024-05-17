import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import { ProductsSearch } from '../../../components/products/ProductsSearch';
import { VehiclesSearch } from '../../../components/vehicles/VehiclesSearch';
import { DataLayout, MainLayout, TopNavigation } from '../../../components/ui';
import { RootStackParams } from '../../../navigation/MainNavigator';

interface Props extends StackScreenProps<RootStackParams, 'SearchScreen'> { };

export const SearchScreen = ({ route }: Props) => {
  const { entity } = route.params;
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  return (
    <MainLayout>
      <DataLayout paddingTop={height * 0.042}>
        <TopNavigation top={top} />
        {entity === 'vehicles' ? <VehiclesSearch /> : <ProductsSearch />}
      </DataLayout>
    </MainLayout>
  );
};
