import { Layout } from '@ui-kitten/components';
import { useWindowDimensions } from 'react-native';
import { HeaderFive } from '../HeaderFive';
import { styles } from './styles';

interface Props {
  text: string;
  heightBy: number;
}

export const EmptyListMessage = ({ text, heightBy }: Props) => {
  const { height } = useWindowDimensions();
  return (
    <Layout style={{ height: height * heightBy, ...styles.container }}>
      <HeaderFive text={text} />
    </Layout>
  );
};
