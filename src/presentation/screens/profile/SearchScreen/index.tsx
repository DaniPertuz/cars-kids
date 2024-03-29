import { Layout } from '@ui-kitten/components';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Back } from '../../../components/ui';
import { VehiclesSearch } from '../../../components/vehicles/VehiclesSearch';

import { globalStyles } from '../../../styles/global.styles';

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  return (
    <Layout style={globalStyles.container}>
      <Layout style={{ paddingTop: height * 0.042, ...globalStyles.mainLayout }}>
        <Back top={top} />
        <VehiclesSearch />
      </Layout>
    </Layout>
  );
};
