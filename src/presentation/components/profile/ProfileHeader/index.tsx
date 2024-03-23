import { Layout } from '@ui-kitten/components';
import { Footnote, Title } from '../../ui';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { styles } from './styles';

export const ProfileHeader = () => {
  const name = useAuthStore(state => state.user?.name!);
  const email = useAuthStore(state => state.user?.email!);

  return (
    <Layout style={styles.titleContainer}>
      <Title text={name} />
      <Footnote text={email} />
    </Layout>
  );
}
