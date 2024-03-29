import { useWindowDimensions } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { HeaderFive } from '../../ui';
import { styles } from './styles';

export const EmptyVehiclesListMessage = ({ text }: { text: string; }) => {
  const { height } = useWindowDimensions();
  return (
    <Layout style={{ height: height * 0.7, ...styles.container }}>
      <HeaderFive text={text} />
    </Layout>
  );
};
