import { Layout } from '@ui-kitten/components';
import { useWindowDimensions } from 'react-native';
import { HeaderFive } from '../HeaderFive';
import { styles } from './styles';

export const EmptyListMessage = ({ text }: { text: string; }) => {
  const { height } = useWindowDimensions();
  return (
    <Layout style={{ height: height * 0.7, ...styles.container }}>
      <HeaderFive text={text} />
    </Layout>
  );
};
