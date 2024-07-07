import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { HeaderSix } from '..';
import { styles } from './styles';

export const TitleHeader = ({ text }: { text: string }) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[styles.titleContainer, background]}>
      <HeaderSix text={text} />
    </Layout>
  );
};
