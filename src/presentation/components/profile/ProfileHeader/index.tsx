import { Layout } from '@ui-kitten/components';
import { Footnote, Title } from '../../ui';
import { useUserInfo } from '../../../hooks';
import { styles } from './styles';

export const ProfileHeader = () => {
  const { user } = useUserInfo();

  return (
    <Layout style={styles.titleContainer}>
      <Title text={user?.name!} />
      <Footnote text={user?.email!} />
    </Layout>
  );
};
