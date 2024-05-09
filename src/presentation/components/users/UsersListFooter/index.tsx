import { Layout } from '@ui-kitten/components';
import { UsersResponse } from '../../../../infrastructure/interfaces';
import { globalStyles } from '../../../styles/global.styles';
import { TotalListMessage, ListPagination } from '../../ui';

interface Props {
  usersData: UsersResponse;
  fetchNextPage: () => void; 
  fetchPrevPage: () => void; 
}

export const UserListFooter = ({ usersData, fetchNextPage, fetchPrevPage }: Props) => {
  return (
    <Layout style={globalStyles.container}>
      {usersData.total !== 0 &&
        <TotalListMessage bottom={0} item='usuario' total={usersData.total} />
      }
      {usersData.total !== 0 &&
        <ListPagination<UsersResponse> bottom={0} data={usersData} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
      }
    </Layout>
  );
};
