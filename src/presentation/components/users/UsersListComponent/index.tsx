import { Layout } from '@ui-kitten/components';
import { UsersResponse } from '../../../../infrastructure/interfaces';
import { useCustomTheme } from '../../../hooks';
import { UsersList } from '../UsersList';
import { UsersListFooter } from '../UsersListFooter';

interface Props {
  usersData: UsersResponse;
  fetchPrevPage: () => Promise<void>;
  fetchNextPage: () => Promise<void>;
}

export const UsersListComponent = ({ usersData, fetchPrevPage, fetchNextPage }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[{ flex: 1 }, background]}>
      <UsersList usersData={usersData} />
      <UsersListFooter usersData={usersData} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
    </Layout>
  );
};
