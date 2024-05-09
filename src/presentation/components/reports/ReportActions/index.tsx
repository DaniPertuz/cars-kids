import { Layout } from '@ui-kitten/components';
import { DeleteButton, EditButton } from '../../ui';
import { User } from '../../../../core/entities';
import { IStatus } from '../../../../infrastructure/interfaces';
import { styles } from './styles';

export const ReportActions = ({ user }: { user: User; }) => {
  return (
    <Layout style={styles.container}>
      {user.status === IStatus.Active && <EditButton iconSize={25} user={user} />}
      <DeleteButton iconName={user.status === IStatus.Inactive ? 'person-done-outline' : 'person-delete-outline'} iconSize={25} user={user} />
    </Layout>
  );
};
