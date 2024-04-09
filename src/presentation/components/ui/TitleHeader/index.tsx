import { Layout } from '@ui-kitten/components';
import { HeaderSix } from '..';
import { styles } from './styles';

export const TitleHeader = ({ text }: { text: string }) => {
  return (
    <Layout style={styles.titleContainer}>
      <HeaderSix text={text} />
    </Layout>
  );
};
