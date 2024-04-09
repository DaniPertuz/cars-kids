import { Layout } from '@ui-kitten/components';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import { Back } from '../../../components/ui';
import { ProductsSearch } from '../../../components/products/ProductsSearch';
import { VehiclesSearch } from '../../../components/vehicles/VehiclesSearch';
import { RootStackParams } from '../../../navigation/MainNavigator';

import { globalStyles } from '../../../styles/global.styles';

interface Props extends StackScreenProps<RootStackParams, 'SearchScreen'> { };

export const SearchScreen = ({ route }: Props) => {
  const { entity } = route.params;
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  return (
    <Layout style={globalStyles.container}>
      <Layout style={{ paddingTop: height * 0.042, ...globalStyles.mainLayout }}>
        <Back top={top} />
        {entity === 'vehicles' ? <VehiclesSearch /> : <ProductsSearch />}
      </Layout>
    </Layout>
  );
};
