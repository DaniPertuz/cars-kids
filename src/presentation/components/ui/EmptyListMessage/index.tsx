import { Layout } from '@ui-kitten/components';
import { useWindowDimensions } from 'react-native';
import { useCustomTheme } from '../../../hooks';
import { HeaderFive } from '../HeaderFive';
import { styles } from './styles';

interface Props {
  text: string;
  heightBy: number;
}

export const EmptyListMessage = ({ text, heightBy }: Props) => {
  const { height } = useWindowDimensions();
  const { background } = useCustomTheme();
  return (
    <Layout style={[{ height: height * heightBy, ...styles.container }, background]}>
      <HeaderFive text={text} />
    </Layout>
  );
};
