import { Layout } from '@ui-kitten/components';
import { Footnote, Title } from '../../ui';
import { styles } from './styles';

export const ProfileHeader = () => {
  return (
    <Layout style={styles.titleContainer}>
      <Title text='Nombre' />
      <Footnote text='Email' />
    </Layout>
  );
}
