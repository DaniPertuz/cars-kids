import { Layout } from '@ui-kitten/components';
import { adaptApiResponse } from '../../../../config/adapters/api-response-adapter';
import { ReportsListComponent } from '../../reports';
import { UsersResponse } from '../../../../infrastructure/interfaces';
import { useCustomTheme } from '../../../hooks';
import { styles } from './styles';

export const UsersList = ({ usersData }: { usersData: UsersResponse; }) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[styles.container, background]}>
      <ReportsListComponent data={adaptApiResponse(usersData)} />
    </Layout>
  );
};
