import { Layout } from '@ui-kitten/components';
import { UsersResponse } from '../../../../infrastructure/interfaces';
import { UsersList } from '../UsersList';
import { UserListFooter } from '../UsersListFooter';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  usersData: UsersResponse;
  fetchPrevPage: () => Promise<void>;
  fetchNextPage: () => Promise<void>;
}

export const UsersListComponent = ({ usersData, fetchPrevPage, fetchNextPage }: Props) => {
  return (
    <Layout style={globalStyles.container}>
      <UsersList usersData={usersData} />
      <UserListFooter usersData={usersData} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
    </Layout>
  );
};
