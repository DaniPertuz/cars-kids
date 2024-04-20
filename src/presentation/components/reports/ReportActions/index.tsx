import { Layout } from '@ui-kitten/components';
import { DeleteButton, EditButton } from '../../ui';
import { User } from '../../../../core/entities';
import { styles } from './styles';

export const ReportActions = ({ user }: { user: User; }) => {
  return (
    <Layout style={styles.container}>
      <EditButton iconSize={25} user={user} />
      <DeleteButton iconSize={25} user={user} />
    </Layout>
  );
};
