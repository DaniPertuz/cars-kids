import { Layout } from '@ui-kitten/components';
import { adaptApiResponse } from '../../../../config/adapters/api-response-adapter';
import { ReportsListComponent } from '../../reports';
import { UsersResponse } from '../../../../infrastructure/interfaces';
import { styles } from './styles';

export const UsersList = ({ usersData }: { usersData: UsersResponse; }) => {
  return (
    <Layout style={styles.container}>
      <ReportsListComponent data={adaptApiResponse(usersData)} />
    </Layout>
  );
};
